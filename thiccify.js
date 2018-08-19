const recast = require('recast');
const util = require('util');
const walk = require('estree-walker').walk;
const clone = require('clone');
const fs = require('fs');

const code = `
function anotherShortCircuit(a) {
	if (a > 10) {
		console.log("yes");
		return "cool";
	}
	console.log("maybe");
	return "maybe";
}
function shortCircuit(a) {
	if (a > 5) {
		return anotherShortCircuit(a);
	} else {
		console.log("no");
	}
	return "no";
}
console.log(shortCircuit(20));
`;

const randomItems = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";

function genRandomName() {
    let result = "";
    for (let i = 0; i < 16; i++) {
        result += randomItems.charAt(Math.floor(Math.random() * randomItems.length));
    }
    return result;
}


function unrollBlock(block) {
    walk(block, {
        enter: function (node) {
            if (node != block && node.type == "BlockStatement") {
                unrollBlock(node);
                this.skip();
            }
        }
    });

    for (let stmtIndex = 0; stmtIndex < block.body.length; stmtIndex++) {
        function insertStatement(statement) {
            block.body.splice(stmtIndex, 0, statement);
            stmtIndex++;
        }

        const statement = block.body[stmtIndex];


        if (statement.type == "ForStatement"
            && statement.init.declarations.length == 1
            && statement.init.declarations[0].init.type == "Literal"
            && statement.test.type == "BinaryExpression"
            && statement.test.left.type == "Identifier" && statement.test.left.name == statement.init.declarations[0].id.name
            && statement.test.right.type == "Literal"
            && statement.update.type == "UpdateExpression" && statement.update.operator == "++"
            && statement.update.argument.type == "Identifier" && statement.update.argument.name == statement.init.declarations[0].id.name) {

            const iterMin = statement.init.declarations[0].init.value;
            const iterMax = statement.test.right.value;
            const iterVar = statement.init.declarations[0].id;

            block.body[stmtIndex] = {
                type: "VariableDeclaration",
                kind: "var",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: iterVar,
                    }
                ]
            };
            stmtIndex++;

            for (let iter = iterMin; iter < iterMax; iter++) {
                insertStatement({
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: iterVar,
                        right: { type: "Literal", value: iter }
                    }
                });

                for (const stmt of statement.body.body) {
                    insertStatement(stmt);
                }
            }
        }
    }
}

function inlineBlock(appendNodes, inputStatements, hasReturnedId, returnId, parentFunctions) {
    const visibleFunctions = new Map();
    for (const [name, declaration] of parentFunctions) {
        visibleFunctions.set(name, declaration);
    }

    let writeTarget = appendNodes;
    let hasReturn = false;
    for (const statement of inputStatements) {
        const isLast = inputStatements[inputStatements.length - 1] == statement;

        if (statement.type == "FunctionDeclaration") {
            visibleFunctions.set(statement.id.name, statement);
            continue;
        }

        let skipNode = false;
        const initialBlock = writeTarget;
        const insertIndex = writeTarget.length;
        let anyReturns = false;
        walk(statement, {
            enter: function (node) {
                if (node.type == "BlockStatement") {
                    // inline the block, push a new writeTarget if it has any return statements
                    const newBody = [];
                    const hasReturns = inlineBlock(newBody, node.body, hasReturnedId, returnId, visibleFunctions);
                    node.body = newBody;

                    if (hasReturns) {
                        anyReturns = true;
                    }

                    this.skip();
                    skipNode = true;
                }
            }, leave: function (node) {
                if (node.type == "CallExpression") {
                    const targetFunc = visibleFunctions.get(node.callee.name);
                    if (targetFunc) {
                        const randomId = targetFunc.id.name + genRandomName();
                        const retName = randomId + "_return";

                        inlineCall(writeTarget, node, targetFunc, randomId, visibleFunctions);

                        node.type = "Identifier";
                        node.name = retName;
                    }
                }
            }
        });

        if (skipNode) {
            initialBlock.splice(insertIndex, 0, statement);
        }

        if (anyReturns) {
            if (!isLast) {
                const newWriteTarget = [];
                writeTarget.push({
                    type: "IfStatement",
                    test: {
                        type: "UnaryExpression",
                        operator: "!",
                        prefix: true,
                        argument: hasReturnedId,
                    },
                    consequent: { type: "BlockStatement", body: newWriteTarget },
                });
                writeTarget = newWriteTarget;
            }
            hasReturn = true;
        }

        if (skipNode) {
            continue;
        }

        if (statement.type == "ReturnStatement") {
            hasReturn = true;
            writeTarget.push({
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: returnId,
                    right: statement.argument,
                }
            });
            writeTarget.push({
                type: "ExpressionStatement",
                expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: hasReturnedId,
                    right: { type: "Literal", value: true },
                }
            });

            if (!isLast) {
                const newWriteTarget = [];
                writeTarget.push({
                    type: "IfStatement",
                    test: {
                        type: "UnaryExpression",
                        operator: "!",
                        prefix: true,
                        argument: hasReturnedId
                    },
                    consequent: {
                        type: "BlockStatement",
                        body: newWriteTarget,
                    }
                });
                writeTarget = newWriteTarget;
            }

            continue;
        }

        writeTarget.push(statement);
    }

    return hasReturn;
}


function inlineCall(statementsArr, callNode, targetDefinition, identifier, visibleFunctions) {
    const hasReturnedId = { type: "Identifier", name: identifier + "_hasReturned" };
    const returnId = { type: "Identifier", name: identifier + "_return" };

    statementsArr.push({
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
            {
                type: "VariableDeclarator",
                id: hasReturnedId,
                init: { type: "Literal", value: false }
            },
        ]
    });
    statementsArr.push({
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
            {
                type: "VariableDeclarator",
                id: returnId
            },
        ]
    });
    statementsArr.push({
        type: "VariableDeclaration",
        kind: "var",
        declarations: [
            {
                type: "VariableDeclarator",
                id: { type: "Identifier", name: "arguments" },
                init: { type: "ArrayExpression", elements: callNode.arguments }
            }
        ]
    });

    for (let paramIndex = 0; paramIndex < targetDefinition.params.length; paramIndex++) {
        statementsArr.push({
            type: "VariableDeclaration",
            kind: "var",
            declarations: [
                {
                    type: "VariableDeclarator",
                    id: targetDefinition.params[paramIndex],
                    init: {
                        type: "MemberExpression",
                        object: { type: "Identifier", name: "arguments" },
                        property: { type: "Literal", value: paramIndex },
                        computed: true,
                    }
                }
            ]
        });
    }

    const appendNodes = [];
    inlineBlock(appendNodes, targetDefinition.body.body, hasReturnedId, returnId, visibleFunctions);
    for (const appendNode of appendNodes) {
        statementsArr.push(appendNode);
    }
}

module.exports = {
    unRoll: function (code) {
        const ast = recast.parse(code);

        unrollBlock(ast.program);
        return recast.print(ast);
    },
    run: function (code) {
        const ast = recast.parse(code);

        const newBody = [];
        inlineBlock(newBody, ast.program.body, "", "", new Map());
        ast.program.body = newBody;

        // console.log(recast.print(ast).code);

        return recast.print(ast);
    }
};
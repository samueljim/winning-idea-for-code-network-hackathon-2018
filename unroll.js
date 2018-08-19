const recast = require('recast');
const util = require('util');
const walk = require('estree-walker').walk;
const clone = require('clone');
const fs = require('fs');

const code = `
function bubbleSort(a) {
	var swapped;
	do {
		swapped = false;
		for (var i = 0; i < 9; i++) {
			if (a[i] > a[i + 1]) {
				var temp = a[i];
				a[i] = a[i + 1];
				a[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
}
`;

const ast = recast.parse(code);

function unrollBlock(block) {
	walk(block, {
		enter: function(node) {
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

unrollBlock(ast.program);
return recast.print(ast);
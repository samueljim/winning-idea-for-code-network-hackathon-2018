var bfTravellingSalesmanFBDFOWLVydsibTsb_hasReturned = false, bfTravellingSalesmanFBDFOWLVydsibTsb_return, arguments = [];
var graph = arguments[0];
// Pick starting point from where we will traverse the graph.
const startVertex = graph.getAllVertices()[0];

var findAllPathsKHRofCWrznHBsNCB_hasReturned = false, findAllPathsKHRofCWrznHBsNCB_return, arguments = [startVertex];
var startVertex = arguments[0];
var paths = [] = arguments[1];
var path = [] = arguments[2];
// Clone path.
const currentPath = clone(path);

// Add startVertex to the path.
currentPath.push(startVertex);

// Generate visited set from path.
const visitedSet = currentPath.reduce((accumulator, vertex) => {
    const updatedAccumulator = clone(accumulator);
    updatedAccumulator[vertex.getKey()] = vertex;

    findAllPathsKHRofCWrznHBsNCB_return = updatedAccumulator;
    findAllPathsKHRofCWrznHBsNCB_hasReturned = true;
}, {});

if (!findAllPathsKHRofCWrznHBsNCB_hasReturned) {
    // Get all unvisited neighbors of startVertex.
    const unvisitedNeighbors = startVertex.getNeighbors().filter((neighbor) => {
        findAllPathsKHRofCWrznHBsNCB_return = !visitedSet[neighbor.getKey()];
        findAllPathsKHRofCWrznHBsNCB_hasReturned = true;
    });

    if (!findAllPathsKHRofCWrznHBsNCB_hasReturned) {
        // If there no unvisited neighbors then treat current path as complete and save it.
        if (!unvisitedNeighbors.length) {
            paths.push(currentPath);

            findAllPathsKHRofCWrznHBsNCB_return = paths;
            findAllPathsKHRofCWrznHBsNCB_hasReturned = true;
        }

        if (!findAllPathsKHRofCWrznHBsNCB_hasReturned) {
            var neighborIndex;
            neighborIndex = 0;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 1;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 2;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 3;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 4;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 5;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 6;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 7;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 8;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);
            neighborIndex = 9;
            const currentUnvisitedNeighbor = unvisitedNeighbors[neighborIndex];
            doSomethingElse(currentUnvisitedNeighbor, paths, currentPath);

            findAllPathsKHRofCWrznHBsNCB_return = paths;
            findAllPathsKHRofCWrznHBsNCB_hasReturned = true;
        }
    }
}

// BRUTE FORCE.
// Generate all possible paths from startVertex.
const allPossiblePaths = findAllPathsKHRofCWrznHBsNCB_return;

// Filter out paths that are not cycles.
const allPossibleCycles = allPossiblePaths.filter((path) => {
    /** @var {GraphVertex} */
    const lastVertex = path[path.length - 1];
    const lastVertexNeighbors = lastVertex.getNeighbors();

    bfTravellingSalesmanFBDFOWLVydsibTsb_return = lastVertexNeighbors.includes(startVertex);
    bfTravellingSalesmanFBDFOWLVydsibTsb_hasReturned = true;
});

if (!bfTravellingSalesmanFBDFOWLVydsibTsb_hasReturned) {
    // Go through all possible cycles and pick the one with minimum overall tour weight.
    const adjacencyMatrix = graph.getAdjacencyMatrix();
    const verticesIndices = graph.getVerticesIndices();
    let salesmanPath = [];
    let salesmanPathWeight = null;
    var cycleIndex;
    cycleIndex = 0;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 1;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 2;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 3;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 4;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 5;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 6;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 7;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 8;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }
    cycleIndex = 9;
    const currentCycle = allPossibleCycles[cycleIndex];
    var getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = false, getCycleWeightkLmxZAXTzqWSgoWT_return, arguments = [adjacencyMatrix, verticesIndices, currentCycle];
    var adjacencyMatrix = arguments[0];
    var verticesIndices = arguments[1];
    var cycle = arguments[2];
    let weight = 0;

    for (let cycleIndex = 1; cycleIndex < cycle.length; cycleIndex += 1) {
        const fromVertex = cycle[cycleIndex - 1];
        const toVertex = cycle[cycleIndex];
        const fromVertexIndex = verticesIndices[fromVertex.getKey()];
        const toVertexIndex = verticesIndices[toVertex.getKey()];
        weight += adjacencyMatrix[fromVertexIndex][toVertexIndex];
    }

    getCycleWeightkLmxZAXTzqWSgoWT_return = weight;
    getCycleWeightkLmxZAXTzqWSgoWT_hasReturned = true;
    const currentCycleWeight = getCycleWeightkLmxZAXTzqWSgoWT_return;

    // If current cycle weight is smaller then previous ones treat current cycle as most optimal.
    if (salesmanPathWeight === null || currentCycleWeight < salesmanPathWeight) {
        salesmanPath = currentCycle;
        salesmanPathWeight = currentCycleWeight;
    }

    bfTravellingSalesmanFBDFOWLVydsibTsb_return = salesmanPath;
    bfTravellingSalesmanFBDFOWLVydsibTsb_hasReturned = true;
}

bfTravellingSalesmanFBDFOWLVydsibTsb_return;

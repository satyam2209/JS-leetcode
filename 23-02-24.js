/*** 
 There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.

You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1. 

Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.


Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation:
The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
***/

var findCheapestPrice = function(n, flights, src, dst, k) {
    const graph = new Map();
    // Creating adjacency list representation of the graph
    for (const [from, to, price] of flights) {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from).push([to, price]);
    }
    
    const pq = [[0, src, k + 1]]; // Priority queue: [priceSoFar, currentNode, remainingStops]
    
    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]); // Sort by price so far
        const [price, current, stops] = pq.shift();
        
        if (current === dst) return price; // Found destination
        
        if (stops > 0 && graph.has(current)) {
            for (const [neighbor, cost] of graph.get(current)) {
                pq.push([price + cost, neighbor, stops - 1]);
            }
        }
    }
    
    return -1; // No path found
};

// Test cases
console.log(findCheapestPrice(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1)); // Output: 700
console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1)); // Output: 200

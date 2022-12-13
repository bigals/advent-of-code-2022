import inputFile from "../assets/input.txt";

interface Point {
  row: number;
  col: number;
}

export default function day12Composition() {
  const inputData = inputFile.split("\n");

  const parseMap = (input: string[]) => {
    /** a=== 0, z===25; Ascii a is 97,charCode - 97 to convert to number elevations */
    const map: number[][] = [];
    const start = { row: 0, col: 0 };
    const end = { row: 0, col: 0 };

    for (const [index, line] of input.entries()) {
      for (const [charIdx, char] of line.split("").entries()) {
        if (char === "S") {
          if (!map[index]) {
            map.push([]);
          }
          map[index].push(0);
          start.row = index;
          start.col = charIdx;
        } else if (char === "E") {
          if (!map[index]) {
            map.push([]);
          }
          map[index].push(25);
          end.row = index;
          end.col = charIdx;
        } else {
          if (!map[index]) {
            map.push([]);
          }
          map[index].push(char.charCodeAt(0) - 97);
        }
      }
    }

    return { map, start, end };
  };

  const pointToInt = (row: number, col: number) => {
    return row * 1e3 + col;
  };

  const intToPoint = (val: number) => {
    return {
      row: Math.floor(val / 1e3),
      col: val % 1e3,
    };
  };

  const getNeighbors = (
    row: number,
    col: number,
    map: number[][],
    partNum: number
  ) => {
    const neighbors = [];
    if (partNum === 1) {
      if (row + 1 < map.length && map[row + 1][col] <= map[row][col] + 1) {
        neighbors.push(pointToInt(row + 1, col));
      }
      if (row - 1 >= 0 && map[row - 1][col] <= map[row][col] + 1) {
        neighbors.push(pointToInt(row - 1, col));
      }
      if (col + 1 < map[row].length && map[row][col + 1] <= map[row][col] + 1) {
        neighbors.push(pointToInt(row, col + 1));
      }
      if (col - 1 >= 0 && map[row][col - 1] <= map[row][col] + 1) {
        neighbors.push(pointToInt(row, col - 1));
      }
    } else {
      if (row + 1 < map.length && map[row + 1][col] >= map[row][col] - 1) {
        neighbors.push(pointToInt(row + 1, col));
      }
      if (row - 1 >= 0 && map[row - 1][col] >= map[row][col] - 1) {
        neighbors.push(pointToInt(row - 1, col));
      }
      if (col + 1 < map[row].length && map[row][col + 1] >= map[row][col] - 1) {
        neighbors.push(pointToInt(row, col + 1));
      }
      if (col - 1 >= 0 && map[row][col - 1] >= map[row][col] - 1) {
        neighbors.push(pointToInt(row, col - 1));
      }
    }

    return neighbors;
  };

  const getPath = (
    partNumber: number,
    map: number[][],
    start: Point,
    end?: Point
  ) => {
    const dist: Record<number, any> = {};
    const prev: Record<number, any> = {};
    let queue: number[] = [];

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const id = pointToInt(row, col);
        dist[id] = Infinity;

        queue.push(id);
      }
    }
    dist[pointToInt(start.row, start.col)] = 0;

    while (queue.length) {
      let u: number | null = null;
      for (const current of queue) {
        if (u === null || dist[current] < dist[u]) {
          u = current;
        }
      }

      if (partNumber === 1) {
        if (u === pointToInt((end as Point).row, (end as Point).col)) {
          break;
        }

        queue = queue.filter((x) => x !== u);

        const point = intToPoint(u as number);
        const neighbors = getNeighbors(point.row, point.col, map, 1);
        for (const v of neighbors) {
          if (queue.includes(v)) {
            const alt = dist[u as number] + 1;
            if (alt < dist[v]) {
              dist[v] = alt;
              prev[v] = u;
            }
          }
        }
      } else if (partNumber === 2) {
        const point = intToPoint(u as number);

        if (map[point.row][point.col] === 0) {
          return dist[u as number];
        }

        queue = queue.filter((x) => x !== u);

        const neighbors = getNeighbors(point.row, point.col, map, 2);
        for (const v of neighbors) {
          if (queue.includes(v)) {
            const alt = dist[u as number] + 1;

            if (alt < dist[v]) {
              dist[v] = alt;
              prev[v] = u;
            }
          }
        }
      }
    }

    return {
      dist,
      prev,
    };
  };

  const day12FirstSolution = () => {
    const { map, start, end } = parseMap(inputData);
    const calcedPaths = getPath(1, map, start, end);
    const distance = calcedPaths.dist[pointToInt(end.row, end.col)];

    return distance;
  };

  const day12SecondSolution = () => {
    const { map, end } = parseMap(inputData);
    const distance = getPath(2, map, end);

    return distance;
  };

  return { day12FirstSolution, day12SecondSolution };
}

import inputFile from "../assets/input.txt";
export interface Point {
  x: number;
  y: number;
  z: number;
}
export interface PointChange {
  changeX: number;
  changeY: number;
  changeZ: number;
}

export default function day18Composition() {
  const changes: PointChange[] = [
    { changeX: -1, changeY: 0, changeZ: 0 },
    { changeX: 1, changeY: 0, changeZ: 0 },
    { changeX: 0, changeY: -1, changeZ: 0 },
    { changeX: 0, changeY: 1, changeZ: 0 },
    { changeX: 0, changeY: 0, changeZ: -1 },
    { changeX: 0, changeY: 0, changeZ: 1 },
  ];
  const inputData = inputFile.split("\n");
  const coords: Point[] = inputData.map((line: string) => {
    const [x, y, z] = line.split(",");

    return {
      x: parseInt(x, 10) + 1,
      y: parseInt(y, 10) + 1,
      z: parseInt(z, 10) + 1,
    };
  });
  const maxX = Math.max(...coords.map((coord: Point) => coord.x)) + 1;
  const maxY = Math.max(...coords.map((coord: Point) => coord.y)) + 1;
  const maxZ = Math.max(...coords.map((coord: Point) => coord.z)) + 1;

  const getNewGrid = () => {
    const newGrid = getEmptyGrid();

    coords.map(({ x, y, z }) => {
      newGrid[x][y][z] = true;
    });

    return newGrid;
  };

  const getEmptyGrid = () => {
    return new Array(maxX + 1)
      .fill(false)
      .map(() =>
        new Array(maxY + 1)
          .fill(false)
          .map(() => new Array(maxZ + 1).fill(false).map(() => false))
      );
  };

  const isCoordsOOB = (newX: number, newY: number, newZ: number) => {
    return (
      newX < 0 ||
      newX > maxX ||
      newY < 0 ||
      newY > maxY ||
      newZ < 0 ||
      newZ > maxZ
    );
  };

  const isCoordVisited = (
    grid: boolean[][][],
    newX: number,
    newY: number,
    newZ: number
  ) => {
    return grid[newX][newY][newZ];
  };

  const day18FirstSolution = () => {
    const grid = getNewGrid();

    let count = 0;

    for (const { x, y, z } of coords) {
      for (const { changeX, changeY, changeZ } of changes) {
        const newX = x + changeX;
        const newY = y + changeY;
        const newZ = z + changeZ;

        if (!isCoordVisited(grid, newX, newY, newZ)) {
          count++;
        }
      }
    }

    return count;
  };

  const day18SecondSolution = () => {
    const grid = getNewGrid();

    let count = 0;
    const visited = getEmptyGrid();
    const toVisit: Point[] = [{ x: 0, y: 0, z: 0 }];

    while (toVisit.length > 0) {
      const { x, y, z } = toVisit.pop() as Point;

      if (isCoordVisited(visited, x, y, z)) continue;

      visited[x][y][z] = true;

      for (const { changeX, changeY, changeZ } of changes) {
        const newX = x + changeX;
        const newY = y + changeY;
        const newZ = z + changeZ;

        if (isCoordsOOB(newX, newY, newZ)) continue;

        if (isCoordVisited(grid, newX, newY, newZ)) {
          count++;
          continue;
        }

        toVisit.push({ x: newX, y: newY, z: newZ });
      }
    }

    return count;
  };

  return { day18FirstSolution, day18SecondSolution };
}

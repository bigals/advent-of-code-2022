import inputFile from "../assets/input.txt";

export default function day8Composition() {
  const inputData = inputFile.split("\n");

  const generateGrid = (input: string[]) => {
    const grid: number[][] = [];
    for (const line of input) {
      grid.push(line.split("").map(Number));
    }

    return grid;
  };

  const countVisibileTrees = (grid: number[][]) => {
    const visibles = grid.map((row) => new Array(row.length).fill(0));
    const changes = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        innerJump: for (const [changeRow, changeCol] of changes) {
          let [newRow, newCol] = [row + changeRow, col + changeCol];

          for (
            ;
            newRow >= 0 &&
            newCol >= 0 &&
            newRow < grid.length &&
            newCol < grid[newRow].length;
            newRow += changeRow, newCol += changeCol
          ) {
            if (grid[newRow][newCol] >= grid[row][col]) {
              continue innerJump;
            }
          }
          visibles[row][col] = 1;
          break;
        }
      }
    }

    return visibles.flat().reduce((acc, n) => acc + n);
  };

  const countSceanicScores = (grid: number[][]) => {
    const scores = grid.map((row) => new Array(row.length).fill(1));
    const changes = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        for (const [changeRow, changeCol] of changes) {
          let [newRow, newCol] = [row + changeRow, col + changeCol];

          for (
            ;
            newRow >= 0 &&
            newCol >= 0 &&
            newRow < grid.length &&
            newCol < grid[newRow].length;
            newRow += changeRow, newCol += changeCol
          ) {
            if (grid[newRow][newCol] >= grid[row][col]) {
              newRow += changeRow;
              newCol += changeCol;
              break;
            }
          }
          scores[row][col] *=
            Math.abs(newRow - changeRow - row) +
            Math.abs(newCol - changeCol - col);
        }
      }
    }

    return Math.max(...scores.flat());
  };

  const day8FirstSolution = () => {
    const grid = generateGrid(inputData);

    return countVisibileTrees(grid);
  };

  const day8SecondSolution = () => {
    const grid = generateGrid(inputData);

    return countSceanicScores(grid);
  };

  return { day8FirstSolution, day8SecondSolution };
}

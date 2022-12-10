import inputFile from "../assets/input.txt";

export default function day9Composition() {
  const inputData = inputFile.split("\n");

  const getHeadPath = () => {
    return inputData.map((line: string) => {
      const [direction, totalMoves] = line.split(" ");
      return {
        direction,
        totalMoves: parseInt(totalMoves),
      };
    });
  };

  const directions: Record<string, { x: number; y: number }> = {
    R: {
      x: 1,
      y: 0,
    },
    L: {
      x: -1,
      y: 0,
    },
    U: {
      x: 0,
      y: -1,
    },
    D: {
      x: 0,
      y: 1,
    },
  };

  class Position {
    constructor(public x: number, public y: number) {}

    move(direction: string) {
      const { x: newX, y: newY } = directions[direction];
      this.x += newX;
      this.y += newY;
    }

    follow({ x: followX, y: followY }: Position) {
      const distAway = Math.max(
        Math.abs(this.x - followX),
        Math.abs(this.y - followY)
      );

      if (distAway > 1) {
        const moveX = followX - this.x;
        const moveY = followY - this.y;

        this.x += Math.abs(moveX) === 2 ? moveX / 2 : moveX;
        this.y += Math.abs(moveY) === 2 ? moveY / 2 : moveY;
      }
    }
  }

  const day9FirstSolution = () => {
    const path = getHeadPath();
    const head = new Position(0, 0);
    const tail = new Position(0, 0);
    const visited = new Set();
    visited.add(`0-0`);

    for (const move of path) {
      for (let i = 0; i < move.totalMoves; i++) {
        head.move(move.direction);
        tail.follow(head);
        visited.add(`${tail.x}-${tail.y}`);
      }
    }

    return visited.size;
  };

  const day9SecondSolution = () => {
    const path = getHeadPath();
    const knots = new Array(10).fill(0).map(() => new Position(0, 0));
    const visited = new Set();

    for (const move of path) {
      for (let i = 0; i < move.totalMoves; i++) {
        knots[0].move(move.direction);

        for (let j = 1; j < knots.length; j++) {
          knots[j].follow(knots[j - 1]);
        }
        const { x: tailX, y: tailY } = knots[knots.length - 1];
        visited.add(`${tailX}-${tailY}`);
      }
    }

    return visited.size;
  };

  return { day9FirstSolution, day9SecondSolution };
}

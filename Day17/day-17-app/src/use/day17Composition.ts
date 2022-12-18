import inputFile from "../assets/input.txt";

export default function day17Composition() {
  const inputData = inputFile.split("\n");
  const directions = inputData[0].split("");
  const ROCKS = [
    ["  #### "],

    ["   #   ", "  ###  ", "   #   "],

    ["    #  ", "    #  ", "  ###  "],

    ["  #    ", "  #    ", "  #    ", "  #    "],

    ["  ##   ", "  ##   "],
  ].map((rock) =>
    rock
      .map(([...bits]) =>
        bits
          .map((b, i) => (b === "#" ? 1 << (7 - i) : 0))
          .reduce((or, bit) => or | bit)
      )
      .concat([0, 0, 0])
  );
  const MOVE: Record<string, (r: number) => number> = {
    "<": (r: number) => r << 1,
    ">": (r: number) => r >> 1,
  };

  const infiniteArray = (array: any[]) => {
    return {
      index: 0,
      next() {
        const arrItem = array[this.index];
        this.index++;
        if (this.index >= array.length) this.index = 0;
        return arrItem;
      },
    };
  };

  const findPattern = (arr: number[]) => {
    const dynamicGrid = arr.map(() => 0);

    for (const [index, row] of dynamicGrid.entries()) {
      if (index > 0) {
        let j = dynamicGrid[index - 1];
        let done = false;

        while (!done) {
          if (row === dynamicGrid[j]) {
            dynamicGrid[index] = j + 1;
            done = true;
          } else if (j === 0) {
            dynamicGrid[index] = 0;
            done = true;
          } else {
            j = dynamicGrid[j - 1];
          }
        }
      }
    }

    return arr.slice(0, arr.length - (dynamicGrid.at(-1) ?? 0));
  };

  const findSequence = (
    grid: number[]
  ): { sequence: number[]; index: number } => {
    const dynamicGrid: number[][] = new Array(grid.length + 1)
      .fill(0)
      .map(() => Array(grid.length + 1).fill(0));

    let seqLength = 0;
    let index = 0;

    grid.map((row: number, i: number) => {
      for (let j = i + 2; j <= grid.length; j++) {
        if (row === grid[j - 1] && dynamicGrid[i][j - 1] < j - i) {
          dynamicGrid[i + 1][j] = dynamicGrid[i][j - 1] + 1;

          if (dynamicGrid[i + 1][j] > seqLength) {
            seqLength = dynamicGrid[i + 1][j];
            index = Math.max(i + 1, index);
          }
        } else {
          dynamicGrid[i + 1][j] = 0;
        }
      }
    });

    return {
      sequence: grid.slice(index - seqLength, index),
      index: index - seqLength,
    };
  };

  const isSafeMove = (
    rock: number[],
    playArea: number[],
    playAreaIndex: number,
    move: (r: number) => number
  ) => {
    return !rock.some((rock, i) => playArea[playAreaIndex + i] & move(rock));
  };

  const isCollisionBelow = (
    rock: number[],
    playArea: number[],
    playIndex: number
  ) => {
    return rock.some((rock, i) => playArea[playIndex + i + 1] & rock);
  };

  const playTetris = (directions: string[], count: number) => {
    let playArea = [0b111111111];
    const lengths = [];
    let lastLength = 0;
    let roundCnt = 0;
    let w = 0;

    while (roundCnt < count) {
      let rock = ROCKS[roundCnt % ROCKS.length];
      rock.map(() => 0b100000001).forEach((l) => playArea.unshift(l));

      let blockSettled = false;
      let height = 0;

      // Let block fall
      while (!blockSettled) {
        const move = MOVE[directions[w++ % directions.length]];

        if (isSafeMove(rock, playArea, height, move)) {
          rock = rock.map(move);
        }

        if (isCollisionBelow(rock, playArea, height)) {
          rock.forEach(
            (r, i) =>
              height + i < playArea.length && (playArea[height + i] |= r)
          );
          blockSettled = true;
        }
        height++;
      }

      // Loose the top, since we allow overflow
      playArea = playArea.slice(
        playArea.findIndex((row) => row !== 0b100000001)
      );

      // Keep track of playArea length changes
      lengths.push(playArea.length - 1 - lastLength);
      lastLength = playArea.length - 1;

      if (roundCnt > 5555) {
        // Find longest sequnce and its pattern
        const { sequence, index: sequenceIdx } = findSequence(lengths);
        const pattern = findPattern(sequence);
        const patternHeight = pattern.reduce(
          (sum: number, patHeight: number) => (sum += patHeight),
          0
        );

        const repeats = Math.trunc((count - sequenceIdx) / pattern.length);
        const rockCountPostSeq = (count - sequenceIdx) % pattern.length;
        const preAndPostSeqHeight = pattern
          .slice(0, rockCountPostSeq)
          .concat(lengths.slice(0, sequenceIdx))
          .reduce((s: number, v: number) => s + v);

        return preAndPostSeqHeight + repeats * patternHeight;
      }
      roundCnt++;
    }
    return lastLength;
  };

  const day17FirstSolution = () => {
    return playTetris(directions, 2022);
  };

  const day17SecondSolution = () => {
    return playTetris(directions, 1000000000000);
  };

  return { day17FirstSolution, day17SecondSolution };
}

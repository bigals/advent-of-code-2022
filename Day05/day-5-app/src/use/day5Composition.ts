import inputFile from "../assets/input.txt";

function calculateStartStacks(inputFile: string[]) {
  let instructionStartIdx = 0;
  const stacks: string[][] = [];

  for (let i = 0; i < inputFile.length && inputFile[i] !== ""; i++) {
    const line = inputFile[i];

    for (let j = line.length - 2; j >= 1; j = j - 4) {
      if (line[j] !== "") {
        stacks[i] ? stacks[i].unshift(line[j]) : (stacks[i] = [line[j]]);
      }
    }
    instructionStartIdx = i;
  }

  stacks.splice(stacks.length - 1, 1);
  instructionStartIdx = instructionStartIdx + 2;

  return { stacks, instructionStartIdx };
}

function getTopBoxes(stacks: string[][]) {
  let answer = "";
  for (let col = 0; col < stacks[0].length; col++) {
    let row = 0;
    while (stacks[row][col] === " ") {
      row++;
    }
    answer += stacks?.[row]?.[col] ?? " ";
  }

  return answer;
}

export default function day5Composition() {
  const inputData = inputFile.split("\n");

  const day5FirstSolution = () => {
    const { stacks, instructionStartIdx } = calculateStartStacks(inputData);

    for (let x = instructionStartIdx; x < inputData.length; x++) {
      const instructions = inputData[x].split(" ");
      let countToMove = parseInt(instructions[1], 10);
      const moveFromIdx = parseInt(instructions[3], 10) - 1;
      const moveToIdx = parseInt(instructions[5], 10) - 1;

      while (countToMove) {
        let moveFromRow = 0;
        let moveToRow = stacks.length - 1;

        // find the row we are removing from
        while (
          stacks[moveFromRow][moveFromIdx] === " " &&
          moveFromRow < stacks.length - 1
        ) {
          moveFromRow++;
        }

        // find the row we are moving to
        while (stacks?.[moveToRow]?.[moveToIdx] !== " " && moveToRow >= 0) {
          moveToRow--;
        }

        // We are adding new row to top of stacks (getting bigger)
        if (moveToRow === -1) {
          stacks.unshift(Array(stacks[0].length).fill(" "));
          moveToRow = 0;
          moveFromRow++;
        }

        // move box to new location, clear out where the box was previously
        stacks[moveToRow][moveToIdx] = stacks[moveFromRow][moveFromIdx];
        stacks[moveFromRow][moveFromIdx] = " ";

        stacks.filter(
          (stackRow) => stackRow.filter((char) => char !== " ").length
        );
        countToMove--;
      }
    }

    return getTopBoxes(stacks);
  };

  const day5SecondSolution = () => {
    //TODO: Fix this to be read in correctly, I need the solution read in rotated 90deg so just hardcoding the stacks for now
    const { instructionStartIdx } = calculateStartStacks(inputData);

    const stacks = [
      ["M", "J", "C", "B", "F", "R", "L", "H"],
      ["Z", "C", "D"],
      ["H", "J", "F", "C", "N", "G", "W"],
      ["P", "J", "D", "M", "T", "S", "B"],
      ["N", "C", "D", "R", "J"],
      ["W", "L", "D", "Q", "P", "J", "G", "Z"],
      ["P", "Z", "T", "F", "R", "H"],
      ["L", "V", "M", "G"],
      ["C", "B", "G", "P", "F", "Q", "R", "J"],
    ];
    stacks.map((line) => line.reverse());

    for (let x = instructionStartIdx; x < inputData.length; x++) {
      const instructions = inputData[x].split(" ");
      const countToMove = parseInt(instructions[1], 10);
      const moveFromIdx = parseInt(instructions[3], 10) - 1;
      const moveToIdx = parseInt(instructions[5], 10) - 1;

      const removed = stacks[moveFromIdx].splice(0, countToMove);
      stacks[moveToIdx].unshift(...removed);
    }

    return stacks.map((column) => column[0]).join("");
  };

  return { day5FirstSolution, day5SecondSolution };
}

import inputFile from "../assets/input.txt";
import testFile from "../assets/test.txt";

export default function day10Composition() {
  const inputData = inputFile.split("\n");
  const testData = testFile.split("\n");

  const day10FirstSolution = () => {
    const signalStrengths: Record<number, number> = {};
    let cycle = 1;
    let xReg = 1;

    for (const instruction of inputData) {
      const [cmd, regChange] = instruction.split(" ");

      if (cmd === "noop") {
        signalStrengths[cycle] = cycle * xReg;
        cycle++;
      } else {
        signalStrengths[cycle] = cycle * xReg;
        cycle++;
        signalStrengths[cycle] = cycle * xReg;
        cycle++;
        xReg += parseInt(regChange, 10);
      }
    }

    return (
      signalStrengths[20] +
      signalStrengths[60] +
      signalStrengths[100] +
      signalStrengths[140] +
      signalStrengths[180] +
      signalStrengths[220]
    );
  };

  const getCRTCoords = (cycle: number) => {
    let row = 0;
    let col = 0;

    if (cycle <= 39) {
      row = 0;
      col = cycle;
    } else if (cycle >= 40 && cycle <= 79) {
      row = 1;
      col = cycle - 40;
    } else if (cycle >= 80 && cycle <= 119) {
      row = 2;
      col = cycle - 80;
    } else if (cycle >= 120 && cycle <= 159) {
      row = 3;
      col = cycle - 120;
    } else if (cycle >= 160 && cycle <= 199) {
      row = 4;
      col = cycle - 160;
    } else if (cycle >= 200 && cycle <= 239) {
      row = 5;
      col = cycle - 200;
    }

    return { row, col };
  };

  const getCRTChar = (cycle: number, xReg: number) => {
    const { col: adjustedCycle } = getCRTCoords(cycle);
    return xReg === adjustedCycle ||
      adjustedCycle === xReg - 1 ||
      adjustedCycle === xReg + 1
      ? "#"
      : ".";
  };

  const processCycle = (cycle: number, xReg: number, crt: string[][]) => {
    const { row, col } = getCRTCoords(cycle);
    crt[row][col] = getCRTChar(cycle, xReg);

    cycle++;

    return cycle;
  };

  const day10SecondSolution = () => {
    const crt = [
      new Array(40).fill(" "),
      new Array(40).fill(" "),
      new Array(40).fill(" "),
      new Array(40).fill(" "),
      new Array(40).fill(" "),
      new Array(40).fill(" "),
    ];
    let cycle = 0;
    let xReg = 1;

    for (const instruction of inputData) {
      const [cmd, regChange] = instruction.split(" ");

      if (cmd === "noop") {
        cycle = processCycle(cycle, xReg, crt);
      } else {
        cycle = processCycle(cycle, xReg, crt);
        cycle = processCycle(cycle, xReg, crt);
        xReg += parseInt(regChange, 10);
      }
    }

    return crt.map((row) => row.join(""));
  };

  return { day10FirstSolution, day10SecondSolution };
}

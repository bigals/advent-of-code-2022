import inputFile from "../assets/input.txt";
interface Monkey {
  items: number[];
  op: (worry: number) => number;
  test: number[];
  inspectedCount: number;
}
export default function day11Composition() {
  const getMonkeys = (input: string): Monkey[] => {
    return input.split("\n\n").map((monkey: any) => {
      const lines = monkey.replace(/\n.+If/g, "").split("\n");
      const toNums = (line: string) => line.match(/\d+/g)?.map(Number);
      return {
        items: toNums(lines[1]) ?? [],
        op: (old: number) => eval(eval(lines[2].split("=")[1])),
        test: toNums(lines[3]) ?? [],
        inspectedCount: 0,
      };
    });
  };

  const stressManagementDivisor = (monkeys: Monkey[]) =>
    Object.values(monkeys).reduce((total, m) => total * m.test[0], 1);

  const runRounds = (
    monkeys: Monkey[],
    rounds: number,
    worryDivisor: number
  ) => {
    const commonDom = stressManagementDivisor(monkeys);
    for (let round = 0; round < rounds; round++) {
      monkeys.forEach((monkey: Monkey) => {
        monkey.items.forEach((item: number) => {
          item = Math.floor(monkey.op(item) / worryDivisor) % commonDom;
          monkeys[
            item % monkey.test[0] === 0 ? monkey.test[1] : monkey.test[2]
          ].items.push(item);
          monkey.inspectedCount++;
        });
        monkey.items = [];
      });
    }

    return monkeys;
  };

  const findSolution = (
    input: string,
    rounds: number,
    worryDivisor: number
  ) => {
    const mostActive = runRounds(getMonkeys(input), rounds, worryDivisor)
      .map((monk: Monkey) => monk.inspectedCount)
      .sort((a, b) => b - a);

    return mostActive[0] * mostActive[1];
  };

  const day11FirstSolution = () => {
    return findSolution(inputFile, 20, 3);
  };

  const day11SecondSolution = () => {
    /* Second Problem Solution goes here */
    return findSolution(inputFile, 10000, 1);
  };

  return { day11FirstSolution, day11SecondSolution };
}

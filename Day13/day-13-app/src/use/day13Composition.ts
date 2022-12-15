import inputFile from "../assets/input.txt";

export default function day13Composition() {
  const inputData = inputFile;

  const parseInput = (inputStr: string, decoders?: number[][][]) => {
    const strPairs = inputStr.split("\n\n");
    const pairs: Record<number, { left: any; right: any }> = {};

    for (let i = 0; i <= strPairs.length; i++) {
      if (i < strPairs.length) {
        const parts = strPairs[i].split("\n").map((arr) => JSON.parse(arr));
        pairs[i + 1] = { left: parts[0], right: parts[1] };
      } else if (decoders) {
        pairs[i + 1] = { left: decoders[0], right: decoders[1] };
      }
    }
    return pairs;
  };

  const toArray = (toCheck: number | number[]): number[] =>
    Array.isArray(toCheck) ? toCheck : [toCheck];

  const compareSides = (left: any, right: any): number => {
    if (left === undefined) return -1;
    else if (right === undefined) return 1;
    else if (typeof left === "number" && typeof right === "number")
      return left - right;

    left = toArray(left);
    right = toArray(right);

    const longArray = left.length > right.length ? left : right;

    return [...longArray.keys()].reduce(
      (acc: number, _: number, i: number) =>
        acc !== 0 ? acc : (acc += compareSides(left[i], right[i])),
      0
    );
  };

  const day13FirstSolution = () => {
    const solutionIndexes: number[] = [];
    const pairs = parseInput(inputData);

    Object.keys(pairs).map((pairIndex: string) => {
      const index = parseInt(pairIndex);
      const pair = pairs[index];

      if (compareSides(pair.left, pair.right) < 0) {
        solutionIndexes.push(index);
      }
    });
    return solutionIndexes.reduce((acc, val) => (acc += val), 0);
  };

  // easier for part 2 to keep our structure flat/just arrays
  const part2Parse = (input: string) => {
    return input
      .replace(/\n\n/g, "\n")
      .split("\n")
      .map((line) => JSON.parse(line));
  };

  const day13SecondSolution = () => {
    const seperators = [[[2]], [[6]]];
    const allPairsSorted = part2Parse(inputData)
      .concat(seperators)
      .sort(compareSides);

    return (
      (allPairsSorted.indexOf(seperators[0]) + 1) *
      (allPairsSorted.indexOf(seperators[1]) + 1)
    );
  };

  return { day13FirstSolution, day13SecondSolution };
}

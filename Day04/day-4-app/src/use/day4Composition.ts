import inputFile from "../assets/input.txt";

export default function day4Composition() {
  const inputData = inputFile.split("\n");

  const day4FirstSolution = () => {
    let numOfOverlaps = 0;

    for (const line of inputData) {
      const firstGroup = line.split(",")[0];
      const firstGroupStart = firstGroup.split("-")[0];
      const firstGroupEnd = firstGroup.split("-")[1];
      const secondGroup = line.split(",")[1];
      const secondGroupStart = secondGroup.split("-")[0];
      const secondGroupEnd = secondGroup.split("-")[1];

      const extremes = `${Math.min(
        firstGroupStart,
        secondGroupStart
      )}-${Math.max(firstGroupEnd, secondGroupEnd)}`;

      if (firstGroup === extremes || secondGroup === extremes) {
        numOfOverlaps++;
      }
    }

    return numOfOverlaps;
  };

  const day4SecondSolution = () => {
    let numOfOverlaps = 0;

    for (const line of inputData) {
      const [[first1, second1], [first2, second2]] = line
        .split(",")
        .map((range: string) => range.split("-").map(Number));

      if (
        (first1 >= first2 && first1 <= second2) ||
        (first2 >= first1 && first2 <= second1)
      ) {
        numOfOverlaps++;
      }
    }

    return numOfOverlaps;
  };

  return { day4FirstSolution, day4SecondSolution };
}

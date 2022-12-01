import inputFile from "../assets/input.txt";

export default function day1Composition() {
  const inputData = inputFile.split("\n");

  const day1FirstSolution = () => {
    let currElfCalories = 0;
    const elfCalorieTotals: number[] = [];

    inputData.forEach((lineVal: string) => {
      if (lineVal === "") {
        elfCalorieTotals.push(currElfCalories);
        currElfCalories = 0;
      } else {
        currElfCalories += parseInt(lineVal, 10);
      }
    });

    return Math.max(...elfCalorieTotals);
  };

  const day1SecondSolution = () => {
    let currElfCalories = 0;
    const elfCalorieTotals: number[] = [];

    inputData.forEach((lineVal: string) => {
      if (lineVal === "") {
        elfCalorieTotals.push(currElfCalories);
        currElfCalories = 0;
      } else {
        currElfCalories += parseInt(lineVal, 10);
      }
    });

    elfCalorieTotals.sort((a: number, b: number) => b - a);

    return elfCalorieTotals[0] + elfCalorieTotals[1] + elfCalorieTotals[2];
  };

  return { day1FirstSolution, day1SecondSolution };
}

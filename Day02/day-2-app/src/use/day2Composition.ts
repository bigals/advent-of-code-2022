import inputFile from "../assets/input.txt";

export default function day2Composition() {
  const inputData = inputFile.split("\n");

  /*
  A, X -> Rock
  B, Y -> Paper
  C, Z -> Scissors
  */
  const day2FirstSolution = () => {
    let totalScore = 0;
    const selfScores: Record<string, number> = {
      X: 1,
      Y: 2,
      Z: 3,
    };
    const roundScores: Record<string, number> = {
      "A-X": 3,
      "A-Y": 6,
      "A-Z": 0,
      "B-X": 0,
      "B-Y": 3,
      "B-Z": 6,
      "C-X": 6,
      "C-Y": 0,
      "C-Z": 3,
    };

    for (const line of inputData) {
      const opponent: string = line[0];
      const self: string = line[2];

      totalScore += selfScores[self] + roundScores[`${opponent}-${self}`];
    }

    return totalScore;
  };

  const day2SecondSolution = () => {
    let totalScore = 0;
    const selfScores: Record<string, number> = {
      "A-X": 3, // scissors self choice
      "A-Y": 1, // rock self choice
      "A-Z": 2, // paper self choice

      "B-X": 1, // rock self choice
      "B-Y": 2, // paper self choice
      "B-Z": 3, // scissors self choice

      "C-X": 2, // paper self choice
      "C-Y": 3, // scissors self choice
      "C-Z": 1, // rock self choice
    };
    const roundScores: Record<string, number> = {
      X: 0,
      Y: 3,
      Z: 6,
    };

    for (const line of inputData) {
      const opponent: string = line[0];
      const neededRoundOutcome: string = line[2];

      totalScore +=
        selfScores[`${opponent}-${neededRoundOutcome}`] +
        roundScores[neededRoundOutcome];
    }

    return totalScore;
  };

  return { day2FirstSolution, day2SecondSolution };
}

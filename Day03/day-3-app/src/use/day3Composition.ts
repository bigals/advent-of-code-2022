import inputFile from "../assets/input.txt";

export default function day3Composition() {
  const inputData = inputFile.split("\n");
  /*
  A-Z -> 65-90  -> ascii code - 38 for priority
  a-z -> 97-122 -> ascii code - 96 for priority
  */
  const day3FirstSolution = () => {
    let characterPriorityTotal = 0;

    for (const line of inputData) {
      const firstCompartment: Set<string> = new Set(
        line.substring(0, line.length / 2).split("")
      );

      const secondCompartment: Set<string> = new Set(
        line.substring(line.length / 2).split("")
      );

      for (const char of firstCompartment.values()) {
        if (secondCompartment.has(char)) {
          const asciiCode = char.charCodeAt(0);

          characterPriorityTotal +=
            asciiCode > 96 ? asciiCode - 96 : asciiCode - 38;
        }
      }
    }

    return characterPriorityTotal;
  };

  const day3SecondSolution = () => {
    let characterPriorityTotal = 0;

    for (let i = 0; i < inputData.length; i = i + 3) {
      const firstGroup: Set<string> = new Set(inputData[i].split(""));

      const secondGroup: Set<string> = new Set(inputData[i + 1].split(""));

      const thirdGroup: Set<string> = new Set(inputData[i + 2].split(""));

      for (const char of firstGroup.values()) {
        if (secondGroup.has(char) && thirdGroup.has(char)) {
          const asciiCode = char.charCodeAt(0);

          characterPriorityTotal +=
            asciiCode > 96 ? asciiCode - 96 : asciiCode - 38;
        }
      }
    }

    return characterPriorityTotal;
  };

  return { day3FirstSolution, day3SecondSolution };
}

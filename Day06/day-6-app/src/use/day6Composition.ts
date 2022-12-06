import inputFile from "../assets/input.txt";

export default function day6Composition() {
  const inputData = inputFile.split("\n");

  const day6FirstSolution = () => {
    let count = 0;
    const chars = inputData[0].split("");
    let markerSet = [];

    for (let i = 0; i < chars.length && markerSet.length < 4; i++) {
      const char = chars[i];

      if (
        markerSet?.[0] === char ||
        markerSet?.[1] === char ||
        markerSet?.[2] === char ||
        markerSet?.[3] === char
      ) {
        markerSet = [char];
      } else {
        markerSet.push(char);
      }

      count++;
    }
    count--;

    return count;
  };

  const day6SecondSolution = () => {
    let count = 0;
    const chars = inputData[0].split("");
    let markerSet = [];

    for (let i = 0; i < chars.length && markerSet.length < 14; i++) {
      const char = chars[i];

      if (
        markerSet?.[0] === char ||
        markerSet?.[1] === char ||
        markerSet?.[2] === char ||
        markerSet?.[3] === char ||
        markerSet?.[4] === char ||
        markerSet?.[5] === char ||
        markerSet?.[6] === char ||
        markerSet?.[7] === char ||
        markerSet?.[8] === char ||
        markerSet?.[9] === char ||
        markerSet?.[10] === char ||
        markerSet?.[11] === char ||
        markerSet?.[12] === char ||
        markerSet?.[13] === char
      ) {
        markerSet = [char];
      } else {
        markerSet.push(char);
      }

      count++;
    }
    count--;

    return count;
  };

  return { day6FirstSolution, day6SecondSolution };
}

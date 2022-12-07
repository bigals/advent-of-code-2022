import inputFile from "../assets/input.txt";

export interface DirFile {
  size: number;
  name: string;
}
export interface Directory {
  size: number;
  contents: Record<string, DirFile | Directory>;
  name: string;
}

export default function day7Composition() {
  const inputData = inputFile.split("\n");

  const getDirectorySizes = () => {
    const tree: Record<string, any> = {};
    const currentDir: string[] = [];
    inputData
      .map((uhLine: string) => uhLine.split(" "))
      .forEach((line: string[]) => {
        if (line[0] === "$") {
          if (line[1] === "cd") {
            line[2] === ".." ? currentDir.pop() : currentDir.push(line[2]);
          }
        } else {
          if (!tree[currentDir.join("/")]) {
            tree[currentDir.join("/")] = {};
          }
          if (line[0] !== "dir") {
            tree[currentDir.join("/")][line[1]] = Number(line[0]);
          } else {
            tree[currentDir.join("/")][line[1]] = "dir";
          }
        }
      });
    const sizes = {};
    getTreeSizes(tree, "/", sizes);

    return sizes;
  };

  const getTreeSizes = (
    tree: Record<string, any>,
    dir: string,
    obj: Record<string, number>
  ): any => {
    const size = Object.entries(tree[dir]).reduce(
      (acc, [file, size]) =>
        (acc +=
          size === "dir" ? getTreeSizes(tree, `${dir}/${file}`, obj) : size),
      0
    );

    obj[dir] = size;
    return size;
  };

  const day7FirstSolution = () => {
    return Object.entries(getDirectorySizes())
      .filter((size: any) => size[1] <= 100000)
      .reduce((a, c: any) => a + c[1], 0);
  };

  const day7SecondSolution = () => {
    const sizes: Record<string, number> = getDirectorySizes();
    const leftUntilMin = 30000000 - (70000000 - sizes["/"]);

    return Object.entries(sizes)
      .filter((fileSize) => fileSize[1] >= leftUntilMin)
      .sort((a, b) => a[1] - b[1])[0][1];
  };

  return { day7FirstSolution, day7SecondSolution };
}

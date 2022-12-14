import inputFile from "../assets/input.txt";

export default function day14Composition() {
  const inputData = inputFile.split("\n");

  const getMap = () => {
    const map: Set<string> = new Set();
    let maxY = 0;

    for (const line of inputData) {
      const points = line.split(" -> ").map((point: string) => {
        const [x, y] = point.split(",").map(Number);

        if (y > maxY) {
          maxY = y;
        }

        return { x, y };
      });

      const newPoint = points.shift();

      while (points.length) {
        const endPoint = points.shift();

        while (newPoint.x !== endPoint.x || newPoint.y !== endPoint.y) {
          map.add(`${newPoint.x},${newPoint.y}`);

          if (newPoint.x !== endPoint.x) {
            const diff =
              (endPoint.x - newPoint.x) / Math.abs(endPoint.x - newPoint.x);
            newPoint.x += diff;
          } else {
            const diff =
              (endPoint.y - newPoint.y) / Math.abs(endPoint.y - newPoint.y);
            newPoint.y += diff;
          }
        }
        map.add(`${newPoint.x},${newPoint.y}`);
      }
    }

    return { map, maxY };
  };

  const addPoint = (map: Set<string>, point: { x: number; y: number }) => {
    map.add(`${point.x},${point.y}`);
  };

  const isPointTaken = (map: Set<string>, point: { x: number; y: number }) => {
    return map.has(`${point.x},${point.y}`);
  };

  const day14FirstSolution = () => {
    const { map, maxY } = getMap();
    let isFull = false;
    let sandCnt = 0;

    while (!isFull) {
      const point = { x: 500, y: 0 };
      sandCnt++;

      while (!isFull) {
        if (!isPointTaken(map, { x: point.x, y: point.y + 1 })) {
          point.y++;
        } else if (!isPointTaken(map, { x: point.x - 1, y: point.y + 1 })) {
          point.y++;
          point.x--;
        } else if (!isPointTaken(map, { x: point.x + 1, y: point.y + 1 })) {
          point.y++;
          point.x++;
        } else {
          addPoint(map, point);
          break;
        }

        if (point.y >= maxY) {
          isFull = true;
          sandCnt--;
        }
      }
    }

    return sandCnt;
  };

  const day14SecondSolution = () => {
    const { map, maxY } = getMap();
    let sandCnt = 0;
    let isFull = false;

    while (!isFull) {
      const point = { x: 500, y: 0 };
      sandCnt++;

      // eslint-disable-next-line no-constant-condition
      while (point.y !== maxY + 1) {
        if (!isPointTaken(map, { x: point.x, y: point.y + 1 })) {
          point.y++;
        } else if (!isPointTaken(map, { x: point.x - 1, y: point.y + 1 })) {
          point.y++;
          point.x--;
        } else if (!isPointTaken(map, { x: point.x + 1, y: point.y + 1 })) {
          point.y++;
          point.x++;
        } else {
          addPoint(map, point);
          break;
        }
      }
      addPoint(map, point);

      if (isPointTaken(map, { x: 500, y: 0 })) {
        isFull = true;
        break;
      }
    }

    return sandCnt;
  };

  return { day14FirstSolution, day14SecondSolution };
}

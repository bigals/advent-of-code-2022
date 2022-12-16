import inputFile from "../assets/input.txt";

export interface Point {
  x: number;
  y: number;
}

export interface DeviceRecord {
  sensor: Point;
  beacon: Point;
  distance: number;
}

export default function day15Composition() {
  const inputData = inputFile.split("\n");

  const maxPos = 4000000;

  const parseInput = (input: string[]): DeviceRecord[] => {
    return input.map((line: string) => {
      const halves = line.split(": ");
      const sensorCordParts = halves[0].split("Sensor at ")[1].split(", ");
      const beaconCordParts = halves[1]
        .split("closest beacon is at ")[1]
        .split(", ");

      const sensorX = Number(sensorCordParts[0].substring(2));
      const sensorY = Number(sensorCordParts[1].substring(2));
      const beaconX = Number(beaconCordParts[0].substring(2));
      const beaconY = Number(beaconCordParts[1].substring(2));
      const sensor: Point = { x: sensorX, y: sensorY };
      const beacon: Point = { x: beaconX, y: beaconY };

      return {
        sensor,
        beacon,
        distance: getManhattanDistance(sensor, beacon),
      };
    });
  };

  const getManhattanDistance = (p1: Point, p2: Point) => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  };

  const checkIfPositionIsDistress = (
    cPoint: Point,
    max: number,
    records: DeviceRecord[]
  ): boolean | Point => {
    if (cPoint.x < 0 || cPoint.y < 0 || cPoint.x > max || cPoint.y > max)
      return false;

    for (const point of records) {
      const distanceToSensor = getManhattanDistance(point.sensor, cPoint);
      const distanceToBeacon = getManhattanDistance(cPoint, point.beacon);

      if (distanceToSensor <= point.distance || distanceToBeacon === 0)
        return false; // cant be, since sensor would be close enough
    }

    return cPoint;
  };

  const day15FirstSolution = () => {
    const records = parseInput(inputData);
    const targetRow = 2000000;
    const result: Record<number, any> = {};

    for (const record of records) {
      if (record.beacon.y === targetRow) {
        result[record.beacon.x] = 0;
      }

      const distanceToTargetRow =
        record.distance - Math.abs(record.sensor.y - targetRow);

      for (
        let x = record.sensor.x - distanceToTargetRow;
        x <= record.sensor.x + distanceToTargetRow;
        x++
      ) {
        if (result[x] !== 0) {
          result[x] = 1;
        }
      }
    }

    return Object.values(result).reduce((acc, space) => (acc += space));
  };

  const day15SecondSolution = () => {
    const records = parseInput(inputData);
    const max = 4000000;
    let foundDistressSignal: boolean | Point = false;

    outerLoop: for (const record of records) {
      const x = record.sensor.x;
      const y = record.sensor.y;
      const d = record.distance + 1;

      for (let i = 0; i < d; i++) {
        if (
          (foundDistressSignal ||= checkIfPositionIsDistress(
            { x: x + i, y: y - d + i },
            max,
            records
          ))
        )
          break outerLoop;
        if (
          (foundDistressSignal ||= checkIfPositionIsDistress(
            { x: x + d - i, y: y + i },
            max,
            records
          ))
        )
          break outerLoop;
        if (
          (foundDistressSignal ||= checkIfPositionIsDistress(
            { x: x - i, y: y + d - i },
            max,
            records
          ))
        )
          break outerLoop;
        if (
          (foundDistressSignal ||= checkIfPositionIsDistress(
            { x: x - d + i, y: y - i },
            max,
            records
          ))
        )
          break outerLoop;
      }
    }

    return (
      (foundDistressSignal as Point).x * max + (foundDistressSignal as Point).y
    );
  };

  return { day15FirstSolution, day15SecondSolution };
}

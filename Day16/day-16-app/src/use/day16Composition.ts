import inputFile from "../assets/input.txt";

export interface Valve {
  name: string;
  rate: number;
  tunnels: string[];
}

export interface TraversePath {
  location: string;
  toVisit: string;
  timeRemaining: number;
  finished: boolean;
  visited: string[];
  finalPressure: number;
}

export default function day16Composition() {
  const inputData = inputFile.split("\n");

  const parseInput = (
    lines: string[]
  ): { valveMap: Record<string, Valve>; valveArr: Valve[] } => {
    const stupidTunnels = new Set();
    const valveMap: Record<string, Valve> = {};
    const valveArr = (
      lines.map((line) => {
        let rawLine = "";
        if (line.length < 52) {
          rawLine = line
            .replace("Valve ", "")
            .replace(" has flow rate=", ",")
            .replace("; tunnel leads to valve ", ";");
        } else {
          rawLine = line
            .replace("Valve ", "")
            .replace(" has flow rate=", ",")
            .replace("; tunnels lead to valves ", ";");
        }

        const halves = rawLine.split(";");
        const [valveName, flowRate] = halves[0].split(",");
        const tunnels = halves[1].split(", ");
        return { name: valveName, rate: parseInt(flowRate, 10), tunnels };
      }) as Valve[]
    ).map((valve) => {
      if (!valveMap[valve.name]) {
        valveMap[valve.name] = {} as Valve;
      }
      valveMap[valve.name] = {
        ...valve,
        tunnels: valve?.tunnels,
      };
      return valve;
    });

    return { valveMap, valveArr };
  };

  const getPathCosts = (
    start: Valve,
    endValves: Valve[],
    valves: Record<string, Valve>
  ) => {
    const visited: string[] = [];
    const toVisit = [start];
    const lowestCost = { [start.name]: 0 };
    let curr;

    while ((curr = toVisit.shift())) {
      if (visited.includes(curr.name)) continue;

      const tunnelsToVisit = curr.tunnels
        .filter((tunnel) => !visited.includes(tunnel))
        .map((tunnel) => valves[tunnel]);
      toVisit.push(...tunnelsToVisit);

      const costToCurr = lowestCost[curr.name];

      tunnelsToVisit.forEach((tunnel) => {
        const newTunnelCost = costToCurr + 1;
        const costToTunnel =
          lowestCost[tunnel.name] === undefined
            ? newTunnelCost
            : lowestCost[tunnel.name];

        if (newTunnelCost <= costToTunnel) {
          lowestCost[tunnel.name] = newTunnelCost;
        }
      });

      visited.push(curr.name);
    }

    return endValves.reduce((map, valve) => {
      return {
        ...map,
        [valve.name]: lowestCost[valve.name],
      };
    }, {});
  };

  const getMaxPressurePath = (
    time: number,
    endValves: Valve[],
    costs: Record<string, Record<string, number>>,
    valves: Record<string, Valve>,
    isSecondSolution?: boolean
  ) => {
    const routes = [
      {
        location: "AA",
        toVisit: endValves.map((valve) => valve.name),
        timeRemaining: time,
        finished: false,
        visited: [] as string[],
        finalPressure: 0,
      },
    ];

    for (let i = 0; i < routes.length; i++) {
      const step = routes[i];

      if (step.timeRemaining <= 0 || step.finished) {
        step.finished = true;
        continue;
      }

      const currCosts = costs[step.location];
      let madeNewPath = false;
      step.toVisit.forEach((valve) => {
        if (
          valve !== step.location &&
          step.timeRemaining - currCosts[valve] > 1
        ) {
          madeNewPath = true;
          const newTime = step.timeRemaining - currCosts[valve] - 1;
          routes.push({
            location: valve,
            toVisit: step.toVisit.filter((v) => v !== valve),
            timeRemaining: newTime,
            finished: false,
            visited: [...step.visited, valve],
            finalPressure:
              step.finalPressure +
              (step.timeRemaining - currCosts[valve] - 1) * valves[valve].rate,
          });

          if (isSecondSolution) {
            routes.push({
              location: valve,
              toVisit: [],
              timeRemaining: newTime,
              finished: true,
              visited: [...step.visited, valve],
              finalPressure: step.finalPressure + newTime * valves[valve].rate,
            });
          }
        }
      });

      if (!madeNewPath) {
        step.finished = true;
      }
    }

    return routes
      .filter((route) => route.finished)
      .sort((a, b) => b.finalPressure - a.finalPressure);
  };

  const getMaxPressurePathWithElephant = (
    endValves: Valve[],
    costs: Record<string, Record<string, number>>,
    valves: Record<string, Valve>
  ) => {
    let maxPressure = -1;
    const routes = getMaxPressurePath(26, endValves, costs, valves);
    for (let me = 0; me < routes.length; me++) {
      for (let elephant = me + 1; elephant < routes.length; elephant++) {
        if (
          routes[me].visited.every((v) => !routes[elephant].visited.includes(v))
        ) {
          if (
            routes[me].finalPressure + routes[elephant].finalPressure >
            maxPressure
          ) {
            maxPressure =
              routes[me].finalPressure + routes[elephant].finalPressure;
          }
        }
      }
    }

    return maxPressure;
  };

  const day16FirstSolution = () => {
    const { valveMap: valves, valveArr } = parseInput(inputData);

    const start = valves["AA"];
    const startValves = [
      start,
      ...valveArr.filter((valve) => valve.rate !== 0),
    ];
    const endValves = [...valveArr.filter((valve) => valve.rate !== 0)];

    const movePrices = startValves.reduce((map, valveChoice) => {
      return {
        ...map,
        [valveChoice.name]: getPathCosts(
          valveChoice,
          endValves.filter((valve) => valve.name !== valveChoice.name),
          valves
        ),
      };
    }, {});

    return getMaxPressurePath(30, endValves, movePrices, valves)[0]
      .finalPressure;
  };

  const day16SecondSolution = () => {
    const { valveMap: valves, valveArr } = parseInput(inputData);

    const start = valves["AA"];
    const startValves = [
      start,
      ...valveArr.filter((valve) => valve.rate !== 0),
    ];
    const endValves = [...valveArr.filter((valve) => valve.rate !== 0)];

    const movePrices = startValves.reduce((map, valveChoice) => {
      return {
        ...map,
        [valveChoice.name]: getPathCosts(
          valveChoice,
          endValves.filter((valve) => valve.name !== valveChoice.name),
          valves
        ),
      };
    }, {});

    return getMaxPressurePathWithElephant(endValves, movePrices, valves);
  };

  return { day16FirstSolution, day16SecondSolution };
}

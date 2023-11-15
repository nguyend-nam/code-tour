import { CodeStepConfig } from "../components";

export const demoSourceCode = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum";
  dolor = elit(dolor, 3);
  
  while (++consectetur < amet) {
    // TODO
  }
}`;

export const demoSteps: CodeStepConfig[] = [
  { stepName: "Start" },
  {
    stepName: "Highlight",
    focus: [0, [4, 6]],
  },
  {
    stepName: "Highlight + Replace",
    focus: 5,
    replaces: [
      {
        line: 5,
        values: "    sit.eiusmod();",
      },
    ],
  },
  {
    stepName: "Highlight + Replace",
    focus: 5,
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
    ],
  },
  {
    stepName: "Highlight + Insert",
    focus: 6,
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
    ],
    inserts: [
      {
        line: 6,
        values: "    tempor();",
      },
    ],
  },
  {
    stepName: "Highlight + Insert",
    focus: 6,
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
    ],
    inserts: [
      {
        line: 6,
        values: "    tempor(ipsum, adipiscing);",
      },
    ],
  },
  {
    stepName: "End",
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
    ],
    inserts: [
      {
        line: 6,
        values: "    tempor(ipsum, adipiscing);",
      },
    ],
  },
  {
    focus: [4, 7],
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
    ],
    inserts: [
      {
        line: 6,
        values: "    tempor(ipsum, adipiscing);",
      },
    ],
  },
  {
    focus: [4, 7],
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
      {
        line: 4,
        values: "  do {",
      },
      {
        line: 7,
        values: "  } while (++consectetur < amet);",
      },
    ],
    inserts: [
      {
        line: 6,
        values: "    tempor(ipsum, adipiscing);",
      },
    ],
  },
  {
    replaces: [
      {
        line: 5,
        values: '    sit.eiusmod("dolor sit amet");',
      },
      {
        line: 4,
        values: "  do {",
      },
      {
        line: 7,
        values: "  } while (++consectetur < amet);",
      },
    ],
    inserts: [
      {
        line: 6,
        values: "    tempor(ipsum, adipiscing);",
      },
    ],
  },
];

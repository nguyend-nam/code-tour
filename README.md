# Code Tour

View on: [NPM](https://www.npmjs.com/package/@nguyend-nam/code-tour) &bullet; [GitHub](https://github.com/nguyend-nam/code-tour)

[Official website](https://code-tour.js.org)

**Code Tour** is a ReactJS component designed for interactive code walkthroughs on the web. With Code Tour, seamlessly guide users through your codebase by passing code snippets, configuring steps to replace or highlight specific lines. Users can effortlessly navigate through each step using intuitive arrow buttons, transforming your code exploration into an engaging and dynamic slideshow experience.

## Installation

Feel free to use the package manager of your choice:

```bash
# Using PNPM
pnpm i @nguyend-nam/code-tour

# Using NPM
npm i @nguyend-nam/code-tour

# Using Yarn
yarn add @nguyend-nam/code-tour
```

## Usage

### Importing `CodeTour`

```javascript
import { CodeTour } from "@nguyend-nam/code-tour";
```

### Using in the web

Define your `CodeTour` component within your React component, specifying the steps you want to include. Each step corresponds to segment(s) of your codebase that you want to highlight or replace:

```javascript copy
// ...

const str = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum";
  dolor = elit(dolor, 3);
  
  while (++consectetur < amet) {
    // TODO
  }
}`;

<CodeTour
  defaultSourceCode={str}
  language="javascript"
  steps={[
    {},
    {
      focus: [0, [4, 6]],
    },
    {
      focus: 5,
      replaces: [
        {
          line: 5,
          values: "    sit.eiusmod();",
        },
      ],
    },
    {
      focus: 5,
      replaces: [
        {
          line: 5,
          values: '    sit.eiusmod("dolor sit amet");',
        },
      ],
    },
    {
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
    // ...
  ]}
/>

// ...
```

## Official website & documentation

- Official website: https://code-tour.js.org
- Document: https://code-tour.js.org/introduction

## Contributing

Whether you have ideas for new features, want to report bugs, or are interested in improving the library's functionality, your contributions are highly valued. Visit our GitHub repository at https://github.com/nguyend-nam/code-tour to get involved and contribute to the project.

## License

[ISC](https://choosealicense.com/licenses/isc/)

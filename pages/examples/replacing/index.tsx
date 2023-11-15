// @ts-ignore
import styles from "./styles.module.css";
import { CodeTour } from "../../../components";

const str = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum";
  dolor = elit(dolor, 3);
  
  while (++consectetur < amet) {
    // TODO
  }
}`;

export default function CodeTourDemo() {
  return (
    <div className={styles.layout}>
      <CodeTour
        defaultSourceCode={str}
        language="javascript"
        steps={[
          {},
          {
            focus: [4, 6],
          },
          {
            focus: [4, 6],
            replaces: [
              {
                line: 4,
                values: "  do {",
              },
              {
                line: 6,
                values: "  } while (++consectetur < amet);",
              },
            ],
          },
          {
            replaces: [
              {
                line: 4,
                values: "  do {",
              },
              {
                line: 6,
                values: "  } while (++consectetur < amet);",
              },
            ],
          },
        ]}
      />
    </div>
  );
}

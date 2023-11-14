// @ts-ignore
import styles from "./styles.module.css";
import { CodeTour } from "../../../components";

const str = `function lorem(ipsum, dolor) {
}`;

export default function CodeTourDefaultDemo() {
  return (
    <div className={styles.layout}>
      <CodeTour
        defaultSourceCode={str}
        language="javascript"
        steps={[
          {},
          {
            inserts: [
              {
                line: 1,
                values: '  const sit = "lorem ipsum";',
              },
            ],
          },
          {
            inserts: [
              {
                line: 1,
                values: '  const sit = "lorem ipsum";',
              },
              {
                line: 1,
                values: '  dolor = elit(dolor, 3);',
              },
            ],
          },
        ]}
      />
    </div>
  );
}

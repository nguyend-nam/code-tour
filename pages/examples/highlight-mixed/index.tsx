// @ts-ignore
import styles from "./styles.module.css";
import { CodeTour } from "../../../components";

const str = `function lorem(ipsum, dolor) {
  const sit = "lorem ipsum";
  dolor = elit(dolor, 3);
  
  while (++consectetur < amet) {
    sit.eiusmod("dolor sit amet");
  }
}`;

export default function CodeTourDefaultDemo() {
  return (
    <div className={styles.layout}>
      <CodeTour
        defaultSourceCode={str}
        language="javascript"
        steps={[
          {
            focus: [0, [4, 6]],
          },
        ]}
      />
    </div>
  );
}

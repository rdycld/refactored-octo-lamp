import clsx from "clsx";
import styles from "./HiringProcess.module.scss";

export const HiringProcess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div
          className={clsx("caption14-desktop caption14-mobile", styles.counter)}
        >
          01
        </div>

        <div className="h5-desktop h5-mobile">Application</div>
      </div>
      <div className={styles.item}>
        <div
          className={clsx("caption14-desktop caption14-mobile", styles.counter)}
        >
          02
        </div>
        <div className="h5-desktop h5-mobile">HR interview</div>
      </div>
      <div className={styles.item}>
        <div
          className={clsx("caption14-desktop caption14-mobile", styles.counter)}
        >
          03
        </div>
        <div className="h5-desktop h5-mobile">Assessment</div>
      </div>
      <div className={styles.item}>
        <div
          className={clsx("caption14-desktop caption14-mobile", styles.counter)}
        >
          04
        </div>
        <div className="h5-desktop h5-mobile">Functional interview</div>
      </div>
      <div className={styles.item}>
        <div
          className={clsx("caption14-desktop caption14-mobile", styles.counter)}
        >
          05
        </div>
        <div className="h5-desktop h5-mobile">On-site visit</div>
      </div>
    </div>
  );
};

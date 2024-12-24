import clsx from "clsx";
import styles from "./Careers.module.scss";
import { Button } from "@@ui/Button/Button";
type CareerProps = {
  title: string;
  jobs: {
    name: string;
    location: string;
    fte: string;
    url: string;
  }[];
};
export const Careers = ({ title, jobs }: CareerProps) => {
  return (
    <div>
      <div className={clsx("h4-desktop h4-mobile", styles.title)}>{title}</div>
      <div>
        {jobs.map(({ name, location, fte, url }) => (
          <div className={styles.container}>
            <div
              className={clsx(
                "caption14-desktop caption14-mobile",
                styles.jobContainer
              )}
            >
              <div>{name}</div>
              <div>{location}</div>
              <div>{fte}</div>
              <Button asLink href={url} variant="hollowDark">
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

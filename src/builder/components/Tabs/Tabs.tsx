import { useState } from "react";
import styles from "./Tabs.module.scss";
import { Button } from "@@ui/Button/Button";
import clsx from "clsx";

type TabsProps = {
  text: string;
  tabs: [
    {
      image: string;
      title: string;
    }
  ];
};

export const Tabs = ({ tabs, text }: TabsProps) => {
  const [currentTab, setCurrentTabe] = useState(
    Math.floor(Math.random() * tabs.length)
  );

  return (
    <div className={styles.container}>
      <p className={clsx(styles.text, "h5-desktop h5-mobile")}>{text}</p>
      <div className={styles.slidesContainer}>
        <div
          className={styles.slides}
          style={{
            transform: `translateX(-${(100 / tabs.length) * currentTab}%)`,
            width: `${100 * tabs.length}%`,
          }}
        >
          {tabs.map((tab, idx) => (
            <div
              aria-hidden={idx === currentTab ? "false" : "true"}
              key={idx}
              className={styles.imageContainer}
              style={{
                backgroundImage: `url(${tab.image})`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        {tabs.map((tab, idx) => (
          <Button
            size="small"
            withCounter
            variant={idx === currentTab ? "full" : "hollowPurple"}
            count={idx + 1}
            onClick={() => {
              setCurrentTabe(idx);
            }}
          >
            {tab.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

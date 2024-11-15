import { Typography } from "@@typography/Typography";

import styles from "./LogoTile.module.scss";

type LogoTileProps = {
  description: string;
  children: React.ReactNode;
};

export const LogoTile = ({ children, description }: LogoTileProps) => {
  return (
    <div className={styles.container}>
      {children}
      <Typography kind="body4" className={styles.text}>
        {description}
      </Typography>
    </div>
  );
};

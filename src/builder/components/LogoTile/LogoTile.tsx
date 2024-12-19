import styles from "./LogoTile.module.scss";
import clsx from "clsx";

type LogoTileProps = {
  description: string;
  children: React.ReactNode;
};

export const LogoTile = ({ children, description }: LogoTileProps) => {
  return (
    <div className={styles.container}>
      {children}
      <p className={clsx("caption14-desktop caption14-mobile", styles.text)}>
        {description}
      </p>
    </div>
  );
};

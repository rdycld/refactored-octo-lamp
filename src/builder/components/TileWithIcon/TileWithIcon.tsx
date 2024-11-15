import styles from "./TileWithIcon.module.scss";

type TileWithIconProps = {
  children: React.ReactNode;
};

export const TileWithIcon = ({ children }: TileWithIconProps) => {
  return <div className={styles.container}>{children}</div>;
};

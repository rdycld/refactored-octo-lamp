import type { MouseEvent } from "react";
import styles from "./NavItem.module.scss";

type NavItemProps = {
  children: React.ReactNode;
  onHover: (e: MouseEvent) => void;
};

export const NavItem = ({ children, onHover }: NavItemProps) => {
  return (
    <div onMouseEnter={onHover} className={styles.container}>
      {children}
    </div>
  );
};

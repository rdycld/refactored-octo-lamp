import type { MouseEvent } from "react";
import Chevron from "@@icons/double_arrow_down.svg?react";

import styles from "./NavItem.module.scss";
import clsx from "clsx";
import { Button } from "@@ui/Button/Button";

type NavItemProps = {
  children: React.ReactNode;
  onHover: (e: MouseEvent, name: string) => void;
  name: string;
  url: string;
  active: boolean;
  withSubMenu: boolean;
  asButton?: boolean;
};

export const NavItem = ({
  children,
  onHover,
  name,
  url,
  active,
  withSubMenu,
  asButton,
}: NavItemProps) => {
  return asButton ? (
    <Button
      asLink
      href={url}
      size="small"
      onMouseEnter={(e) => onHover(e, name)}
      className={styles.containerButton}
    >
      {children}
      {withSubMenu && (
        <Chevron
          className={clsx(styles.chevron, { [styles.active]: active })}
        />
      )}
    </Button>
  ) : withSubMenu ? (
    <p
      onMouseEnter={(e) => onHover(e, name)}
      className={clsx(styles.container, {
        [styles.containerActive]: active,
      })}
    >
      {children}
      {withSubMenu && (
        <Chevron
          className={clsx(styles.chevron, { [styles.active]: active })}
        />
      )}
    </p>
  ) : (
    <a
      href={url}
      onMouseEnter={(e) => onHover(e, name)}
      className={clsx(styles.container, {
        [styles.containerActive]: active,
      })}
    >
      {children}
      {withSubMenu && (
        <Chevron
          className={clsx(styles.chevron, { [styles.active]: active })}
        />
      )}
    </a>
  );
};

import clsx from "clsx";
import styles from "./Button.module.scss";

import DoubleArrowRight from "@@icons/double_arrow_right.svg?react";

type Common = {
  children?: string;
  size?: "small" | "normal";
  variant?: "full" | "hollow" | "hollowDark";
  disabled?: boolean;
};

type ButtonProps = Common &
  (
    | {
        asLink?: false;
        withCounter?: false;
        onClick: (e: React.MouseEvent) => void;
      }
    | {
        asLink?: false;
        withCounter: true;
        count: string | number;
        onClick: (e: React.MouseEvent) => void;
      }
    | {
        asLink: true;
        href: string;
        withCounter?: false;
      }
    | {
        asLink: true;
        href: string;
        withCounter: true;
        count: string | number;
      }
  );

const Spacer = () => {
  return (
    <svg
      width="2px"
      height="22px"
      viewBox="0 0 2 22"
      className={styles.spacer}
    ></svg>
  );
};

export const Button = ({
  children,
  size = "normal",
  variant = "full",
  ...rest
}: ButtonProps) => {
  const { asLink, withCounter } = rest;

  const Tag: Extract<"a" | "button", keyof JSX.IntrinsicElements> = asLink
    ? "a"
    : "button";

  return (
    <Tag
      className={clsx(styles.base, styles[size], styles[variant], {
        [styles.withCounter]: withCounter,
      })}
      {...rest}
    >
      {children}
      <Spacer />
      {rest.withCounter ? (
        <span>{rest.count}</span>
      ) : (
        <DoubleArrowRight className={styles.icon} />
      )}
    </Tag>
  );
};

import clsx from "clsx";
import styles from "./SectionHeader.module.scss";
import { Button } from "@@ui/Button/Button";

type SectionProps =
  | {
      children: React.ReactNode;
      variant: "overflow" | "normal";
      withCta: false;
    }
  | {
      children: React.ReactNode;
      variant: "overflow" | "normal";
      withCta: true;
      cta: string;
      to: string;
    };

export const SectionHeader = ({ children, variant, ...rest }: SectionProps) => {
  const { withCta } = rest;
  return (
    <div className={clsx(styles.base, styles[variant])}>
      <div
        className={clsx({
          [styles.withCta]: withCta,
        })}
      >
        {children}
      </div>
      {withCta && (
        <Button asLink href={rest.to}>
          {rest.cta}
        </Button>
      )}
    </div>
  );
};

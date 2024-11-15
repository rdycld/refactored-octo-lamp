import styles from "./SectionWrapper.module.scss";

type SectionWrapperProps = {
  children: React.ReactNode;
  variant: "full" | "overflow" | "normal";
};

export const SectionWrapper = ({ children, variant }: SectionWrapperProps) => {
  return <div className={styles[variant]}>{children}</div>;
};

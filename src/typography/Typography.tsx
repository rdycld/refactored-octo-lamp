import styles from "./Typography.module.scss";

type Size = 1 | 2 | 3 | 4 | 5;
type Type = "body" | "heading";
type Kind = `${Type}${Size}`;

type TypographyTags = Extract<
  "p" | "h1" | "h2" | "h3" | "h4" | "h5",
  keyof JSX.IntrinsicElements
>;

type TypographyProps = {
  kind?: Kind;
  children: string;
  asKind?: boolean;
};

const kindToTagMapping: Record<Kind, TypographyTags> = {
  body1: "p",
  body2: "p",
  body3: "p",
  body4: "p",
  body5: "p",
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  heading5: "h5",
};

export const Typography = ({
  kind = "body2",
  children,
  asKind = false,
}: TypographyProps) => {
  const Tag: TypographyTags = asKind ? kindToTagMapping[kind] : "p";

  return <Tag className={styles[kind]}>{children}</Tag>;
};

import { Typography } from "@@typography/Typography";
import styles from "./BlogCard.module.scss";
import ArrowsIcon from "@@icons/double_arrow_right.svg?react";

type BlogCardProps = {
  url: string;
  headerImage: string;
  teaser: string;
  tags: string[];
  expectedTag?: string;
};
export const BlogCard = ({
  teaser,
  headerImage,
  url,
  tags = [],
  expectedTag,
}: BlogCardProps) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={headerImage} />
      <div className={styles.content}>
        {(expectedTag || tags[0]) && (
          <div className={styles.tag}>{expectedTag ?? tags[0]}</div>
        )}
        <Typography className={styles.teaser} kind="heading5">
          {teaser}
        </Typography>
        <a href={url} className={styles.button}>
          <ArrowsIcon />
        </a>
      </div>
    </div>
  );
};

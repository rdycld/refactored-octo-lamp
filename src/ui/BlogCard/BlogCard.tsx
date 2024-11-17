import { Typography } from "@@typography/Typography";
import styles from "./BlogCard.module.scss";
import { Button } from "@@ui/Button/Button";

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
        <Button
          className={styles.button}
          href={url}
          variant="hollowDark"
          asLink
        ></Button>
      </div>
    </div>
  );
};

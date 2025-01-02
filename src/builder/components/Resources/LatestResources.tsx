import { useEffect, useState } from "react";

import styles from "./LatestResources.module.scss";
import { BlogCard } from "@@ui/BlogCard/BlogCard";
import clsx from "clsx";

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CND_BASE_URL = import.meta.env.VITE_PUBLIC_BUILDER_CDN_BASE_URL;
const NO_ARTICLES = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTag = (article: any) =>
  article.typeTag?.[0] ??
  article.topicTag?.[0] ??
  article.industryTag?.[0] ??
  "";

export const LatestResources = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const f = async () => {
      const response = await fetch(
        `${BUILDER_CND_BASE_URL}/resources?apiKey=${BUILDER_API_KEY}`
      );

      if (!response.ok) {
        setData([]);
        return;
      }

      const resources = await response.json();

      setData(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resources.results.slice(0, NO_ARTICLES).map((el: any) => el.data)
      );
    };
    f();
  }, []);

  if (!data.length) return null;

  return (
    <div className={styles.container}>
      <BlogCard
        dark
        headerImage={data[0].image}
        tags={getTag(data[0])}
        teaser={data[0].title}
        url={data[0].url}
        expectedTag={getTag(data[0])}
      />

      <div>
        {data.slice(1).map((article) => (
          <div className={styles.article} key={article.title}>
            <div className={clsx(styles.label, "label-desktop label-mobile")}>
              {getTag(article)}
            </div>
            <a
              href={article.url}
              className={clsx(styles.title, "h5-desktop h5-mobile")}
            >
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

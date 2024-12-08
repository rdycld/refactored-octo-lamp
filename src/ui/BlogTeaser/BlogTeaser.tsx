import { BlogCard } from "@@ui/BlogCard/BlogCard";
import { useEffect, useState } from "react";

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CND_BASE_URL = import.meta.env.VITE_PUBLIC_BUILDER_CDN_BASE_URL;

import styles from "./BlogTeaser.module.scss";

type BlogTeaserProps = {
  tag?: string;
  maxTiles?: number;
};

type Post = {
  id: string;
  url: string;
  image: string;
  title: string;
  typeTag: string[];
};

export const BlogTeaser = ({ tag, maxTiles = 3 }: BlogTeaserProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const f = async () => {
      const response = await fetch(
        `${BUILDER_CND_BASE_URL}/resources?apiKey=${BUILDER_API_KEY}&limit=${maxTiles}${
          tag ? `&query.data.tags.$elemMatch='${tag}'` : ""
        }`
      );

      if (!response.ok) {
        setPosts([]);
        return;
      }

      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setPosts(data.results.map((el: any) => ({ ...el.data, id: el.id })));
    };
    f();
  }, [tag, maxTiles]);

  return (
    <div
      className={styles.container}
      style={{
        gridTemplateColumns: `repeat(${maxTiles}, 1fr)`,
      }}
    >
      {!posts && <div>loading</div>}
      {posts.map((data) => (
        <BlogCard
          key={data.id}
          url={data.url}
          tags={data.typeTag}
          teaser={data.title}
          headerImage={data.image}
          expectedTag={tag}
        />
      ))}
    </div>
  );
};

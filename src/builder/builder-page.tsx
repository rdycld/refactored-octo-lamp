import React, { useMemo } from "react";
import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
  type BuilderContent,
} from "@builder.io/sdk-react";
import { CUSTOM_COMPONENTS } from "./builder-registry";
import { NavBar } from "@@ui/NavBar/NavBar";
import { Footer } from "@@ui/Footer/Footer";
import { SectionWrapper } from "@@builder/components/SectionWrapper/SectionWrapper";

import styles from "./builder-page.module.scss";
import { Breadcrumbs } from "@@ui/Breadcrumbs/Breadcrumbs";

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const MODEL_NAME = "page";

const getModelName = (pathname: string) => {
  return pathname.includes("/resources/") ? "resources" : "page";
};

export default function BuilderPage() {
  const [notFound, setNotFound] = React.useState(false);
  const [content, setContent] = React.useState<BuilderContent | null>(null);

  // get the page content from Builder
  React.useEffect(() => {
    fetchOneEntry({
      model: getModelName(window.location.pathname),
      apiKey: BUILDER_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname,
      },
      options: getBuilderSearchParams(new URL(location.href).searchParams),
    })
      .then((content) => {
        if (content) {
          setContent(content);
        }
        setNotFound(!content);
      })
      .catch((err) => {
        console.log("Oops: ", err);
      });
  }, []);

  const published = useMemo(() => {
    if (!content) return "";
    //@ts-expect-error it should exist
    const date = new Date(content.firstPublished);

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }, [content]);

  console.log(content);
  if (notFound && !isPreviewing()) {
    return <div>404 Page Not Found</div>;
  }

  console.log(window.location.pathname.split("/"));

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
      {content && getModelName(window.location.pathname) === "resources" && (
        <>
          <SectionWrapper variant="overflow">
            <Breadcrumbs />
            <div className={styles.published}>Published: {published}</div>
            <div
              className="h3-desktop h3-mobile"
              style={{ maxWidth: "800px", marginBottom: "32px" }}
            >
              {content.data?.title}
            </div>
          </SectionWrapper>
          {content.data?.image && (
            <SectionWrapper variant="normal">
              <img
                className={styles.coverImage}
                src={content.data.image}
                alt=""
              />
            </SectionWrapper>
          )}
        </>
      )}

      <Content
        content={content}
        model={MODEL_NAME}
        apiKey={BUILDER_API_KEY}
        customComponents={CUSTOM_COMPONENTS}
      />
      <Footer />
    </div>
  );
}

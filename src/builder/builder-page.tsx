import React from "react";
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

  if (notFound && !isPreviewing()) {
    return <div>404 Page Not Found</div>;
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <NavBar />
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

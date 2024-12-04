const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CND_BASE_URL = import.meta.env.VITE_PUBLIC_BUILDER_CDN_BASE_URL;

import { MultiSelect } from "@@ui/MultiSelect/MultiSelect";
import styles from "./Resources.module.scss";
import { useEffect, useState } from "react";
import { BlogCard } from "@@ui/BlogCard/BlogCard";

const typeFilterOptions = [
  {
    value: "blog",
    label: "Blog",
  },
  {
    value: "whitepaper",
    label: "Whitepaper",
  },
  {
    value: "video",
    label: "Video",
  },
  {
    value: "event",
    label: "Event",
  },
  {
    value: "press",
    label: "Press",
  },
];

const industryFilterOptions = [
  {
    value: "3pl",
    label: "3PL",
  },
  {
    value: "retailers",
    label: "Retailers",
  },
  {
    value: "foodAndBeverages",
    label: "Food & Beverages",
  },
  {
    value: "fashionAndApparel",
    label: "Fashion & Apparel",
  },
  {
    value: "manufacturing",
    label: "Manufacturing",
  },
];

const topicFilterOptions = [
  {
    value: "Sustainability",
    label: "Sustainability",
  },
  {
    value: "Technology",
    label: "Technology",
  },
  {
    value: "Raff D'Andrea",
    label: "Raff D'Andrea",
  },
  {
    value: "People",
    label: "People",
  },
  {
    value: "Insights",
    label: "Insights",
  },
  {
    value: "Logistics and Operations",
    label: "Logistics and Operations",
  },
  {
    value: "automation",
    label: "Automation",
  },
  {
    value: "Autonomy",
    label: "Autonomy",
  },
  {
    value: "AI",
    label: "AI",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const Resources = () => {
  const [key, setKey] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const f = async () => {
      const response = await fetch(
        `${BUILDER_CND_BASE_URL}/resources?apiKey=${BUILDER_API_KEY}${
          topicFilter
            ? `&query.data.topicTag.$elemMatch={  $in: [${topicFilter}]  }`
            : ""
        }${
          typeFilter
            ? `&query.data.typeTag.$elemMatch={  $in: [${typeFilter}]  }`
            : ""
        }${
          industryFilter
            ? `&query.data.industryTag.$elemMatch={  $in: [${industryFilter}]  }`
            : ""
        }`
      );

      if (!response.ok) {
        setData([]);
        return;
      }

      const resources = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setData(resources.results.map((el: any) => ({ ...el.data, id: el.id })));
    };
    f();
  }, [industryFilter, topicFilter, typeFilter]);

  const handleChangeTopic = (e: string) => {
    if (!e.length) {
      setTopicFilter("");
      return;
    }

    setTopicFilter(
      e
        .split(",")
        .map((x) => `"${x}"`)
        .join(",")
    );
  };

  const handleChangeType = (e: string) => {
    if (!e.length) {
      setTypeFilter("");
      return;
    }

    setTypeFilter(
      e
        .split(",")
        .map((x) => `"${x}"`)
        .join(",")
    );
  };

  const handleChangeIndustry = (e: string) => {
    if (!e.length) {
      setIndustryFilter("");
      return;
    }

    setIndustryFilter(
      e
        .split(",")
        .map((x) => `"${x}"`)
        .join(",")
    );
  };

  const handleClearAll = () => {
    setKey((p) => p + 1);
  };

  return (
    <div key={key} className={styles.container}>
      <div className={styles.desktopFilters}>
        <MultiSelect options={typeFilterOptions} onChange={handleChangeType} />
        <MultiSelect
          options={industryFilterOptions}
          onChange={handleChangeIndustry}
        />
        <MultiSelect
          options={topicFilterOptions}
          onChange={handleChangeTopic}
        />
        <p
          role="button"
          tabIndex={0}
          className={styles.clearAllButton}
          onClick={handleClearAll}
        >
          CLEAR ALL
        </p>
      </div>
      <div className={styles.results}>
        {data.map((el) => (
          <BlogCard
            key={el.id}
            headerImage={el.image}
            tags={[...el.typeTag, ...el.topicTag, ...el.industryTag]}
            url={el.url}
            teaser={el.title}
          />
        ))}
      </div>
    </div>
  );
};

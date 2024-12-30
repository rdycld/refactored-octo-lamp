const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CND_BASE_URL = import.meta.env.VITE_PUBLIC_BUILDER_CDN_BASE_URL;

import { MultiSelect } from "@@ui/MultiSelect/MultiSelect";
import styles from "./Resources.module.scss";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementRef,
} from "react";
import { BlogCard } from "@@ui/BlogCard/BlogCard";
import clsx from "clsx";
import { Button } from "@@ui/Button/Button";
import CloseIcon from "@@icons/close.svg?react";

const typeFilterOptions = [
  {
    value: "Blog",
    label: "Blog",
  },
  {
    value: "Whitepaper",
    label: "Whitepaper",
  },
  {
    value: "Video",
    label: "Video",
  },
  {
    value: "Event",
    label: "Event",
  },
  {
    value: "Press",
    label: "Press",
  },
];

const industryFilterOptions = [
  {
    value: "3PL",
    label: "3PL",
  },
  {
    value: "Retailers",
    label: "Retailers",
  },
  {
    value: "Food & Beverages",
    label: "Food & Beverages",
  },
  {
    value: "Fashion & Apparel",
    label: "Fashion & Apparel",
  },
  {
    value: "Manufacturing",
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
    value: "Automation",
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<ElementRef<"div">>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const f = (e: MouseEvent) => {
      if (!drawerRef.current) return;
      if (e.target instanceof Node && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("click", f, true);

    return () => {
      window.removeEventListener("click", f, true);
    };
  }, [drawerRef]);

  useEffect(() => {
    const searchStr = window.location.href.slice(
      window.location.href.indexOf("?")
    );
    const params = new URLSearchParams(searchStr);

    const typeParam = params.get("type");

    if (!typeParam) return;

    if (!typeFilterOptions.some(({ value }) => value === typeParam)) return;

    if (typeFilter.split(",").includes(typeParam)) return;

    handleChangeFilters(`"${typeParam}"`, "type");
  }, []);

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

      setData(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resources.results.map((el: any) => ({
          ...el.data,
          id: el.id,
          industryTag: el.data.industryTag ?? [],
          topicTag: el.data.topicTag ?? [],
          typeTag: el.data.typeTag ?? [],
        }))
      );
    };
    f();
  }, [industryFilter, topicFilter, typeFilter]);

  const handleSyncTopic = useCallback((e: string) => {
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
  }, []);

  const handleSyncType = useCallback((e: string) => {
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
  }, []);

  const handleSyncIndustry = useCallback((e: string) => {
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
  }, []);

  const handleChangeFilters = (value: string, key: string) => {
    const f = (setter: React.Dispatch<React.SetStateAction<string>>) => {
      setter((prev) => {
        const asArr = prev.split(",");
        if (asArr.includes(value))
          return asArr.filter((el) => el !== value).join(",");
        if (prev.length) return `${prev},${value}`;
        else return value;
      });
    };
    switch (key) {
      case "topic":
        f(setTopicFilter);
        break;
      case "type":
        f(setTypeFilter);
        break;
      case "industry":
        f(setIndustryFilter);
        break;
    }
  };

  const handleClearAll = () => {
    setKey((p) => p + 1);
  };

  return (
    <div key={key} className={styles.container}>
      <div className={styles.desktopFilters}>
        <MultiSelect options={typeFilterOptions} onChange={handleSyncType} />
        <MultiSelect
          options={industryFilterOptions}
          onChange={handleSyncIndustry}
        />
        <MultiSelect options={topicFilterOptions} onChange={handleSyncTopic} />
        <p
          role="button"
          tabIndex={0}
          className={styles.clearAllButton}
          onClick={handleClearAll}
        >
          CLEAR ALL
        </p>
      </div>
      <div className={styles.mobileFilters}>
        <Button
          onClick={() => {
            setDrawerOpen(true);
          }}
          variant="hollowDark"
        >
          Filters (
          {(topicFilter.length ? topicFilter.split(",").length : 0) +
            (typeFilter.length ? typeFilter.split(",").length : 0) +
            (industryFilter.length ? industryFilter.split(",").length : 0)}
          )
        </Button>
        {drawerOpen && <div className={styles.backdrop}></div>}
        <div
          ref={drawerRef}
          className={clsx(styles.drawer, { [styles.drawerOpen]: drawerOpen })}
        >
          <div className={styles.drawerTop}>
            <p className={styles.drawerTitle}>Filters</p>
            <CloseIcon
              onClick={() => {
                setDrawerOpen(false);
              }}
            />
          </div>
          <div className={styles.drawerContent}>
            <div className={styles.filterSection}>
              <div className={styles.filterSectionHeader}>
                content ({typeFilter.length ? typeFilter.split(",").length : 0})
              </div>
              {typeFilterOptions.map((option) => (
                <div
                  key={option.value}
                  className={styles.option}
                  onClick={() => {
                    handleChangeFilters(`"${option.value}"`, "type");
                  }}
                >
                  <input
                    type="checkbox"
                    checked={typeFilter.includes(`"${option.value}"`)}
                  />
                  {option.label}
                </div>
              ))}
            </div>
            <div className={styles.filterSection}>
              <div className={styles.filterSectionHeader}>
                industry (
                {industryFilter.length ? industryFilter.split(",").length : 0})
              </div>
              {industryFilterOptions.map((option) => (
                <div
                  key={option.value}
                  className={styles.option}
                  onClick={() => {
                    handleChangeFilters(`"${option.value}"`, "industry");
                  }}
                >
                  <input
                    type="checkbox"
                    checked={industryFilter.includes(`"${option.value}"`)}
                  />
                  {option.label}
                </div>
              ))}
            </div>
            <div className={styles.filterSection}>
              <div className={styles.filterSectionHeader}>
                topic ({topicFilter.length ? topicFilter.split(",").length : 0})
              </div>
              {topicFilterOptions.map((option) => (
                <div
                  key={option.value}
                  className={styles.option}
                  onClick={() => {
                    handleChangeFilters(`"${option.value}"`, "topic");
                  }}
                >
                  <input
                    type="checkbox"
                    checked={topicFilter.includes(`"${option.value}"`)}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.drawerBottom}>
            <button
              onClick={() => {
                setTypeFilter("");
                setTopicFilter("");
                setIndustryFilter("");
              }}
              className={styles.clearAllButton}
            >
              clear all
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
              }}
              className={styles.applyButton}
            >
              close
            </button>
          </div>
        </div>
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

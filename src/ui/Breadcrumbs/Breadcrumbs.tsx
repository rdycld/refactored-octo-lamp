import { useMemo } from "react";
import styles from "./Breadcrumbs.module.scss";
import Arrow from "@@icons/arrow_down_black.svg?react";

export const Breadcrumbs = () => {
  const breadcrumbs = useMemo(() => {
    const segments = window.location.pathname.split("/");

    if (segments.length < 3) return [];

    let href = "";

    return segments.map((segment) => {
      href += href.endsWith("/") ? segment : `/${segment}`;

      return { href, name: segment === "" ? "Home" : segment };
    });
  }, []);

  return (
    <div className={styles.container}>
      {breadcrumbs.map(({ name, href }, i) => (
        <div className={styles.item} key={href}>
          <a className="caption13-desktop caption13-mobile" href={href}>
            {name}
          </a>
          {i < breadcrumbs.length - 1 && <Arrow className={styles.arrow} />}
        </div>
      ))}
    </div>
  );
};

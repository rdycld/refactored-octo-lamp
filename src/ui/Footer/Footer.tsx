import { SectionWrapper } from "@@builder/components/SectionWrapper/SectionWrapper";

import VerityLogoWhite from "../../assets/logo_verity_white.svg?react";
import YouTube from "@@icons/you_tube.svg?react";
import LinkedIn from "@@icons/linked_in.svg?react";

import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";
import { ContactForm } from "@@ui/Footer/ContactForm/ContactForm";

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CND_BASE_URL = import.meta.env.VITE_PUBLIC_BUILDER_CDN_BASE_URL;

type NavItem = {
  name: string;
  url: string;
  subItems?: { name: string; url: string }[];
};

export const Footer = () => {
  const [navigation, setNavigation] = useState<NavItem[]>([]);

  useEffect(() => {
    const f = async () => {
      const response = await fetch(
        `${BUILDER_CND_BASE_URL}/footer-navigation?apiKey=${BUILDER_API_KEY}`
      );

      const data = await response.json();
      console.log(data, "foo");
      setNavigation(data.results[0].data.navigation);
    };

    f();
  }, []);

  return (
    <div className={styles.container}>
      <footer>
        <SectionWrapper variant="overflow">
          {!window.location.pathname.includes("contact-us") && (
            <div className={styles.top}>
              <p className={styles.text}>
                Discover how Verity's technology can help your operations fly
                toward excellence
              </p>
              <div className={styles.formContainer}>
                <ContactForm />
              </div>
            </div>
          )}

          <div className={styles.siteNavigationContainer}>
            <a href="/">
              <VerityLogoWhite />
            </a>
            <div className={styles.siteNavigation}>
              {navigation.map((el) => (
                <div key={el.url} className={styles.navigationBlock}>
                  <a className={styles.navigationItemLink} href={el.url}>
                    {el.name}
                  </a>

                  {Boolean(el.subItems?.length) &&
                    el.subItems?.map((subItem) => (
                      <a
                        className={styles.navigationSubItemLink}
                        href={subItem.url}
                      >
                        {subItem.name}
                      </a>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.socials}>
              <a
                target="_blank"
                referrerPolicy="no-referrer"
                href="https://www.linkedin.com/company/verity-ag/?originalSubdomain=ch"
              >
                <LinkedIn />
              </a>
              <a
                target="_blank"
                referrerPolicy="no-referrer"
                href="https://www.youtube.com/@veritydrones"
              >
                <YouTube />
              </a>
            </div>
            © 2024 Verity. All rights reserved.
          </div>
        </SectionWrapper>
      </footer>
    </div>
  );
};

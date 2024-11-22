import VerityLogo from "../../assets/logo_verity_black.svg?react";
import MenuIcon from "@@icons/menu.svg?react";
import Arrow from "@@icons/double_arrow_right.svg?react";

import styles from "./NavBar.module.scss";
import { useEffect, useRef, useState, type ElementRef } from "react";
import { NavItem } from "@@ui/NavBar/components/NavItem";
import clsx from "clsx";
import { Button } from "@@ui/Button/Button";

// paddingLeft + mobileMenuIconWidth + paddingRight + arbitrary value so it's not all done on the edge
const menuOffset = 24 + 8 + 8 + 100;
const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CND_BASE_URL = import.meta.env.VITE_PUBLIC_BUILDER_CDN_BASE_URL;

type NavItem = {
  name: string;
  width: number;
  visible: boolean;
  url: string;
  asButton?: boolean;
  subItems?: { name: string; url: string }[];
};

export const NavBar = () => {
  const navRef = useRef<ElementRef<"nav">>(null);
  const navContainerRef = useRef<ElementRef<"div">>(null);
  const floatingMenuRef = useRef<ElementRef<"div">>(null);

  const [navigation, setNavigation] = useState<NavItem[]>([]);

  const [floatingMenuX, setFloatingMenuX] = useState(0);
  const [floatingMenuVisible, setFloatingMenuVisible] = useState(false);
  const [transitioned, setTransitioned] = useState(false);
  const [currentSubMenu, setCurrentSubMenu] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileSubMenu, setCurrentMobileSubMenu] = useState("");

  useEffect(() => {
    const f = async () => {
      const response = await fetch(
        `${BUILDER_CND_BASE_URL}/header-navigation?apiKey=${BUILDER_API_KEY}`
      );

      const data = await response.json();

      setNavigation(
        data.results[0].data.navigation.map((el: NavItem) => ({
          ...el,
          width: 0,
          visible: true,
        }))
      );
    };

    f();
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 992);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    if (!navigation.length || navigation.some((el) => el.width !== 0)) return;

    const elWidths: number[] = [];

    Array.from(navRef.current.children).forEach((curr) => {
      const w = curr.getBoundingClientRect().width;
      elWidths.push(w);
    }, 0);

    setNavigation((p) => p.map((el, idx) => ({ ...el, width: elWidths[idx] })));
  }, [navigation]);

  useEffect(() => {
    const f = () => {
      const _isMobile = window.innerWidth < 992;

      if (!_isMobile) setMobileMenuOpen(false);
      if (isMobile !== _isMobile) setIsMobile(_isMobile);

      if (!navRef.current) return;
      if (!navContainerRef.current) return;

      const containerWidth =
        navContainerRef.current.getBoundingClientRect().width;
      const logo = navContainerRef.current.firstChild;

      if (!(logo instanceof Element)) return;
      const logoWidth = logo.getBoundingClientRect().width;

      const availableSpace = containerWidth - (logoWidth + menuOffset);

      setNavigation((p) => {
        let spaceOccupied = 0;
        let foundNotFitting = false;

        return p.map((el) => {
          if (spaceOccupied + el.width >= availableSpace || foundNotFitting) {
            foundNotFitting = true;
            return { ...el, visible: false };
          }

          spaceOccupied += el.width;
          return { ...el, visible: true };
        });
      });
    };

    f();

    window.addEventListener("resize", f);

    return () => {
      window.removeEventListener("resize", f);
    };
  }, [isMobile]);

  const moveMenu = (e: React.MouseEvent | React.TransitionEvent) => {
    const target = e.target;
    const container = navContainerRef.current;
    const floatingMenu = floatingMenuRef.current;

    if (!container) return;
    if (!floatingMenu) return;
    if (!(target instanceof Element)) return;

    let left =
      target.getBoundingClientRect().left -
      container.getBoundingClientRect().left;

    const menuWidth = floatingMenu.getBoundingClientRect().width;

    const farRight = left + menuWidth;

    const windowWidth = window.innerWidth;

    if (farRight > windowWidth) {
      left -= farRight - windowWidth;
    }

    setFloatingMenuX(left);
  };

  const handleHover = (e: React.MouseEvent, name: string) => {
    setFloatingMenuVisible(true);
    moveMenu(e);
    setCurrentSubMenu(name);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    moveMenu(e);
    if (e.propertyName === "width") {
      setFloatingMenuVisible(false);
      setTransitioned(true);
    }
  };

  const handleCursorLeaveNav = () => {
    setFloatingMenuVisible(false);
    setTransitioned(false);
    setCurrentSubMenu("");
  };

  const subMenu = navigation
    .find((el) => el.name === currentSubMenu)
    ?.subItems?.map((el) => (
      <a className={styles.link} href={el.url}>
        {el.name}
      </a>
    ));

  return (
    <div className={styles.backgroundSpacer}>
      <div className={styles.container}>
        <div
          ref={navContainerRef}
          className={styles.content}
          onMouseLeave={handleCursorLeaveNav}
        >
          <VerityLogo className={styles.verityLogo} />
          {!isMobile && (
            <nav ref={navRef} className={styles.navigationWrapper}>
              {navigation.map((el) =>
                el.visible ? (
                  <NavItem
                    url={el.url}
                    onHover={handleHover}
                    key={el.name}
                    name={el.name}
                    active={el.name === currentSubMenu}
                    asButton={el.asButton}
                    withSubMenu={Boolean(el.subItems?.length)}
                  >
                    {el.name}
                  </NavItem>
                ) : null
              )}
            </nav>
          )}
          {isMobile && (
            <MenuIcon
              className={styles.mobileMenuIcon}
              role="button"
              tabIndex={0}
              onClick={() => {
                setMobileMenuOpen((p) => !p);
              }}
            />
          )}

          {(floatingMenuVisible || !transitioned) && (
            <div
              ref={floatingMenuRef}
              style={{
                left: floatingMenuX,
                transform:
                  !floatingMenuVisible || !subMenu ? `scale(0)` : `scale(1)`,
              }}
              className={styles.floatingSubMenu}
              onTransitionEnd={handleTransitionEnd}
            >
              {subMenu}
            </div>
          )}
          {mobileMenuOpen && (
            <div className={styles.mobileMenuContainer}>
              <nav className={styles.mobileMenu}>
                {navigation.map((el) =>
                  el.asButton ? (
                    <Button
                      className={styles.mobileMenuButtonItem}
                      asLink
                      href={el.url}
                    >
                      {el.name}
                    </Button>
                  ) : el.subItems?.length ? (
                    <div
                      className={styles.mobileMenuItem}
                      role="button"
                      tabIndex={0}
                      key={el.name}
                      onClick={() => {
                        setCurrentMobileSubMenu((p) =>
                          p === el.name ? "" : el.name
                        );
                      }}
                    >
                      <div className={styles.mobileMenuSection}>
                        {el.name}
                        <Arrow
                          className={clsx({
                            [styles.active]: el.name === currentMobileSubMenu,
                          })}
                        />
                      </div>
                      {currentMobileSubMenu === el.name && (
                        <div className={styles.mobileSubMenu}>
                          {el.subItems.map((subItem) => (
                            <div
                              key={subItem.name}
                              className={styles.mobileSubMenuItem}
                            >
                              {subItem.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a className={styles.mobileMenuItem} href={el.url}>
                      {el.name}
                    </a>
                  )
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

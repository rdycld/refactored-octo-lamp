import VerityLogo from "../../assets/logo_verity_black.svg?react";
import MenuIcon from "@@icons/menu.svg?react";

import styles from "./NavBar.module.scss";
import { useLayoutEffect, useRef, useState, type ElementRef } from "react";
import { NavItem } from "@@ui/NavBar/components/NavItem";

const items = [
  "solution",
  "client success",
  "industires",
  "resources",
  "contact us",
];

// paddingLeft + mobileMenuIconWidth + paddingRight + arbitrary value so it's not all done on the edge
const menuOffset = 24 + 8 + 8 + 100;

export const NavBar = () => {
  const navRef = useRef<ElementRef<"nav">>(null);
  const navContainerRef = useRef<ElementRef<"div">>(null);
  const floatingMenuRef = useRef<ElementRef<"div">>(null);

  const [navigation, setNavigation] = useState(
    items.map((el) => ({ name: el, visible: true, width: 0 }))
  );

  const [floatingMenuX, setFloatingMenuX] = useState(0);
  const [floatingMenuVisible, setFloatingMenuVisible] = useState(false);
  const [transitioned, setTransitioned] = useState(false);

  useLayoutEffect(() => {
    if (!navRef.current) return;
    const elWidths: number[] = [];

    Array.from(navRef.current.children).forEach((curr) => {
      const w = curr.getBoundingClientRect().width;
      elWidths.push(w);
    }, 0);

    setNavigation((p) => p.map((el, idx) => ({ ...el, width: elWidths[idx] })));
  }, []);

  useLayoutEffect(() => {
    const f = () => {
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
  }, []);

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
      left -= farRight - windowWidth + 50;
    }

    setFloatingMenuX(left);
  };

  const handleHover = (e: React.MouseEvent) => {
    setFloatingMenuVisible(true);

    moveMenu(e);
  };

  return (
    <div className={styles.backgroundSpacer}>
      <div className={styles.container}>
        <div
          ref={navContainerRef}
          className={styles.content}
          onMouseLeave={() => {
            setFloatingMenuVisible(false);
            setTransitioned(false);
          }}
        >
          <VerityLogo className={styles.verityLogo} />
          <nav ref={navRef} className={styles.navigationWrapper}>
            {navigation.map((el) =>
              el.visible ? (
                <NavItem onHover={handleHover} key={el.name}>
                  {el.name}
                </NavItem>
              ) : null
            )}
          </nav>
          <MenuIcon
            className={styles.mobileMenuIcon}
            role="button"
            tabIndex={0}
          />

          {(floatingMenuVisible || !transitioned) && (
            <div
              ref={floatingMenuRef}
              style={{
                left: floatingMenuX,
                transform: floatingMenuVisible ? `scale(1)` : `scale(0)`,
                // width: floatingMenuVisible ? "200px" : 1,
                // height: floatingMenuVisible ? "200px" : 1,
              }}
              className={styles.floatingSubMenu}
              onTransitionEnd={(e) => {
                moveMenu(e);
                if (e.propertyName === "width") {
                  setFloatingMenuVisible(false);
                  setTransitioned(true);
                }
              }}
            >
              sub menu
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

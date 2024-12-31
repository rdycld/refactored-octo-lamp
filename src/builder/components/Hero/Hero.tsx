import { useEffect, useRef, useState, type ElementRef } from "react";
import Play from "@@icons/play.svg?react";

import styles from "./Hero.module.scss";
import clsx from "clsx";
import { Button } from "@@ui/Button/Button";

type HeroProps = {
  children: React.ReactNode;
  headline: string;
  text: string;
  cta: string;
  ctaUrl: string;
  align?: "left" | "center";
};

export const Hero = ({
  children,
  headline,
  text,
  cta,
  ctaUrl,
  align = "left",
}: HeroProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [paused, setPaused] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const videos =
        containerRef.current.getElementsByClassName("builder-video");
      if (videos[0] && videos[0] instanceof HTMLVideoElement) {
        videoRef.current = videos[0];
      }
    }
  }, [containerRef]);

  const handleClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  return (
    <div className={clsx(styles.container, styles.hero)} ref={containerRef}>
      {children}
      <div className={styles.backdrop}>
        <div
          className={clsx(styles.content, {
            [styles.contentCenter]: align === "center",
          })}
        >
          <div className={styles.textWrapper}>
            {headline && (
              <div
                className={clsx(
                  "label-desktop caption14-mobile",
                  styles.headline
                )}
              >
                {headline}
              </div>
            )}
            {text && (
              <div className={clsx("h1-desktop h2-mobile", styles.text)}>
                {text}
              </div>
            )}
          </div>
          <div
            className={clsx(styles.buttonsWrapper, {
              [styles.buttonsCenter]: align === "center",
            })}
          >
            {cta && ctaUrl && (
              <Button asLink href={ctaUrl}>
                {cta}
              </Button>
            )}
          </div>
          {!paused ? (
            <div
              role="button"
              tabIndex={0}
              onClick={handleClick}
              className={clsx(styles.button)}
            >
              <div role="presentation" className={styles.pause}></div>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={handleClick}
              className={clsx(styles.playButton)}
            >
              <Play />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

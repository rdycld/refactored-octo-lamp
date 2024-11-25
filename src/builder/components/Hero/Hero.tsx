import { useRef, useState, type ElementRef } from "react";

import styles from "./Hero.module.scss";
import clsx from "clsx";
import { Button } from "@@ui/Button/Button";

type HeroProps = {
  children: React.ReactNode;
  headline: string;
  text: string;
  cta: string;
  ctaUrl: string;
};

export const Hero = ({ children, headline, text, cta, ctaUrl }: HeroProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [paused, setPaused] = useState(true);

  let video: HTMLVideoElement | undefined = undefined;

  const handleClick = () => {
    if (!video) return;

    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  if (containerRef.current) {
    const videos = containerRef.current.getElementsByClassName("builder-video");
    if (videos[0] && videos[0] instanceof HTMLVideoElement) {
      video = videos[0];
    }
  }

  return (
    <div className={clsx(styles.container, styles.hero)} ref={containerRef}>
      {children}
      {video && (
        <div className={styles.backdrop}>
          <div className={styles.content}>
            <div className={styles.textWrapper}>
              {headline && <div className={styles.headline}>{headline}</div>}
              {text && <div className={styles.text}>{text}</div>}
            </div>
            <div className={styles.buttonsWrapper}>
              {cta && ctaUrl && (
                <Button asLink href={ctaUrl}>
                  {cta}
                </Button>
              )}
              <div
                className={styles.playButton}
                role="button"
                tabIndex={0}
                onClick={handleClick}
              >
                watch video
              </div>
            </div>
            {!paused && (
              <div
                role="button"
                tabIndex={0}
                onClick={handleClick}
                className={clsx(styles.button)}
              >
                <div role="presentation" className={styles.pause}></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

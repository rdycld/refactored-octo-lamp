import { useEffect, useRef, useState, type ElementRef } from "react";
import Play from "@@icons/play.svg?react";

import styles from "./VideoWrapper.module.scss";
import clsx from "clsx";

type VideoWrapperProps = {
  children: React.ReactNode;
  variant?: "hero" | "default";
};

const humanizeTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - 60 * minutes);

  return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
};

export const VideoWrapper = ({
  children,
  variant = "default",
}: VideoWrapperProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

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

  useEffect(() => {
    if (paused || !videoRef.current) return;

    const timerId = setInterval(() => {
      if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [paused, videoRef]);

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
    <div className={styles.container} ref={containerRef}>
      {children}

      {variant === "default" && (
        <div className={styles.control}>
          <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            className={styles.button}
          >
            {paused ? <Play className={styles.play} /> : "xx"}
          </div>

          <p className={styles.time}>
            {humanizeTime(
              paused && videoRef.current
                ? videoRef.current.duration
                : currentTime
            )}
          </p>
        </div>
      )}
      {variant === "hero" && (
        <>
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
        </>
      )}
    </div>
  );
};

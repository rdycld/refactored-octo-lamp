import { useEffect, useRef, useState, type ElementRef } from "react";
import Play from "@@icons/play.svg?react";

import styles from "./VideoWrapper.module.scss";

type VideoWrapperProps = {
  children: React.ReactNode;
};

const humanizeTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - 60 * minutes);

  return `${minutes} : ${seconds.toString().padStart(2, "0")}`;
};

export const VideoWrapper = ({ children }: VideoWrapperProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  let video: HTMLVideoElement | undefined = undefined;

  if (containerRef.current) {
    const videos = containerRef.current.getElementsByClassName("builder-video");
    if (videos[0] && videos[0] instanceof HTMLVideoElement) {
      video = videos[0];
    }
  }

  useEffect(() => {
    if (paused || !video) return;

    const timerId = setInterval(() => {
      setCurrentTime(video.currentTime);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

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

  return (
    <div className={styles.container} ref={containerRef}>
      {children}
      {video && (
        <div className={styles.control}>
          <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            className={styles.button}
          >
            {paused ? <Play /> : "xx"}
          </div>

          <p className={styles.time}>
            {humanizeTime(paused ? video.duration : currentTime)}
          </p>
        </div>
      )}
    </div>
  );
};

import { useRef, useState, type ElementRef } from "react";

import styles from "./VideoControl.module.scss";
import clsx from "clsx";

type VideoControlProps = {
  children: React.ReactNode;
};
export const VideoControl = ({ children }: VideoControlProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [paused, setPaused] = useState(false);

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
    <div style={{ position: "relative" }} ref={containerRef}>
      {children}
      {video && (
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          className={clsx(styles.button, {
            [styles.paused]: paused,
          })}
        ></div>
      )}
    </div>
  );
};

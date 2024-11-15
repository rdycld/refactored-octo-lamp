import { useRef, useState, type ElementRef } from "react";

import styles from "./VideoControl.module.scss";

type VideoControlProps = {
  children: React.ReactNode;
};
export const VideoControl = ({ children }: VideoControlProps) => {
  const containerRef = useRef<ElementRef<"div">>(null);
  const [videoNode, setVideoNode] = useState<HTMLVideoElement>();

  if (containerRef.current) {
    const videos = containerRef.current.getElementsByClassName("builder-video");
    const video = videos[0];
    if (!videoNode && video && video instanceof HTMLVideoElement) {
      setVideoNode(video);
    }
  }

  const handleClick = () => {
    if (!videoNode) return;

    if (videoNode.paused) {
      videoNode.play();
    } else {
      videoNode.pause();
    }
  };

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      {children}
      {videoNode && (
        <button onClick={handleClick} className={styles.button}>
          xxxx
        </button>
      )}
    </div>
  );
};

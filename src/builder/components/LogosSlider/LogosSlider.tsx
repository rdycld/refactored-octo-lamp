import styles from "./LogosSlider.module.scss";

type LogosSliderProps = {
  images: { image: string }[];
};

export const LogosSlider = ({ images }: LogosSliderProps) => {
  return (
    <div className={styles.container}>
      {images.map(({ image }) => (
        <img className={styles.slide} src={image} />
      ))}
    </div>
  );
};

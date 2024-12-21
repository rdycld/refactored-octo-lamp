import { useState } from "react";
import styles from "./Testimonials.module.scss";
import { Button } from "@@ui/Button/Button";
import clsx from "clsx";

type Props = {
  testimonials: {
    logo: string;
    logoSelected: string;
    text: string;
    ctaUrl: string;
    stats: { value: string; description: string }[];
    authorName: string;
    authorPosition: string;
    authorPhoto: string;
  }[];
};

export const Testimonials = ({ testimonials }: Props) => {
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(
    Math.floor(Math.random() * testimonials.length)
  );

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            onClick={() => {
              setCurrentTestimonialIdx(idx);
            }}
          >
            <img
              role="button"
              className={clsx(styles.image, {
                [styles.imageActive]: idx === currentTestimonialIdx,
              })}
              src={
                idx === currentTestimonialIdx
                  ? testimonial.logoSelected ?? testimonial.logo
                  : testimonial.logo
              }
            />
          </div>
        ))}
      </div>
      <div className={styles.testimonials}>
        <div
          className={styles.testimonialContainer}
          style={{
            transform: `translateX(-${100 * currentTestimonialIdx}%)`,
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <div
              aria-hidden={idx === currentTestimonialIdx ? "false" : "true"}
              className={styles.testimonial}
              key={idx}
            >
              <div className={styles.stats}>
                {testimonial.stats.map((stat) => (
                  <div key={stat.description} className={styles.stat}>
                    <p
                      className={clsx("h4-desktop h4-mobile", styles.statValue)}
                    >
                      {stat.value}
                    </p>
                    <p
                      className={clsx(
                        "caption14-desktop caption14-mobile",
                        styles.statDescription
                      )}
                    >
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className={clsx("h4-desktop h4-mobile", styles.text)}>
                {testimonial.text}
              </p>
              <div className={styles.bottom}>
                <div className={styles.author}>
                  <img
                    className={styles.authorPhoto}
                    src={testimonial.authorPhoto}
                    alt=""
                  ></img>
                  <div className={styles.authorInfo}>
                    <p
                      className={clsx(
                        "h5-desktop h6-mobile",
                        styles.authorName
                      )}
                    >
                      {testimonial.authorName}
                    </p>
                    <p
                      className={clsx(
                        "body5-desktop body5-mobile",
                        styles.authorTitle
                      )}
                    >
                      {testimonial.authorPosition}
                    </p>
                  </div>
                </div>
                <Button asLink href={testimonial.ctaUrl} variant="hollow">
                  read full story
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

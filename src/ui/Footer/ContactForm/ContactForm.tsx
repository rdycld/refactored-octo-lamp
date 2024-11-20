import { Button } from "@@ui/Button/Button";
import styles from "./ContactForm.module.scss";

export const ContactForm = () => {
  return (
    <form className={styles.form}>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="firstName">
          first name
          <input className={styles.input} id="firstName" type="text" />
        </label>
        <label className={styles.label} htmlFor="lastName">
          last name
          <input className={styles.input} id="lastName" type="text" />
        </label>
      </div>
      <label className={styles.label} htmlFor="businessEmail">
        business email
        <input className={styles.input} type="email" id="businessEmail" />
      </label>
      <label className={styles.label} htmlFor="company">
        company
        <input className={styles.input} id="company" type="text" />
      </label>
      <label className={styles.label} htmlFor="message">
        message
        <textarea className={styles.textarea} id="message"></textarea>
      </label>
      <label className={styles.label} htmlFor="howDidYouKnow">
        how did you know about us?
        <select id="howDidYouKnow" className={styles.select} defaultValue={""}>
          <option value={""} disabled>
            select
          </option>
          <option>a</option>
          <option>b</option>
          <option>c</option>
        </select>
      </label>
      <div className={styles.bottom}>
        <p>
          By submitting this I confirm that read and understand{" "}
          <a href="/">Privacy Policy.</a>
        </p>
        <Button onClick={() => {}}>send message</Button>
      </div>
    </form>
  );
};

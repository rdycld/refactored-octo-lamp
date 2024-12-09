import { Button } from "@@ui/Button/Button";
import styles from "./ContactForm.module.scss";
import { useForm } from "react-hook-form";
import clsx from "clsx";

type FormValues = {
  firstName: string;
  lastName: string;
  businessEmail: string;
  company: string;
  message: string;
  howDidYouKnow: string;
};

const HelperText = ({ visible }: { visible: boolean }) =>
  visible ? (
    <p className={styles.helperText}> Please fill out the field.</p>
  ) : (
    <p className={styles.helperText}>&nbsp;</p>
  );

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((e) => {
        console.log("todo", e);
      })}
    >
      <div className={styles.wrapper}>
        <label
          className={clsx(styles.label, {
            [styles.labelError]: Boolean(errors.firstName),
          })}
          htmlFor="firstName"
        >
          first name
          <input
            className={clsx(styles.input, {
              [styles.inputError]: Boolean(errors.firstName),
            })}
            {...register("firstName", { required: true })}
            id="firstName"
            type="text"
          />
          <HelperText visible={Boolean(errors.firstName)} />
        </label>
        <label
          className={clsx(styles.label, {
            [styles.labelError]: Boolean(errors.lastName),
          })}
          htmlFor="lastName"
        >
          last name
          <input
            className={clsx(styles.input, {
              [styles.inputError]: Boolean(errors.lastName),
            })}
            {...register("lastName", { required: true })}
            id="lastName"
            type="text"
          />
          <HelperText visible={Boolean(errors.lastName)} />
        </label>
      </div>
      <label
        className={clsx(styles.label, {
          [styles.labelError]: Boolean(errors.businessEmail),
        })}
        htmlFor="businessEmail"
      >
        business email
        <input
          className={clsx(styles.input, {
            [styles.inputError]: Boolean(errors.businessEmail),
          })}
          {...register("businessEmail", { required: true })}
          type="email"
          id="businessEmail"
        />
        <HelperText visible={Boolean(errors.businessEmail)} />
      </label>
      <label
        className={clsx(styles.label, {
          [styles.labelError]: Boolean(errors.company),
        })}
        htmlFor="company"
      >
        company
        <input
          className={clsx(styles.input, {
            [styles.inputError]: Boolean(errors.company),
          })}
          {...register("company")}
          id="company"
          type="text"
        />
        <HelperText visible={Boolean(errors.company)} />
      </label>
      <label
        className={clsx(styles.label, {
          [styles.labelError]: Boolean(errors.message),
        })}
        htmlFor="message"
      >
        message
        <textarea
          className={clsx(styles.textarea, {
            [styles.inputError]: Boolean(errors.message),
          })}
          {...register("message", { required: true })}
          id="message"
        ></textarea>
        <HelperText visible={Boolean(errors.message)} />
      </label>
      <label className={styles.label} htmlFor="howDidYouKnow">
        how did you know about us?
        <select
          id="howDidYouKnow"
          {...register("howDidYouKnow")}
          className={styles.select}
          defaultValue={""}
        >
          <option value={""} disabled>
            select
          </option>
          <option>a</option>
          <option>b</option>
          <option>c</option>
        </select>
      </label>
      <div className={styles.bottom}>
        <p
          className={clsx(
            "body5-desktop body5-mobile",
            styles.privacyPolicyLink
          )}
        >
          By submitting this I confirm that read and understand{" "}
          <a href="/">Privacy Policy.</a>
        </p>
        <Button onClick={() => {}}>send message</Button>
      </div>
    </form>
  );
};

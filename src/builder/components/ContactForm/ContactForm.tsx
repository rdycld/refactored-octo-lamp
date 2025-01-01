import { Button } from "@@ui/Button/Button";
import styles from "./ContactForm.module.scss";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

type FormValues = {
  firstName: string;
  lastName: string;
  businessEmail: string;
  company: string;
  message: string;
  howDidYouKnow: string;
};

const service_id = import.meta.env.VITE_PUBLIC_EMAIL_SERVICE;
const email_template_id = import.meta.env.VITE_BUBLIC_EMAIL_TEMPLATE;
const email_public_key = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY;

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
    reset,
  } = useForm<FormValues>();

  const sendEmail = async (data: FormValues) => {
    emailjs
      .send(service_id, email_template_id, data, {
        publicKey: email_public_key,
      })
      .then(
        () => {
          toast.success(
            <p className="label-desktop label-mobile">Mail succesfully sent</p>
          );
          reset();
        },
        () => {
          toast.error(
            <p className="label-desktop label-mobile">Something went wrong</p>
          );
        }
      );
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((e) => {
        sendEmail(e);
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
            autoComplete="off"
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
            autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
          id="howDidYouKnow"
          {...register("howDidYouKnow")}
          className={styles.select}
          defaultValue={""}
        >
          <option value={""} disabled>
            Select
          </option>
          <option value={"Trade show / events"}>Trade show / events</option>
          <option value={"Peer referral / word of mouth"}>
            Peer referral / word of mouth
          </option>
          <option value={"Advertising"}>Advertising</option>
          <option value={"Social media / Youtube"}>
            Social media / Youtube
          </option>
          <option value={"Search / Google"}>Search / Google</option>
          <option value={"Other"}>Other</option>
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

import { useEffect, useMemo, useState } from "react";

import PhoneIcon from "@@icons/call.svg?react";
import MailIcon from "@@icons/mail.svg?react";

import styles from "./ContactTiles.module.scss";

const US_CONTACT = { phoneNumber: "+1 (347) 960-4198" };
const CH_CONTACT = { phoneNumber: "+41 44 533 83 60" };

export const ContactTiles = () => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates>();

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      setGeolocation(coords);
    });
  }, []);

  const contact = useMemo(() => {
    if (!geolocation) return [CH_CONTACT, US_CONTACT];

    const { longitude } = geolocation;

    if (longitude < -37 || longitude > 143) return [US_CONTACT];

    return [CH_CONTACT];
  }, [geolocation]);

  return (
    <div className={styles.container}>
      <div className={styles.tile}>
        <p className="h5-desktop h5-mobile">Currently a customer?</p>
        {contact.map(({ phoneNumber }) => (
          <div className={styles.phoneNumber}>
            <PhoneIcon />
            <div>call us {phoneNumber}</div>
          </div>
        ))}
      </div>
      <div className={styles.tile}>
        <p className="h5-desktop h5-mobile">Press and media</p>
        <div className={styles.phoneNumber}>
          <MailIcon />
          <div>info@verity.net</div>
        </div>
      </div>
    </div>
  );
};

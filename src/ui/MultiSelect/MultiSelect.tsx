import { useEffect, useRef, useState, type ElementRef } from "react";
import CloseIcon from "@@icons/close.svg?react";

import styles from "./MultiSelect.module.scss";

type MultiSelectProps = {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

const getLabelFromValue = (
  value: string,
  options: { label: string; value: string }[]
) => options.find((el) => el.value === value)?.label ?? "";

export const MultiSelect = ({ options, onChange }: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  useEffect(() => {
    const f = (e: MouseEvent) => {
      if (!selectRef.current) return;
      if (e.target instanceof Node && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", f, true);

    return () => {
      window.removeEventListener("click", f, true);
    };
  }, [selectRef]);

  const handleClearAll = () => {
    setValue("");
  };

  const handleChangeOption = (value: string) => {
    setValue((prev) => {
      const asArr = prev.split(",");

      if (asArr.includes(value))
        return asArr.filter((el) => el !== value).join(",");

      if (prev.length) return `${prev},${value}`;
      else return value;
    });
  };

  return (
    <div
      ref={selectRef}
      className={styles.container}
      role="button"
      tabIndex={0}
      onClick={() => setOpen(true)}
    >
      <div className={styles.chips}>
        {value.length > 0 ? (
          <>
            {value
              .split(",")
              .slice(0, 2)
              .map((v) => (
                <div className={styles.chip} key={v}>
                  {getLabelFromValue(v, options)}
                  <CloseIcon
                    onClick={() => handleChangeOption(v)}
                    className={styles.iconButton}
                  />
                </div>
              ))}

            {value.split(",").length > 2 && (
              <div className={styles.chip}>
                +{value.split(",").length - 2}
                <CloseIcon
                  onClick={() =>
                    handleChangeOption(value.split(",").slice(-1)[0])
                  }
                  className={styles.iconButton}
                />
              </div>
            )}
          </>
        ) : (
          <div>Select</div>
        )}
      </div>
      {open && (
        <div className={styles.floatingMenu}>
          <div
            className={styles.top}
            role="button"
            tabIndex={0}
            onClick={handleClearAll}
          >
            <CloseIcon />
            CLEAR ALL
          </div>
          <div className={styles.options}>
            {options.map(({ label, value: v }) => (
              <div
                className={styles.option}
                key={v}
                onClick={() => handleChangeOption(v)}
              >
                <input
                  type="checkbox"
                  onSelect={() => handleChangeOption(v)}
                  checked={value.split(",").includes(v)}
                />
                {label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

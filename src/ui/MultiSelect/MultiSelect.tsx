import { useEffect, useRef, useState, type ElementRef } from "react";
import CloseIcon from "@@icons/close.svg?react";
import ArrowIcon from "@@icons/arrow_down_black.svg?react";

import styles from "./MultiSelect.module.scss";
import clsx from "clsx";

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
      <ArrowIcon
        className={clsx(styles.chevron, {
          [styles.chevronActive]: open,
        })}
      />
      <div className={styles.chips}>
        {value.length > 0 ? (
          <>
            {value
              .split(",")
              .slice(0, 2)
              .map((v) => (
                <div
                  className={styles.chip}
                  style={{
                    maxWidth: `${
                      Math.max(100 / value.split(",").length, 33) - 3
                    }%`,
                  }}
                  key={v}
                >
                  <p title={getLabelFromValue(v, options)}>
                    {getLabelFromValue(v, options)}
                  </p>
                  <CloseIcon
                    onClick={() => handleChangeOption(v)}
                    className={styles.iconButton}
                  />
                </div>
              ))}

            {value.split(",").length > 2 && (
              <div
                title={value
                  .split(",")
                  .slice(2)
                  .map((el) => getLabelFromValue(el, options))
                  .join(", ")}
                className={styles.chip}
              >
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
          "Select"
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

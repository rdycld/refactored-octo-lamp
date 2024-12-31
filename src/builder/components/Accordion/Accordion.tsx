import styles from "./Accordion.module.scss";
import clsx from "clsx";

import {
  Blocks,
  BuilderBlock,
  RegisteredComponent,
} from "@builder.io/sdk-react";
import * as OrigAccordion from "@radix-ui/react-accordion";
import React, { useState } from "react";
type Tab = {
  tabName: string;
  children: BuilderBlock[];
};
interface AccordionProps {
  tabList: Tab[];
  builderBlock: BuilderBlock;
}

const Accordion = ({ tabList, builderBlock }: AccordionProps) => {
  const [value, setValue] = useState(tabList[0].tabName);

  if (tabList.length === 0) return null;

  return (
    <OrigAccordion.Root
      className={styles.Root}
      type="single"
      defaultValue={value}
      value={value}
      collapsible
    >
      {Boolean(tabList.length) &&
        tabList.map((tab, index) => (
          <OrigAccordion.Item
            onClick={() => {
              setValue(tab.tabName);
            }}
            key={tab.tabName}
            value={tab.tabName}
            className={styles.Item}
          >
            <AccordionTrigger>
              {tab.tabName} <div className={styles.Chevron}></div>
            </AccordionTrigger>
            <AccordionContent>
              <Blocks
                parent={builderBlock?.id}
                path={`component.options.tabList.${index}.children`}
                blocks={tab.children}
              />
            </AccordionContent>
          </OrigAccordion.Item>
        ))}
    </OrigAccordion.Root>
  );
};

export const AccordionTrigger = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ children, className, ...props }: any, forwardedRef) => (
    <OrigAccordion.Header className={styles.Header}>
      <OrigAccordion.Trigger
        className={clsx(styles.Trigger, className, "h4-desktop h4-mobile")}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </OrigAccordion.Trigger>
    </OrigAccordion.Header>
  )
);

export const AccordionContent = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ children, className, ...props }: any, forwardedRef) => (
    <OrigAccordion.Content
      className={clsx(styles.Content, className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </OrigAccordion.Content>
  )
);

export const customAccordionInfo: RegisteredComponent = {
  component: Accordion,
  name: "Accordion",
  shouldReceiveBuilderProps: {
    /** Set this to pass the `builderBlock` prop down to the component */
    builderBlock: true,
  },
  inputs: [
    {
      name: "tabList",
      type: "list",

      subFields: [
        {
          name: "tabName",
          type: "string",
        },
        {
          name: "children",
          type: "uiBlocks",
          defaultValue: [
            {
              "@type": "@builder.io/sdk:Element",
              component: {
                name: "Core:Section",
              },
              responsiveStyles: {
                large: {},
                small: {},
              },
            },
          ],
        },
      ],
    },
  ],
};

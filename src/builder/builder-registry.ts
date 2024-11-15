import Counter from "@@builderComponents/Counter/Counter";
import { SectionHeader } from "@@builderComponents/SectionHeader/SectionHeader";
import { Button } from "@@ui/Button/Button";
import type { RegisteredComponent } from "@builder.io/sdk-react";
import { withChildren } from "@builder.io/react";
import { SectionWrapper } from "@@builder/components/SectionWrapper/SectionWrapper";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Counter,
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
        friendlyName: "initialCount11",
      },
    ],
  },
  {
    component: Button,
    name: "Button",
    inputs: [
      {
        name: "text",
        type: "string",
        friendlyName: "text",
      },
      {
        name: "size",
        type: "string",
        friendlyName: "size",
        enum: ["small", "normal"],
        defaultValue: "normal",
      },
      {
        name: "variant",
        type: "string",
        friendlyName: "Variant",
        enum: ["full", "hollow", "hollowDark"],
        defaultValue: "full",
      },
      {
        name: "asLink",
        type: "boolean",
        defaultValue: true,
      },
      {
        showIf: 'options.get("asLink")',
        name: "href",
        type: "string",
        friendlyName: "Link to",
      },
      {
        name: "withCounter",
        type: "boolean",
        defaultValue: false,
      },
      {
        showIf: 'options.get("withCounter")',
        name: "count",
        type: "string",
        friendlyName: "Count",
      },
    ],
  },
  {
    component: withChildren(SectionHeader),
    name: "Section Header",
    inputs: [
      {
        name: "variant",
        type: "string",
        enum: ["overflow", "normal"],
        defaultValue: "normal",
      },
      {
        name: "withCta",
        type: "boolean",
        defaultValue: "false",
        friendlyName: "With Cta",
      },
      {
        showIf: 'options.get("withCta")',
        name: "to",
        type: "string",
      },
      {
        showIf: 'options.get("withCta")',
        name: "cta",
        type: "string",
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "I am child text block!" },
        },
        responsiveStyles: {
          large: {
            fontFamily: "Roboto Mono, monospace",
            fontSize: "14px",
            fontWeight: "700",
            color: "var(--ver-purple-50)",
          },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "I am child text block!" },
        },
        responsiveStyles: {
          large: {
            fontSize: "42px",
            lineHeight: "52px",
            fontFamily: "Roboto, sans-serif",
          },
        },
      },
    ],
  },
  {
    component: withChildren(SectionWrapper),
    name: "Section Wrapper",
    inputs: [
      {
        name: "variant",
        type: "string",
        enum: ["full", "overflow", "normal"],
        defaultValue: "normal",
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Core:Section",
          options: {
            maxWidth: "100%",
          },
        },
      },
    ],
  },
];

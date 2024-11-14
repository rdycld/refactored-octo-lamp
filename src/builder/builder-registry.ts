import Counter from "@@builderComponents/Counter/Counter";
import { Button } from "@@ui/Button/Button";
import type { RegisteredComponent } from "@builder.io/sdk-react";

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
];

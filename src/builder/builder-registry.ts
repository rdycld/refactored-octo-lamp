import Counter from "@@builderComponents/Counter/Counter";
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
];

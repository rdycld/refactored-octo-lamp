import { SectionHeader } from "@@builderComponents/SectionHeader/SectionHeader";
import { SectionWrapper } from "@@builderComponents/SectionWrapper/SectionWrapper";
import { Button } from "@@ui/Button/Button";
import type { RegisteredComponent } from "@builder.io/sdk-react";
import { withChildren } from "@builder.io/react";
import { TileWithIcon } from "@@builder/components/TileWithIcon/TileWithIcon";
import { LogoTile } from "@@builder/components/LogoTile/LogoTile";
import { Hero } from "@@builder/components/Hero/Hero";
import { BlogTeaser } from "@@ui/BlogTeaser/BlogTeaser";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: BlogTeaser,
    name: "Blog teaser",
    inputs: [
      {
        name: "maxTiles",
        type: "number",
        friendlyName: "How many posts",
        defaultValue: 3,
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
  {
    component: withChildren(TileWithIcon),
    name: "TileWithIcon",
    defaultStyles: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      flexShrink: "0",
      boxSizing: "border-box",
      marginTop: "0px",
      backgroundColor: "var(--ver-gray-10)",
      height: "100%",
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Image",
          options: {
            image:
              "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a",
          },
        },
        responsiveStyles: {
          large: {
            position: "relative",
            marginBottom: "100px",
            maxWidth: "128px",
          },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: {
            text: "I am child text block!",
          },
        },
        responsiveStyles: {
          large: {
            fontFamily: "Roboto, sans-serif",
            color: "var(--ver-gray-96)",
            fontSize: "58px",
            marginBottom: "16px",
          },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: {
            text: "I am child text block!",
          },
        },
        responsiveStyles: {
          large: {
            fontFamily: "Roboto Mono, monospace",
            color: "var(--ver-gray-60)",
          },
        },
      },
    ],
  },
  {
    component: withChildren(LogoTile),
    name: "Logo Tile",
    defaultStyles: {
      padding: "24px",
      backgroundColor: "var(--ver-gray-6)",
      margin: "0px",
      height: "100%",
    },
    inputs: [
      {
        name: "description",
        type: "string",
        defaultValue: "name - location",
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Image",
          options: {
            image:
              "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a",
            backgroundSize: "contain",
            backgroundPosition: "center",
          },
        },
        responsiveStyles: {
          large: {
            position: "relative",
            width: "100%",
            marginTop: "auto",
            marginBottom: "auto",
          },
        },
      },
    ],
  },
  {
    component: withChildren(Hero),
    name: "Hero",
    inputs: [
      {
        type: "text",
        name: "headline",
      },
      {
        type: "text",
        name: "text",
      },
      {
        type: "text",
        name: "ctaUrl",
      },
      {
        type: "text",
        name: "cta",
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Video",
          options: { loop: "true", fit: "cover" },
        },
        responsiveStyles: {
          large: {
            height: "100vh",
          },
        },
      },
    ],
  },
];

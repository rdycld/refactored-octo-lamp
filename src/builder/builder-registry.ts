import { SectionHeader } from "@@builderComponents/SectionHeader/SectionHeader";
import { SectionWrapper } from "@@builderComponents/SectionWrapper/SectionWrapper";
import { Button } from "@@ui/Button/Button";
import type { RegisteredComponent } from "@builder.io/sdk-react";
import { withChildren } from "@builder.io/react";
import { TileWithIcon } from "@@builder/components/TileWithIcon/TileWithIcon";
import { LogoTile } from "@@builder/components/LogoTile/LogoTile";
import { Hero } from "@@builder/components/Hero/Hero";
import { BlogTeaser } from "@@ui/BlogTeaser/BlogTeaser";
import { customAccordionInfo } from "@@builder/components/Accordion/Accordion";
import { Testimonials } from "@@builder/components/Testimonials/Testimonials";
import { Tabs } from "@@builder/components/Tabs/Tabs";
import { VideoWrapper } from "@@builder/components/VideoWrapper/VideoWrapper";
import { Resources } from "@@builder/components/Resources/Resources";
import { LogosSlider } from "@@builder/components/LogosSlider/LogosSlider";
import { Careers } from "@@builder/components/Careers/Careers";
import { HiringProcess } from "@@builder/components/HiringProcess/HiringProcess";
import { ContactForm } from "@@builder/components/ContactForm/ContactForm";
import { ContactTiles } from "@@builder/components/ContactTiles/ContactTiles";
import { LegalNoticeTable } from "@@builder/components/LegalNoticeTable/LegalNoticeTable";
import { LatestResources } from "@@builder/components/Resources/LatestResources";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  customAccordionInfo,
  { component: ContactForm, name: "Contact form" },
  { component: LatestResources, name: "Latest Resources" },
  { component: ContactTiles, name: "Contact tiles" },
  { component: HiringProcess, name: "Hiring Process" },
  { component: LegalNoticeTable, name: "Patent Table" },
  {
    component: Careers,
    name: "Open Positions",
    inputs: [
      { name: "title", friendlyName: "category", type: "text" },
      {
        name: "jobs",
        friendlyName: "Positions",
        type: "list",
        subFields: [
          {
            name: "name",
            friendlyName: "Title",
            type: "text",
          },
          {
            name: "location",
            friendlyName: "Job Location",
            type: "text",
          },
          {
            name: "fte",
            friendlyName: "FTE",
            type: "text",
          },
          {
            name: "url",
            friendlyName: "URL to apply",
            type: "text",
          },
        ],
      },
    ],
  },
  {
    component: LogosSlider,
    name: "Logos Slider",
    inputs: [
      {
        name: "images",
        friendlyName: "Photos",
        type: "list",
        subFields: [
          {
            name: "image",
            friendlyName: "Image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          },
        ],
      },
    ],
  },
  {
    component: Resources,
    name: "Resources",
  },
  {
    component: Tabs,
    name: "Image Tabs",
    inputs: [
      {
        name: "text",
        type: "string",
      },
      {
        name: "tabs",
        type: "list",
        subFields: [
          {
            name: "image",
            friendlyName: " Image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
            required: true,
          },
          {
            name: "title",
            type: "string",
            required: true,
          },
        ],
      },
    ],
  },
  {
    component: Testimonials,
    name: "Testimonials",
    inputs: [
      {
        name: "testimonials",
        type: "list",
        defaultValue: [],
        subFields: [
          {
            name: "logo",
            friendlyName: "Logo Image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
            required: true,
          },
          {
            name: "logoSelected",
            friendlyName: "Logo Image when selected",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          },
          {
            friendlyName: "Testimonial text",
            name: "text",
            type: "string",
            required: true,
          },
          {
            friendlyName: "Stats",
            name: "stats",
            type: "list",
            defaultValue: [],
            subFields: [
              {
                name: "value",
                type: "string",
              },
              {
                name: "description",
                type: "string",
              },
            ],
          },
          {
            friendlyName: "Url to full story",
            name: "ctaUrl",
            type: "string",
            required: true,
          },
          {
            friendlyName: "Authors name",
            name: "authorName",
            type: "string",
            required: true,
          },
          {
            friendlyName: "Authors position",
            name: "authorPosition",
            type: "string",
            required: true,
          },
          {
            friendlyName: "Authors photo",
            name: "authorPhoto",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
            required: true,
          },
        ],
      },
    ],
  },
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
        name: "ctaVariant",
        type: "string",
        enum: ["full", "hollowDark", "hollow"],
        defaultValue: "full",
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
        class: "label-desktop caption14-mobile",
        responsiveStyles: {
          large: {
            color: "var(--ver-purple-50)",
            marginBottom: "16px",
          },
        },
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "I am child text block!" },
        },
        class: "h3-desktop h3-mobile",
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
      {
        type: "text",
        name: "cta",
      },
      {
        name: "align",
        type: "string",
        friendlyName: "align content",
        enum: ["left", "center"],
        defaultValue: "left",
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
  {
    component: withChildren(VideoWrapper),
    name: "VideoWrapper",
    inputs: [
      {
        name: "variant",
        type: "string",
        friendlyName: "wrapper variant",
        enum: ["hero", "default"],
        defaultValue: "default",
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Video",
          options: { loop: "true", fit: "cover" },
        },
        // responsiveStyles: {
        //   large: {
        //     height: "100vh",
        //   },
        // },
      },
    ],
  },
];

/*
 * This file is used to parse the theme.json file from the theme to generate the tailwind config
 */
import { gridSpacing, clampSpacing } from "./lib/spacing";
import { getScreens } from "./lib/responsive";
import { getAspectRatio } from "./lib/aspect-ratio";
import { getContainer } from "./lib/container";

export function themeParser(theme) {

  // import 16 grid spacing
  const spacing = gridSpacing();
  
  // import clamp sizes for gutters etc
  const ClampSizes = clampSpacing();
  
  // add clamp spacing for gaps
  ClampSizes.forEach((size) => {
    // add to spacing
    spacing["clamp-" + size.slug] = size.size;
  });

  // add colors
  let colors = {};
  theme.settings.color.palette.forEach((color) => {
    colors[color.slug] = color.color;
  });

  // add fonts and fontWeights
  let fonts = {};
  let fontWeights = {};
  theme.settings.typography.fontFamilies.forEach((fam) => {
    fonts[fam.slug] = fam.fontFamily.split(",");
    if (fam.fontFace) {
      // generate fontWeights
      fam.fontFace.forEach((face) => {
        fontWeights[face.fontWeight] = face.fontWeight;
      });
    }
  });

  // fontsizes
  let fontSizes = {};
  theme.settings.typography.fontSizes.forEach((size) => {
    // add font variables
    fontSizes[size.slug] = `var(--wp--preset--font-size--${size.slug})`;
  });

  // responsive
  const screens = getScreens();
  // aspect ratio 
  const aspectRatio = getAspectRatio();
  // container
  const container = getContainer();

  // export object
  return {
    fonts: fonts,
    fontWeights: fontWeights,
    colors: colors,
    spacing: spacing,
    fontSizes: fontSizes,
    screens: screens,
    aspectRatio: aspectRatio,
    container:container
  };
}

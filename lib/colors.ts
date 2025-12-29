// Colors grouped by palette family and shade (e.g. colors.pink[500]).
// Every hex in the codebase belongs to one family so we avoid duplicates.

export const colors = {
  neutral: {
    50: "#ffffff",
    75: "#fffefe",
    100: "#fff7fb",
    150: "#fff7f0",
    200: "#ffe7ff",
    250: "#fef9ff",
    300: "#fbf8ff",
    325: "#fbf4ff",
    350: "#faf8ff",
    375: "#f7fbff",
    400: "#f6f4fb",
    425: "#f5f3f2",
    450: "#f3f9ff",
    475: "#fdf8ff",
    500: "#ecf8ff",
    525: "#e8f3ff",
    550: "#efe3ff",
    575: "#f0e4ff",
    600: "#f0e7ff",
    625: "#f1e5ff",
    650: "#dbe9ff",
    675: "#dff4ff",
    700: "#e0d0f5",
    725: "#e0daf2",
  },
  plum: {
    950: "#040006",
    940: "#040109",
    930: "#0f0a13",
    900: "#110417",
    880: "#12081a",
    860: "#162237",
    840: "#18051f",
    820: "#1b0f26",
    800: "#1b0f2a",
    780: "#1e223a",
    760: "#1f132b",
    740: "#1f1428",
    720: "#1f1432",
    700: "#26143a",
  },
  violet: {
    680: "#2a1238",
    660: "#2b1336",
    640: "#2c0d49",
    620: "#2c1535",
    600: "#2c173c",
    580: "#2d1a3a",
    560: "#2f2c74",
    540: "#311038",
    520: "#3b224b",
    500: "#3c234a",
    480: "#401b45",
    460: "#433057",
    440: "#43306f",
    420: "#4c3a5f",
    400: "#524061",
    380: "#5c3c70",
    360: "#6b5a7c",
    340: "#6d48c9",
    320: "#7a60c9",
    300: "#7b6a99",
    280: "#8c65c7",
    260: "#8f79b3",
    240: "#9a8dbb",
    220: "#9d7ed0",
    200: "#a28bc3",
    180: "#a38fcf",
    160: "#a891c5",
    140: "#b05edc",
    120: "#b17eff",
    110: "#b47fe4",
    100: "#c28de2",
    90: "#cf7ef4",
    80: "#d7b6ff",
    70: "#ddc5ff",
  },
  magenta: {
    600: "#8a2f70",
    400: "#f2d7ff",
    375: "#f4e4ff",
    350: "#f58ed7",
    325: "#f5dcff",
    300: "#f6e2ff",
    275: "#f8e8ff",
    250: "#fdb2ff",
    225: "#ff8ac3",
    200: "#ffe3f7",
    175: "#ffe4f5",
  },
  aqua: {
    700: "#2b7f9f",
    650: "#36b0c2",
    600: "#5691ff",
    550: "#84dbe4",
    500: "#9fe7ff",
    450: "#9ff5ff",
    400: "#b1e1ff",
    350: "#d9f7ff",
  },
  mint: {
    600: "#73d7d9",
    550: "#8ec9d0",
    500: "#8ee9d9",
    450: "#9ce0c5",
    400: "#e2fff8",
  },
  amber: {
    500: "#f5c78e",
  },
};

export const gradients = {
  heroOverlay: [colors.plum[940], colors.violet[640], colors.plum[900]],
  heroButton: [colors.violet[90], colors.mint[600], colors.mint[450]],
  originsBackground: [colors.neutral[325], colors.neutral[450], colors.neutral[150]],
  popupBackground: [colors.neutral[250], colors.neutral[325], colors.neutral[550]],
  productTagStrip: [colors.magenta[375], colors.aqua[350], colors.magenta[200]],
} as const;

export type ColorFamily = keyof typeof colors;
export type ColorShade<F extends ColorFamily> = keyof (typeof colors)[F];
export type GradientToken = keyof typeof gradients;

export function getColor<F extends ColorFamily>(family: F, shade: ColorShade<F>) {
  return colors[family][shade];
}

export function getGradient(token: GradientToken) {
  return gradients[token];
}

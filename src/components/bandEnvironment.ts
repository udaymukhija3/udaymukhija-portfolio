/* The environment behind the six exposures, and the viewfinder over it.

   One supplied Central Park photograph per exposure, full-bleed and
   cross-fading as the visitor moves between exposures. The material is the
   park's: foliage, water, reflections, stone, glass, distant architecture,
   density against openness. Outside the focus frame the world is soft and
   slowly drifting; inside it the frame is sharp, exposed, and captioned as a
   figure. Each exposure allocates the frame to a different range of cells on
   the same 12 × 8 grid — asymmetry from one discipline.

   Files are expected under public/images/daybreak/. A missing file leaves
   that exposure on the flat field; nothing stands in for it. */

export type ExposurePhoto = {
  file: string;
  alt: string;
  /** Which supplied photograph belongs here, for whoever places the files. */
  source: string;
  /** object-position for wide and for portrait viewports. */
  focus: string;
  focusNarrow: string;
  /** Where the horizon sits in the frame, as a percentage of the viewport height. */
  horizon: number;
  /** Where the sun rises, as a percentage of the viewport width. */
  sun: number;
  /** The focus frame: 1-based inclusive cell range on the 12 × 8 grid. */
  frame: { c0: number; r0: number; c1: number; r1: number };
  /** What the frame is a figure of — the caption's subject. */
  subject: string;
};

export const GRID_COLUMNS = 12;
export const GRID_ROWS = 8;

export const exposurePhotos: readonly ExposurePhoto[] = [
  {
    file: "01-edge.webp",
    alt: "The Lake in Central Park seen through a frame of spring leaves, twin towers and low sun beyond.",
    source: "Portrait · the sunlit lake framed by leaves, a rowboat, the twin-towered block and sun flare top right.",
    focus: "50% 60%",
    focusNarrow: "55% 52%",
    horizon: 58,
    sun: 57,
    frame: { c0: 6, r0: 1, c1: 12, r1: 6 },
    subject: "Foliage, water, towers",
  },
  {
    file: "02-voice.webp",
    alt: "A shallow stream runs over rocks between new leaves, a rustic wooden rail in the foreground.",
    source: "Portrait · the stream over rocks with the wooden fence.",
    focus: "50% 55%",
    focusNarrow: "50% 50%",
    horizon: 22,
    sun: 52,
    frame: { c0: 7, r0: 2, c1: 12, r1: 8 },
    subject: "Water over stone",
  },
  {
    file: "03-possibility.webp",
    alt: "Still grey water reflects twin-towered apartment blocks and a line of spring trees.",
    source: "Landscape · the still Lake with the twin towers reflected, overcast, a pink tree on the far bank.",
    focus: "50% 0%",
    focusNarrow: "42% 30%",
    horizon: 53,
    sun: 40,
    frame: { c0: 1, r0: 1, c1: 6, r1: 7 },
    subject: "Reflection",
  },
  {
    file: "04-connection.webp",
    alt: "Two rowboats, two people in each, on green water in low sun.",
    source: "Portrait · two rowboats on the Lake under a streaked blue sky.",
    focus: "50% 67%",
    focusNarrow: "45% 58%",
    horizon: 56,
    sun: 62,
    frame: { c0: 5, r0: 2, c1: 11, r1: 8 },
    subject: "Two boats, four people",
  },
  {
    file: "05-curiosity.webp",
    alt: "A goose stands at the water's edge on a rock beside three turtles lined up in the sun.",
    source: "Landscape · the goose and three turtles on the rock, wide water.",
    focus: "50% 100%",
    focusNarrow: "55% 60%",
    horizon: 31,
    sun: 68,
    frame: { c0: 7, r0: 4, c1: 12, r1: 8 },
    subject: "Stone, a goose, three turtles",
  },
  {
    file: "06-openness.webp",
    alt: "A wide lawn full of people in summer light; a line of trees, and thin towers above them.",
    source: "Landscape · the crowded meadow under the towers, kite in the air.",
    focus: "50% 50%",
    focusNarrow: "60% 50%",
    horizon: 68,
    sun: 55,
    frame: { c0: 4, r0: 1, c1: 12, r1: 7 },
    subject: "Openness against density",
  },
];

export const environmentDirectory = "/images/daybreak";

/* Central Park. The coordinates are the place; the clock is the page. */
export const place = { name: "Central Park", city: "New York, NY", lat: "40.7812° N", lon: "73.9665° W" };

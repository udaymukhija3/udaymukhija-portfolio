/* The environment behind the six exposures: one supplied Central Park
   photograph per exposure, full-bleed, crossfading as the visitor moves from
   one exposure to the next. The light treats them — dark and cool at the
   edge, clear and warm by openness — so the same frame reads as pre-dawn
   at the top of the page and as morning further down.

   Files are expected under public/images/daybreak/. A missing file simply
   leaves that exposure on the flat field; nothing stands in for it. */

export type ExposurePhoto = {
  file: string;
  alt: string;
  /** Which supplied photograph belongs here, for whoever places the files. */
  source: string;
  /** object-position for wide and for portrait viewports. */
  focus: string;
  focusNarrow: string;
};

export const exposurePhotos: readonly ExposurePhoto[] = [
  {
    file: "01-edge.webp",
    alt: "The Lake in Central Park seen through a frame of spring leaves, twin towers and low sun beyond.",
    source: "Portrait · the sunlit lake framed by leaves, a rowboat, the twin-towered block and sun flare top right.",
    focus: "62% 40%",
    focusNarrow: "60% 45%",
  },
  {
    file: "02-voice.webp",
    alt: "A shallow stream runs over rocks between new leaves, a rustic wooden rail in the foreground.",
    source: "Portrait · the stream over rocks with the wooden fence.",
    focus: "45% 60%",
    focusNarrow: "45% 62%",
  },
  {
    file: "03-possibility.webp",
    alt: "Bare early-spring trees over the Lake, thin towers standing beyond, forsythia on the far bank.",
    source: "Portrait · the bare-tree early-spring lake with the supertalls and the yellow forsythia.",
    focus: "48% 46%",
    focusNarrow: "50% 50%",
  },
  {
    file: "04-connection.webp",
    alt: "Two rowboats, two people in each, on green water in low sun.",
    source: "Portrait · two rowboats on the Lake under a streaked blue sky.",
    focus: "40% 70%",
    focusNarrow: "36% 72%",
  },
  {
    file: "05-curiosity.webp",
    alt: "A goose stands at the water's edge on a rock beside three turtles lined up in the sun.",
    source: "Landscape · the goose and three turtles on the rock, wide water.",
    focus: "55% 78%",
    focusNarrow: "60% 80%",
  },
  {
    file: "06-openness.webp",
    alt: "The Lake in full sun under a clear blue sky, thin towers rising above the far trees, rowboats in the distance.",
    source: "Portrait · the sunlit lake with the supertalls through spring trees, boats in the distance.",
    focus: "50% 48%",
    focusNarrow: "50% 52%",
  },
];

export const environmentDirectory = "/images/daybreak";

/* Central Park. The coordinates are the place; the clock is the page. */
export const place = { name: "Central Park", city: "New York, NY", lat: "40.7812° N", lon: "73.9665° W" };

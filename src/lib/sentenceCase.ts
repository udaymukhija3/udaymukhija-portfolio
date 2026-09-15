/* Project labels are stored in Title Case; the quiet pages set them in sentence case,
   keeping acronyms such as AI, ML, and D2C intact. */
export function sentenceCase(label: string) {
  return label.replace(/[A-Z][a-z]+/g, (word, offset: number) => (offset === 0 ? word : word.toLowerCase()));
}

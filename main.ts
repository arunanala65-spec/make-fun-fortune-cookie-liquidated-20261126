// Fortune Cookie for the Liquidated Trader — make.fun entry.
// Writes one fortune-cookie line to entry.txt: an oracular warning in
// cookie voice, broken by a dry punchline about the ignored stop-loss.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const fortune =
  "Beware the man who ignores his stop-loss. The exchange accepts his account as a donation.";

// Gate: UTF-8 text of 1 to 160 characters, not only white space,
// and the brief's cap of at most 20 words of plain text.
const charCount = [...fortune].length;
if (charCount < 1 || charCount > 160) {
  throw new Error(`fortune must be 1-160 characters, got ${charCount}`);
}
if (fortune.trim().length === 0) {
  throw new Error("fortune must not be only white space");
}
const wordCount = fortune.trim().split(/\s+/).length;
if (wordCount > 20) {
  throw new Error(`fortune must be at most 20 words, got ${wordCount}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), fortune, "utf8");
console.log(fortune);

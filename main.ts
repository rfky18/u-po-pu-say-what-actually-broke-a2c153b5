// Say What Actually Broke — entry program (Node 22+, stdlib only).
// Writes one single-line error message to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Your backup finished successfully. It backed up nothing — the folder it was watching was deleted in March. Check your backups before you need them.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = `${outDir}/entry.txt`;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

// Read-back self-check: the file must be exactly the line, UTF-8,
// one line, 1-200 characters, no trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) fail("entry.txt does not match the expected line");
if (written.includes("\n") || written.includes("\r")) {
  fail("entry.txt must be a single line");
}
if (written.length < 1 || written.length > 200) {
  fail(`entry.txt must be 1-200 characters, got ${written.length}`);
}

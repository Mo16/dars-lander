# The warm "register" design for /institutes

The first pass at `/institutes`, before it was rebuilt in the Google
Classroom house style. Kept because it was never committed to git and
because it carries three sections the Google version dropped:

- **The code slip** — the noticeboard tear-off carrying `DARS · 7K2M`
  and the three join steps (`CodeSlip` in `page.tsx.txt`).
- **Who sees what** — the roles × permissions table, including the
  "personal revision" column that is `No` for every role
  (`AccessTable` in `page.tsx.txt`).
- **The parts a principal asks about first** — offline behaviour, under
  16s, data export, and what is not built yet.

Saved as `.tsx.txt` on purpose: the extension keeps them out of the
Next.js route tree and out of type-checking. To bring a section back,
copy the component into `app/institutes/page.tsx` and restyle it to the
current palette (white surfaces, `#F6F5F2` bands, `--accent`).

The palette it used was the darsapp.com house one: cream `#FFFCF6`,
`bg-cream-200` bands, coral `#EC6144`, ink `#1A1814`, Instrument Serif
italic for the one accented headline word.

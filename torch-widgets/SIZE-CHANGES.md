# TORCH Widgets — Size Change (Migration Notes)

The fixed dimensions of the `Widget` primitive changed. If you already pulled an
earlier copy of `torch-widgets/` into a project, update the **one file below** and
your layout assumptions — nothing else in the widget code changed.

---

## TL;DR — old → new

| Size | Old dimensions | Old Tailwind | New dimensions | New Tailwind |
|------|---------------|--------------|----------------|--------------|
| `sm` | 192 × 192 | `size-48` | **192 × 192** *(unchanged)* | `size-48` |
| `md` | 384 × 192 | `w-96 h-48` | **408 × 192** | `w-[408px] h-48` |
| `lg` | 384 × 384 | `size-96` | **408 × 408** | `size-[408px]` |
| `xl` | 798 × 384 | `w-[798px] h-96` | **840 × 408** | `w-[840px] h-[408px]` |

- `sm` did **not** change.
- `md` / `lg` grew **+24 px in width** (384 → 408).
- `lg` also grew **+24 px in height** (384 → 408).
- `xl` grew **+42 px wide** (798 → 840) and **+24 px tall** (384 → 408).

> Why arbitrary values? 408 and 840 aren't default Tailwind spacing steps, so they
> must be written as `w-[408px]` / `size-[408px]` / `w-[840px] h-[408px]`.

---

## The only code change

`torch-widgets/components/ui/widget.tsx` — the `size` variant in the `cva` block:

```diff
       size: {
         sm: "size-48",
-        md: "w-96 h-48",
-        lg: "size-96",
-        xl: "w-[798px] h-96",
+        md: "w-[408px] h-48",
+        lg: "size-[408px]",
+        xl: "w-[840px] h-[408px]",
       },
```

No other files were touched. Every widget reads its size from this primitive, so the
change propagates automatically — you do **not** need to edit any `widgets/**/*.tsx`.

---

## What to do in a project that used the old sizes

1. **Replace `components/ui/widget.tsx`** with the new version (or apply the diff above).

2. **Re-check any layout that hard-coded the old widths.** If you placed widgets in a
   container sized to the old dimensions, bump it:

   | If you assumed… | Change to… |
   |---|---|
   | a column `w-96` (384) for md/lg | `w-[408px]` |
   | an xl row `w-[798px]` | `w-[840px]` |
   | a grid cell / gap math using 384 / 798 | use 408 / 840 |

3. **Flex/grid layouts usually need no change** — the widgets are fixed-size and just
   take a little more room. A `flex flex-wrap gap-6` wrapper reflows automatically.

4. **The registry route** (`/widgets/torch`) uses the same sizes; its grid spans are
   unchanged (xl still spans the full row, md/lg still half-row).

---

## Pixel reference (for layout math)

```
sm  192 × 192
md  408 × 192
lg  408 × 408
xl  840 × 408     (≈ lg width × 2 + 24px)
```

All four heights now come in two values only: **192** (sm, md) and **408** (lg, xl).
Widths: **192** (sm), **408** (md, lg), **840** (xl).

---

*Sizes are set centrally in `components/ui/widget.tsx`. To use a custom size,
add another entry to the `size` variant there and pass `size="…"` to `<Widget>`.*

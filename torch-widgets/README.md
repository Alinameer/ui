# TORCH Widgets

A self-contained set of **24 dashboard / analytics widgets** (charts, KPIs, heatmaps, funnels, treemaps, radials) built with React, [Recharts](https://recharts.org), [Tailwind CSS v4](https://tailwindcss.com), and a small set of Radix primitives.

Drop the whole `torch-widgets/` folder into any React + TypeScript app, install a few peer dependencies, import the theme CSS once, and use the widgets.

---

## 1. Install

Copy the entire `torch-widgets/` folder into your app's source (e.g. `src/torch-widgets/`).

Then install the peer dependencies (these are **not** bundled — your app provides them):

```bash
npm install recharts lucide-react class-variance-authority clsx tailwind-merge \
  @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-select @radix-ui/react-slot
```

Tested against:

| Package | Version |
|---|---|
| react / react-dom | 19.2 (works on 18+) |
| recharts | ^2.15.4 |
| lucide-react | ^0.546.0 |
| class-variance-authority | ^0.7.1 |
| clsx | ^2.1.1 |
| tailwind-merge | ^3.3.1 |
| @radix-ui/react-label | ^2.1.7 |
| @radix-ui/react-separator | ^1.1.7 |
| @radix-ui/react-select | ^2.2.6 |
| @radix-ui/react-slot | ^1.2.4 |

> **Tailwind CSS v4 is required** — the widgets are styled entirely with Tailwind utility classes. They will render unstyled without it.

---

## 2. Add the theme

In your app's global stylesheet (the one that has `@import "tailwindcss";`), import the theme **once**, after Tailwind:

```css
@import "tailwindcss";
@import "./torch-widgets/torch-theme.css";   /* adjust the path to where you put the folder */
```

This registers the color tokens the widgets use (`chart-1..5`, `vercel-*`, `productive`, `destructive`, `secondary`, `muted`, `border`, `card`, `foreground`) as Tailwind v4 `@theme` colors and defines their light + dark values.

> **Already a shadcn/ui app?** You likely already define `--background`, `--foreground`, `--muted`, `--chart-*`, etc. In that case you can trim `torch-theme.css` down to just the tokens you're missing — most commonly the `--vercel-*` colors and `--productive`.

---

## 3. Use a widget

Every widget is a complete, self-contained component with its own demo data — no props required. Import by name from the barrel:

```tsx
import { TorchXlCloudOverview, TorchMdRevenueArea } from "./torch-widgets";

export default function Dashboard() {
  return (
    <div className="flex flex-wrap gap-6">
      <TorchMdRevenueArea />
      <TorchXlCloudOverview />
    </div>
  );
}
```

Each widget renders at a **fixed size** (set by the underlying `Widget` primitive), so place them in a flex/grid layout and they'll size themselves.

---

## 4. Widget catalog

Naming convention: `Torch<Size><Description>`. The size maps to fixed dimensions:

| Size | Dimensions | Tailwind |
|------|-----------|----------|
| `Sm` | 192 × 192 | `size-48` |
| `Md` | 408 × 192 | `w-[408px] h-48` |
| `Lg` | 408 × 408 | `size-[408px]` |
| `Xl` | 840 × 408 | `w-[840px] h-[408px]` |

### sm (192 × 192)
| Export | Chart | What it shows |
|---|---|---|
| `TorchSmKpiSparkline` | Area sparkline | A KPI metric + trend delta |
| `TorchSmDonutBreakdown` | Donut | Resource/region breakdown with center total |
| `TorchSmRadialGauge` | Radial | Uptime / SLA gauge |
| `TorchSmMiniBar` | Bar | Weekly deploys |

### md (408 × 192)
| Export | Chart | What it shows |
|---|---|---|
| `TorchMdRevenueArea` | Area | Revenue trend + delta |
| `TorchMdThroughputBars` | Grouped bars | This week vs last week |
| `TorchMdClusterHealth` | KPI grid + sparklines | Cluster metrics |
| `TorchMdRequestsArea` | Stacked area | Desktop vs mobile requests |
| `TorchMdSignupsComposed` | Bar + hover trace | **Interactive** — hover-trace line + value pill follow the cursor (signups vs goal) |
| `TorchMdTrafficSources` | Horizontal bars | Traffic by source |

### lg (408 × 408)
| Export | Chart | What it shows |
|---|---|---|
| `TorchLgAnalytics` | Area + Select | Analytics with switchable range + stat list |
| `TorchLgTrafficDonut` | Donut | Traffic source + legend + export button |
| `TorchLgServiceScorecard` | Radar | Service scores across 6 SLO axes |
| `TorchLgApiTraffic` | Bar + table | Requests by endpoint + latency table |
| `TorchLgTopEndpoints` | Horizontal bar | Top endpoints ranking |
| `TorchLgConversionFunnel` | Funnel | Conversion steps with rates |
| `TorchLgResourceUsage` | Multi-ring radial | CPU / Memory / Disk |
| `TorchLgLatencyPercentiles` | Multi-line | p50 / p95 / p99 latency |
| `TorchLgSignupsVsGoal` | Bar + hover trace | **Interactive** — hover a bar: a dashed reference line + value pill snap to it and the header updates. Weekly signups vs goal + YAxis |

### xl (840 × 408)
| Export | Chart | What it shows |
|---|---|---|
| `TorchXlRevenuePerformance` | Composed (bar + line) | Revenue vs forecast + KPIs |
| `TorchXlLatencyByRegion` | Multi-line | Latency per region + stats |
| `TorchXlDeployActivity` | Heatmap | GitHub-style deploy activity |
| `TorchXlCostVsPerformance` | Scatter / bubble | Cost vs performance per service |
| `TorchXlResourceAllocation` | Treemap | Spend allocation by service |
| `TorchXlCloudOverview` | 3-panel combo | Flagship overview dashboard |
| `TorchXlSignupsVsGoal` | Bar + hover trace | **Interactive** — hover-trace line + value pill follow the cursor; monthly signups vs goal + KPI side panel |

---

## 4b. Interactive widgets

Most widgets are static (chart + data). Three are **interactive** — the **Signups vs Goal** widgets (`TorchMdSignupsComposed`, `TorchLgSignupsVsGoal`, `TorchXlSignupsVsGoal`):

- Hovering a bar moves a **dashed reference line** to that bar's top, shows a **value pill** on it, **highlights** the hovered bar (others dim), and **updates the header** value + period label.
- On mouse-leave they reset to the latest period.

This is implemented purely with Recharts (`ReferenceLine` + a custom SVG label) and local React state — **no extra animation dependencies** required.

---

## 5. Dark mode

The theme defines a `.dark` variant. Add the `dark` class to a parent (e.g. `<html class="dark">`) and the widgets follow.

Individual widgets also accept the primitive's `theme` prop if you compose your own — but the bundled widgets render at the app's current theme automatically.

---

## 6. Customizing

- **Data:** each widget keeps its demo data in `const` arrays at the top of its file. To wire real data, either edit the file or copy it and replace the constants.
- **Colors:** change the `--chart-*` / `--vercel-*` values in `torch-theme.css` — every widget updates.
- **Build your own:** the primitives are exported too:
  ```tsx
  import { Widget, WidgetHeader, WidgetTitle, WidgetContent, ChartContainer, type ChartConfig } from "./torch-widgets";
  ```

---

## 7. Folder structure

```
torch-widgets/
├── index.ts                 # barrel — named exports for all 24 widgets + primitives
├── torch-theme.css          # Tailwind v4 theme tokens (import once)
├── README.md
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
├── components/ui/           # primitives the widgets are built on
│   ├── widget.tsx           # Widget / WidgetHeader / WidgetTitle / WidgetContent / WidgetFooter
│   ├── chart.tsx            # ChartContainer + Recharts theming
│   ├── label.tsx · button.tsx · table.tsx · select.tsx · separator.tsx
└── widgets/
    ├── sm/  (4)   md/  (6)   lg/  (8)   xl/  (6)     # 24 total
```

All imports inside the folder are **relative** — there are no `@/` path-alias dependencies, so it works regardless of your app's `tsconfig` paths.

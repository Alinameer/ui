# TORCH Widgets — Specifications

**Component set:** 26 dashboard / analytics widgets
**Stack:** React 18/19 · TypeScript · Tailwind CSS v4 · Recharts 2 · Radix UI primitives
**Theme:** light + dark, driven by CSS variables (`torch-theme.css`)
**Status:** production-ready, fully type-checked, self-contained (no path-alias dependencies)

---

## 1. Overview

| Metric | Value |
|---|---|
| Total widgets | **26** |
| Sizes | 4 (sm, md, lg, xl) |
| Distinct chart types | 13 (area, bar, horizontal bar, line, donut/pie, radial gauge, multi-ring radial, radar, composed, scatter/bubble, treemap, funnel, heatmap) |
| Color tokens | `chart-1…5`, `vercel-{blue,purple,pink,teal,yellow}`, `productive`, `destructive` |
| External chart lib | Recharts (20 of 24 use it; 4 are pure CSS/SVG) |
| Props required to render | none — each ships self-contained demo data |

---

## 2. Size specifications

Each widget renders at a **fixed pixel size** set by the `Widget` primitive's `size` prop. Sizes were chosen so widgets tile cleanly into a 12-column dashboard grid.

| Size | Width × Height | Tailwind class | Footprint | Best for |
|------|---------------|----------------|-----------|----------|
| **sm** | 192 × 192 px | `size-48` | square, 1 cell | single KPI, mini chart, gauge |
| **md** | 408 × 192 px | `w-[408px] h-48` | wide, ½ row | trend chart, comparison, stat group |
| **lg** | 408 × 408 px | `size-[408px]` | square, ½ row | rich chart + legend/table/stat list |
| **xl** | 840 × 408 px | `w-[840px] h-[408px]` | full row | multi-panel, wide trends, heatmap, treemap |

> `xl` width = `lg` width × 2 + 24 px (816 + 24 = 840), per design spec.

---

## 3. Full widget specification table

| # | Export name | Size | Dimensions | Chart type | Recharts components | Color tokens | Description |
|---|-------------|------|-----------|-----------|--------------------|-------------|-------------|
| 1 | `TorchSmKpiSparkline` | sm | 192×192 | Area sparkline | `AreaChart`, `Area` | vercel-blue | KPI metric (Throughput) + area sparkline + % delta |
| 2 | `TorchSmDonutBreakdown` | sm | 192×192 | Donut | `PieChart`, `Pie` | vercel-blue/purple/pink/teal | 4-slice resource/region breakdown, center total |
| 3 | `TorchSmRadialGauge` | sm | 192×192 | Radial gauge | `RadialBarChart`, `RadialBar` | productive | Uptime / SLA single-value gauge |
| 4 | `TorchSmMiniBar` | sm | 192×192 | Bar | `BarChart`, `Bar` | vercel-blue | Weekly deploys (Mon–Sun) |
| 5 | `TorchMdRevenueArea` | md | 408×192 | Area | `AreaChart`, `Area` | productive | Revenue trend + value + delta |
| 6 | `TorchMdThroughputBars` | md | 408×192 | Grouped bar | `BarChart`, `Bar` ×2 | chart-1, chart-3 | This week vs last week, by day |
| 7 | `TorchMdClusterHealth` | md | 408×192 | KPI grid + sparklines | `AreaChart`, `Area` | productive, destructive, vercel-blue/purple | 2 KPIs + 4 mini-metric sparkline tiles |
| 8 | `TorchMdRequestsArea` | md | 408×192 | Stacked area | `AreaChart`, `Area` ×2 | vercel-blue, vercel-purple | Desktop vs mobile requests, 6 mo, + legend |
| 9 | `TorchMdSignupsComposed` | md | 408×192 | Bar + hover trace ⚡ | `BarChart`, `Bar`, `Cell`, `ReferenceLine`, `Tooltip` | chart-1, vercel-yellow | **Interactive** — hover moves trace line + value pill, updates header |
| 10 | `TorchMdTrafficSources` | md | 408×192 | Horizontal bars (CSS) | — (div bars) | vercel-blue/purple/pink/teal | Traffic by source, top 4 + total |
| 11 | `TorchLgAnalytics` | lg | 408×408 | Area + Select | `AreaChart`, `Area` | vercel-teal | Switchable-range analytics + 4-row stat list |
| 12 | `TorchLgTrafficDonut` | lg | 408×408 | Donut | `PieChart`, `Pie` | vercel-blue/purple/pink/teal | Traffic source donut + legend + Export button |
| 13 | `TorchLgServiceScorecard` | lg | 408×408 | Radar | `RadarChart`, `Radar` ×2 | chart-1, chart-2 | Service scores across 6 SLO axes (current vs target) |
| 14 | `TorchLgApiTraffic` | lg | 408×408 | Bar + table | `BarChart`, `Bar` | chart-1 | Requests-by-endpoint bars + latency table |
| 15 | `TorchLgTopEndpoints` | lg | 408×408 | Horizontal bar | `BarChart`, `Bar` (vertical layout) | chart-1 | Top 6 endpoints by requests |
| 16 | `TorchLgConversionFunnel` | lg | 408×408 | Funnel | `FunnelChart`, `Funnel` | chart-1/2/3/4 | Visitors→Signups→Activated→Paid + step rates |
| 17 | `TorchLgResourceUsage` | lg | 408×408 | Multi-ring radial | `RadialBarChart`, `RadialBar` | chart-1, vercel-purple, vercel-teal | 3 concentric rings: CPU / Memory / Disk |
| 18 | `TorchLgLatencyPercentiles` | lg | 408×408 | Multi-line | `LineChart`, `Line` ×3 | chart-1, chart-3, destructive | p50 / p95 / p99 latency over time |
| 19 | `TorchLgSignupsVsGoal` | lg | 408×408 | Bar + hover trace ⚡ | `BarChart`, `Bar`, `Cell`, `ReferenceLine`, `Tooltip`, `YAxis` | chart-1, vercel-yellow | **Interactive** — hover trace line + value pill + YAxis + footer totals |
| 20 | `TorchXlRevenuePerformance` | xl | 840×408 | Composed (bar + line) | `ComposedChart`, `Bar`, `Line` | chart-1, chart-3 | Revenue vs forecast + KPI column |
| 21 | `TorchXlLatencyByRegion` | xl | 840×408 | Multi-line | `LineChart`, `Line` ×3 | chart-1, chart-2, chart-4 | Latency per region (us-east-1, eu-west-1, ap-south-1) + per-region P95 stats |
| 22 | `TorchXlDeployActivity` | xl | 840×408 | Heatmap (CSS grid) | — (div grid) | productive (opacity buckets) | GitHub-style deploy activity, 6 mo, + legend |
| 23 | `TorchXlCostVsPerformance` | xl | 840×408 | Scatter / bubble | `ScatterChart`, `Scatter`, `ZAxis` | chart-1…5, vercel-* | Cost vs performance per service, bubble = team size |
| 24 | `TorchXlResourceAllocation` | xl | 840×408 | Treemap | `Treemap` | chart-1…4, vercel-* | Spend allocation by service + service list |
| 25 | `TorchXlCloudOverview` | xl | 840×408 | 3-panel combo | `BarChart`, `AreaChart` | chart-1, vercel-blue | Flagship: top endpoints + area trend + KPI tiles |
| 26 | `TorchXlSignupsVsGoal` | xl | 840×408 | Bar + hover trace ⚡ | `BarChart`, `Bar`, `Cell`, `ReferenceLine`, `Tooltip`, `YAxis` | chart-1, vercel-yellow | **Interactive** — hover trace line + value pill + 4-KPI side panel |

---

## 4. Chart-type coverage

Counting each widget by its **primary** chart type (widgets 7 and 24 combine several panels and are listed once under their lead chart):

| Chart type | Count | Widgets |
|---|---|---|
| Area (incl. stacked & sparkline) | 6 | 1, 5, 7, 8, 11, 24 |
| Bar (vertical / grouped) | 3 | 4, 6, 14 |
| Horizontal bar | 2 | 10 (CSS), 15 |
| Line (multi-series, 3 lines each) | 2 | 18, 20 |
| Donut / Pie | 2 | 2, 12 |
| Radial gauge (single value) | 1 | 3 |
| Multi-ring radial (3 rings) | 1 | 17 |
| Radar (2 series, 6 axes) | 1 | 13 |
| Composed (bar + line) | 1 | 20 |
| Bar + hover trace ⚡ (interactive) | 3 | 9, 19, 26 |
| Scatter / bubble | 1 | 23 |
| Treemap | 1 | 24 |
| Funnel | 1 | 16 |
| Heatmap (CSS grid) | 1 | 22 |
| **Total** | **26** | |

---

## 5. Theming & tokens

All visual styling is driven by CSS custom properties (defined in `torch-theme.css`), exposed to Tailwind v4 as `@theme` colors.

| Token | Light value (oklch) | Used for |
|---|---|---|
| `--chart-1` | `0.809 0.105 251.813` (Blue 300) | primary series |
| `--chart-2` | `0.71 0.14 255` | secondary series |
| `--chart-3` | `0.546 0.245 262.881` (Blue 600) | comparison series |
| `--chart-4` | `0.488 0.243 264.376` (Blue 700) | funnel/treemap steps |
| `--chart-5` | `0.424 0.199 265.638` (Blue 800) | extra series |
| `--vercel-blue` | `0.5787 0.2146 258.04` | category accent |
| `--vercel-purple` | `0.5556 0.1829 305.86` | category accent |
| `--vercel-pink` | `0.6368 0.2131 1.2` | category accent |
| `--vercel-teal` | `0.6491 0.1136 181.96` | category accent |
| `--vercel-yellow` | `0.8169 0.1639 75.84` | goal/highlight |
| `--productive` | `0.627 0.194 149.214` (Green 600) | positive deltas, uptime |
| `--destructive` | `0.577 0.245 27.325` (Red 600) | negative deltas, errors |

Dark mode: a `.dark` class on any ancestor swaps `--background`, `--foreground`, `--card`, `--muted`, `--secondary`, `--border` (chart/vercel colors stay constant for contrast).

---

## 6. Dependencies

**Peer dependencies** (provided by the host app, not bundled):

| Package | Version | Purpose |
|---|---|---|
| react / react-dom | 18+ (tested 19.2) | runtime |
| recharts | ^2.15.4 | charts |
| lucide-react | ^0.546.0 | icons |
| class-variance-authority | ^0.7.1 | variant styling |
| clsx + tailwind-merge | ^2.1.1 / ^3.3.1 | `cn()` class helper |
| @radix-ui/react-label | ^2.1.7 | Label primitive |
| @radix-ui/react-separator | ^1.1.7 | Separator primitive |
| @radix-ui/react-select | ^2.2.6 | Select (used by widget 11) |
| @radix-ui/react-slot | ^1.2.4 | Button `asChild` |

**Build/runtime requirement:** Tailwind CSS v4 (widgets are styled entirely via Tailwind utilities).

---

## 7. Architecture notes

- **Self-contained:** all imports inside the bundle are relative — no `@/` path aliases, so it drops into any project regardless of `tsconfig` paths. Verified by a standalone type-check with aliases disabled (exit 0).
- **Primitives layer:** widgets compose 7 shared primitives — `Widget` (the sized card shell), `ChartContainer` (Recharts theming wrapper), `Label`, `Button`, `Table`, `Select`, `Separator`.
- **Overflow-safe:** every chart is height-capped within its fixed card (`flex-1 min-h-0` + `overflow-hidden`) so no chart bleeds past the card border at any size.
- **Interactive widgets (⚡):** the three Signups vs Goal widgets (9, 19, 26) implement a hover-trace interaction — hovering a bar moves a Recharts `ReferenceLine` + custom SVG value pill to it, highlights the bar via per-`Cell` opacity, and updates the header from local React state. A hidden `<Tooltip>` is included solely to drive Recharts' active-index tracking. No extra animation libraries (no `motion`, no `@number-flow/react`) are required.
- **Demo data:** each widget keeps its sample data in `const` arrays at the top of its file; swap these for live data, or copy the widget and parameterize.

---

*Generated from the `torch-widgets/` source. See `README.md` for installation and usage.*

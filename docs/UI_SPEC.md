# Basic Design (UI Specification)

## 1. Design System

### Design Approach
- **Pattern:** Concentric rings — time at center, data expanding outward
- **Style:** Vibrant multi-color on pure black AMOLED
- **Inspiration:** Garmin Fenix data density + Pixel Watch concentric layout

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| --color-bg | radial-gradient(#1a1a2e → #0d0d1a → #000000) | Background (dark radial gradient) |
| --color-text-primary | #ffffff | Time, primary text |
| --color-text-secondary | #b0b0b0 | Date, labels, units |
| --color-steps | #00ff88 | Step count, step arc |
| --color-heart-rate | #ff5555 | Heart rate value, HR arc |
| --color-battery-high | #00ff88 | Battery >50% |
| --color-battery-mid | #ffaa00 | Battery 20-50% |
| --color-battery-low | #ff4444 | Battery <20% |
| --color-weather | #00b4ff | Temperature, weather icon tint |
| --color-calories | #ff8c00 | Calorie count, icon |
| --color-distance | #b388ff | Distance value, icon |
| --color-aod-text | #ffffff | AOD time display |
| --color-aod-dim | #666666 | AOD secondary (steps) |

### Typography Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| --text-time | 72px | Bold | Main time display (HH:MM) |
| --text-date | 18px | Regular | Day + date |
| --text-metric-value | 28px | Semi-bold | Step count, HR, calories, distance |
| --text-metric-label | 14px | Regular | Metric labels (bpm, km, cal) |
| --text-battery | 20px | Semi-bold | Battery percentage |
| --text-weather | 22px | Semi-bold | Temperature |
| --text-aod-time | 60px | Light | AOD time |
| --text-aod-steps | 16px | Regular | AOD step count |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| --space-xs | 4px | Icon-to-text gap |
| --space-sm | 8px | Within metric groups |
| --space-md | 16px | Between metric groups |
| --space-lg | 24px | Between layout zones |
| --space-ring-gap | 12px | Gap between concentric arcs |

### Arc Dimensions

| Token | Value | Usage |
|-------|-------|-------|
| --arc-outer-radius | 230px | Step progress arc (outer ring) |
| --arc-outer-width | 10px | Step arc stroke width |
| --arc-inner-radius | 206px | HR arc (inner ring) |
| --arc-inner-width | 8px | HR arc stroke width |
| --arc-start-angle | 150° | Arc start (bottom-left) |
| --arc-end-angle | 390° | Arc end (bottom-right, = 30°) |

---

## 2. Screen Flow

```
[Wrist Raise / Screen Tap]
        │
        ▼
   ┌─────────┐
   │  S-01   │ ◄── Main Watch Face (all metrics)
   │  Main   │
   └────┬────┘
        │ [Screen timeout / Wrist down]
        ▼
   ┌─────────┐
   │  S-02   │ ◄── AOD (time + steps only)
   │  AOD    │
   └────┬────┘
        │ [Wrist raise]
        ▼
   Back to S-01
```

---

## 3. Screen Specifications

### S-01: Main Watch Face (480x480 circular)

#### Layout Zones

```
Zone map (concentric from outside in):

    ╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
   ╱  ▓▓▓▓▓▓ OUTER ARC: Steps ▓▓▓▓ ╲
  ╱  ╭─────────────────────────────╮  ╲
 │  ╱  ░░░░ INNER ARC: HR ░░░░░░░  ╲  │
 │ │  ╭─────────────────────────╮    │ │
 │ │  │                         │    │ │
 │ │  │    ZONE A: Weather+Bat  │    │ │
 │ │  │    ☁ 22°C    ⚡ 87%    │    │ │
 │ │  │                         │    │ │
 │ │  │    ZONE B: Time         │    │ │
 │ │  │       14:30             │    │ │
 │ │  │     Tue, Mar 11         │    │ │
 │ │  │                         │    │ │
 │ │  │    ZONE C: Primary Data │    │ │
 │ │  │    ♥ 72 bpm             │    │ │
 │ │  │    👟 8,642 steps       │    │ │
 │ │  │                         │    │ │
 │ │  │    ZONE D: Secondary    │    │ │
 │ │  │    🔥 420 cal  📏 4.2km │    │ │
 │ │  ╰─────────────────────────╯    │ │
 │  ╲                               ╱  │
  ╲  ╰─────────────────────────────╯  ╱
   ╲  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ╱
    ╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
```

#### Zone A: Status Bar (top area, y: 40-80)

| Element | Position | Size | Color | Data |
|---------|----------|------|-------|------|
| Weather icon | x: 140, y: 45 | 28x28 | --color-weather | E-05 condition_code |
| Temperature | x: 172, y: 44 | --text-weather | --color-weather | E-05 temperature_c + "°" |
| Battery icon | x: 280, y: 45 | 20x20 | Dynamic (high/mid/low) | E-04 |
| Battery % | x: 304, y: 44 | --text-battery | Dynamic | E-04 percentage + "%" |

#### Zone B: Time + Date (center, y: 140-230)

| Element | Position | Size | Color | Data |
|---------|----------|------|-------|------|
| Time HH:MM | Centered, y: 150 | --text-time (56px) | --color-text-primary | E-01 hours:minutes |
| Date line | Centered, y: 215 | --text-date (18px) | --color-text-secondary | E-01 "Day, Mon DD" |

#### Zone C: Primary Metrics (center-lower, y: 260-320)

| Element | Position | Size | Color | Data |
|---------|----------|------|-------|------|
| HR icon | x: 145, y: 265 | 22x22 | --color-heart-rate | Static icon |
| HR value | x: 170, y: 262 | --text-metric-value | --color-heart-rate | E-03 current_bpm |
| HR unit | x: after value, y: 268 | --text-metric-label | --color-heart-rate | "bpm" |
| Steps icon | x: 145, y: 300 | 22x22 | --color-steps | Static icon |
| Steps value | x: 170, y: 297 | --text-metric-value | --color-steps | E-02 current_steps (formatted with comma) |

#### Zone D: Secondary Metrics (bottom, y: 350-390)

| Element | Position | Size | Color | Data |
|---------|----------|------|-------|------|
| Calories icon | x: 130, y: 360 | 18x18 | --color-calories | Static icon |
| Calories value | x: 152, y: 358 | 20px | --color-calories | E-06 daily_calories + " cal" |
| Distance icon | x: 270, y: 360 | 18x18 | --color-distance | Static icon |
| Distance value | x: 292, y: 358 | 20px | --color-distance | E-07 daily_distance_km + " km" |

#### Outer Arc: Step Progress Ring

| Property | Value |
|----------|-------|
| Center | 240, 240 |
| Radius | 230px |
| Width | 10px |
| Start angle | 150° |
| End angle | 390° (wraps to 30°) |
| Background | #1a1a1a (track) |
| Fill color | --color-steps (#00ff88) |
| Fill % | E-02 current_steps / target_steps * 100 |

#### Inner Arc: Heart Rate Ring

| Property | Value |
|----------|-------|
| Center | 240, 240 |
| Radius | 206px |
| Width | 8px |
| Start angle | 150° |
| End angle | 390° |
| Background | #1a1a1a (track) |
| Fill color | --color-heart-rate (#ff5555) |
| Fill % | E-03 current_bpm mapped to 40-200 range |

#### Interactions
- **Wrist raise:** Full render of all zones + arcs
- **Screen timeout:** Transition to S-02 AOD
- **No tap actions** in MVP (watch faces don't support navigation)

#### Data Refresh
| Data | Interval | Source |
|------|----------|--------|
| Time | 60s | System clock |
| Steps | 60s | Step sensor |
| Heart rate | 10s | HR sensor |
| Battery | 60s | Battery API |
| Weather | 60s | Zepp app cache |
| Calories | 60s | Calorie sensor |
| Distance | 60s | Distance sensor |

---

### S-02: AOD Watch Face (480x480 circular)

#### Layout (Minimal — <10% pixel illumination)

```
    ╭━━━━━━━━━━━━━━━━━━━━╮
   ╱                      ╲
  ╱                        ╲
 │                          │
 │                          │
 │         14:30            │  ← White, 48px light
 │                          │
 │        8,642             │  ← Dim gray, 16px
 │        steps             │
 │                          │
 │                          │
  ╲                        ╱
   ╲                      ╱
    ╰━━━━━━━━━━━━━━━━━━━━╯
```

| Element | Position | Size | Color |
|---------|----------|------|-------|
| Time HH:MM | Centered, y: 200 | 48px, light | --color-aod-text (#ffffff) |
| Steps value | Centered, y: 270 | 16px, regular | --color-aod-dim (#666666) |
| "steps" label | Centered, y: 292 | 12px, regular | --color-aod-dim (#666666) |

#### AOD Rules
- Background: pure black (#000000) — no fill, no arcs
- No icons (save pixels)
- No color accents (white + gray only)
- No second hand / animation
- show_level: 2 (AOD-only widgets)

---

## 4. Asset Requirements

| Asset | Size | Format | Notes |
|-------|------|--------|-------|
| Weather icons (8 states) | 28x28 each | PNG with transparency | Sun, cloud, rain, snow, thunder, fog, wind, partly cloudy |
| HR icon | 22x22 | PNG | Heart shape, --color-heart-rate |
| Steps icon | 22x22 | PNG | Shoe/footprint, --color-steps |
| Battery icon (3 states) | 20x20 each | PNG | High (green), mid (yellow), low (red) |
| Calories icon | 18x18 | PNG | Flame, --color-calories |
| Distance icon | 18x18 | PNG | Route/pin, --color-distance |

**Total estimated asset size:** ~30-50KB (well within 500KB budget)

No background image needed — pure black AMOLED background rendered by default.

---

## 5. Design Rationale

### Why Concentric Rings?
- Proven pattern on circular displays (Garmin, Pixel Watch, Amazfit stock faces)
- Outer arcs provide progress visualization without consuming center space
- Center reserved for highest-priority data (time)
- Natural visual hierarchy: eyes scan center → outward

### Why Multi-color?
- Each metric instantly identifiable by color — no need to read labels
- AMOLED renders vibrant colors with zero power penalty vs white
- Color-coded battery provides urgency cues without reading numbers
- Outdoor visibility: color differentiation works better than size alone in bright light

### Why No Background Image?
- Pure black saves AMOLED power
- Maximum contrast for text readability in sunlight
- Simpler asset management, smaller package size
- Allows colored arcs and text to pop visually

### Why These Font Sizes?
- 56px time: readable at arm's length, even with peripheral vision
- 28px metrics: large enough for quick glance recognition
- 14px labels: small but readable at 320 PPI; only needed for first-time learning
- Research shows 48-64px optimal for primary data on 1.3-1.5" circular displays

---

## 6. GATE 2: Requirements Validation

Before proceeding to `/ipa:design`:

- [ ] SRD.md reviewed — feature list matches expectations
- [ ] UI layout (concentric rings) confirmed
- [ ] Color scheme (vibrant multi-color) confirmed
- [ ] AOD design approach approved (<10% pixel budget)
- [ ] No scope creep beyond 9 features (FR-01 to FR-09)

**Next:** `/ipa:design` to generate HTML mockups from this spec

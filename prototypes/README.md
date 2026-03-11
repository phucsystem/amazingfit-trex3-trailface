# TrailFace — HTML Prototypes

Production-ready HTML/CSS/JS prototypes for the TrailFace watch face (Amazfit T-Rex 3).

All screens are displayed inside a mock watch body wrapper simulating the T-Rex 3 hardware.

## Screen Index

| File | Screen | CJX Stage | Description |
|------|--------|-----------|-------------|
| `s01-main-watch-face.html` | S-01 Main Watch Face | cjx-usage | Full metrics display with concentric arcs |
| `s02-aod-watch-face.html` | S-02 AOD Watch Face | cjx-usage | Always-on display, time + steps only |

## FR Mapping

| FR | Feature | Screen(s) |
|----|---------|-----------|
| FR-01 | Digital time display | S-01, S-02 |
| FR-02 | Date and day of week | S-01 |
| FR-03 | Step count + progress arc | S-01 (arc + value), S-02 (value only) |
| FR-04 | Heart rate + arc | S-01 |
| FR-05 | Battery percentage | S-01 |
| FR-06 | Weather + temperature | S-01 |
| FR-07 | Calories burned | S-01 |
| FR-08 | Distance walked/run | S-01 |
| FR-09 | Always-on display (AOD) | S-02 |

## Files

| File | Purpose |
|------|---------|
| `styles.css` | Design tokens + watch wrapper styling |
| `components.css` | Reusable component classes |
| `interactions.js` | CJX entrance animations + arc animation + heart pulse |

## How to View

Open any `.html` file directly in a browser. Navigation links between screens are in the top-right corner.

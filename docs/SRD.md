# System Requirement Definition (SRD)

## 1. System Overview

**Project:** TrailFace — Information-dense outdoor watch face for Amazfit T-Rex 3
**Platform:** ZeppOS 3.x, Zeus CLI + JavaScript
**Display:** 480x480 circular AMOLED, 320 PPI, 2000 nits peak
**Goal:** Surface all critical outdoor/fitness metrics at a glance without menu navigation

### Context

Outdoor enthusiasts need quick access to time, weather, heart rate, steps, battery, and activity data while hiking, running, or climbing. Stock faces are either too minimal or poorly organized for bright-sunlight readability. TrailFace uses a concentric ring layout with vibrant per-metric color coding on a pure-black AMOLED background.

### Key Decisions

| ID | Decision | Chosen | Rationale |
|----|----------|--------|-----------|
| D-01 | Dev tool | Zeus CLI + JS | Full widget/sensor API control |
| D-02 | ZeppOS target | 3.0 (min 2.0) | T-Rex 3 native |
| D-03 | Time format | Digital HH:MM | Readable with gloves, in sunlight |
| D-04 | Layout | Concentric rings | Proven pattern for circular info-dense displays |
| D-05 | Update interval | 1 min (HR: 10s) | Battery vs freshness balance |
| D-06 | Color scheme | Multi-color on black | AMOLED efficient + instant metric identification |

---

## 2. Actors (User Roles)

| Role | Description | Primary Need |
|------|-------------|--------------|
| Outdoor Adventurer | Hikers, trail runners, climbers | All metrics visible at a glance mid-activity |
| Fitness Enthusiast | Daily step/HR trackers | Quick activity progress check |

---

## 3. Functional Requirements (FR-xx)

| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| FR-01 | Digital time display | P1 | Display current time in HH:MM format, large centered text (48-64px). Updates every minute. |
| FR-02 | Date and day of week | P1 | Display day name (abbreviated) + date below time. Format: "Tue, Mar 11". |
| FR-03 | Step count + progress arc | P1 | Numeric step count + outer arc showing progress toward 10,000 goal. Green color (#00ff88). |
| FR-04 | Heart rate (live) | P1 | Current HR in BPM with icon. Inner ring arc visualization. Red color (#ff5555). Updates every 10 seconds. |
| FR-05 | Battery percentage | P1 | Battery level with icon. Color-coded: green >50%, yellow 20-50%, red <20%. |
| FR-06 | Weather + temperature | P1 | Weather condition icon + temperature in Celsius. Blue color (#00b4ff). Data from Zepp app sync. Fallback: show "—" if unavailable. |
| FR-07 | Calories burned | P2 | Daily calorie count with icon. Orange color (#ff8c00). |
| FR-08 | Distance walked/run | P2 | Distance in km (1 decimal). Purple color (#b388ff). |
| FR-09 | Always-on display (AOD) | P2 | Minimal AOD showing time + step count only. <10% pixel illumination. White on black. |

---

## 4. Screen List (S-xx)

| ID | Screen Name | Description | Features |
|----|-------------|-------------|----------|
| S-01 | Main Watch Face | Primary display — concentric ring layout with all metrics | FR-01 to FR-08 |
| S-02 | AOD Watch Face | Always-on ambient display — minimal power consumption | FR-09 |

---

## 5. Entity List (E-xx)

| ID | Entity | Description | Key Fields | ZeppOS Source |
|----|--------|-------------|------------|---------------|
| E-01 | Time | System clock | hours, minutes, seconds, day, month, year, weekday | System time API |
| E-02 | Steps | Pedometer data | current_steps, target_steps (10000) | Step sensor |
| E-03 | HeartRate | Heart rate monitor | current_bpm | HR sensor |
| E-04 | Battery | Battery status | percentage (0-100) | Battery API |
| E-05 | Weather | Weather conditions | temperature_c, condition_code, icon | Zepp app sync |
| E-06 | Calories | Calorie tracker | daily_calories | Calorie sensor |
| E-07 | Distance | Distance tracker | daily_distance_km | Distance sensor |

---

## 6. Non-Functional Requirements

### Performance
- NFR-01: Watch face render in <500ms on wrist raise
- NFR-02: Total asset size <500KB (compressed PNGs)
- NFR-03: Memory usage within ZeppOS heap limit (~2-5MB)
- NFR-04: HR sensor polling at 10s intervals; all other data at 60s intervals

### Display
- NFR-05: All text readable at arm's length in direct sunlight (2000 nit AMOLED)
- NFR-06: AOD mode illuminates <10% of pixels
- NFR-07: Minimum font size 14px for labels, 22px for values
- NFR-08: 2px safe margin from circular edge

### Compatibility
- NFR-09: Target ZeppOS 3.0, minimum compatible 2.0
- NFR-10: Device: Amazfit T-Rex 3 (deviceSource: 10100032)
- NFR-11: Design width: 480px

### Reliability
- NFR-12: Graceful fallback when weather data unavailable (show "—")
- NFR-13: Handle HR sensor unavailable state (show "--" instead of 0)

---

## 7. Out of Scope

- GPS/navigation features
- Music controls
- Notification display
- Multi-device support
- Zepp app store publication (community share only)
- User-configurable settings page
- Compass heading
- Sunrise/sunset times

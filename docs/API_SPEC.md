# Interface Specification (API)

> **Note:** TrailFace is a ZeppOS watch face — no backend server. This document specifies the **ZeppOS Sensor APIs** consumed by the watch face to render data on screen.

## 1. API Matrix

| Sensor API | Entity (E-xx) | Feature (FR-xx) | Screen (S-xx) | Refresh |
|------------|----------------|------------------|----------------|---------|
| Time API | E-01 Time | FR-01, FR-02 | S-01, S-02 | 60s |
| Step Sensor | E-02 Steps | FR-03 | S-01, S-02 | 60s |
| HeartRate Sensor | E-03 HeartRate | FR-04 | S-01 | 10s |
| Battery API | E-04 Battery | FR-05 | S-01 | 60s |
| Weather API | E-05 Weather | FR-06 | S-01 | 60s |
| Calorie Sensor | E-06 Calories | FR-07 | S-01 | 60s |
| Distance Sensor | E-07 Distance | FR-08 | S-01 | 60s |
| Display Mode | — | FR-09 | S-01, S-02 | Event |

---

## 2. Sensor API Details

### 2.1 Time API (E-01 → FR-01, FR-02)

**Module:** `@zos/sensor` → `Time`

```javascript
import { Time } from '@zos/sensor'

const timeSensor = new Time()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `timeSensor.getHours()` | number | Current hour (0-23) | FR-01: HH display |
| `timeSensor.getMinutes()` | number | Current minute (0-59) | FR-01: MM display |
| `timeSensor.getDay()` | number | Day of month (1-31) | FR-02: date |
| `timeSensor.getMonth()` | number | Month (1-12) | FR-02: month name |
| `timeSensor.getWeekDay()` | number | Day of week (0=Sun, 6=Sat) | FR-02: day name |

**Refresh:** Register `timeSensor.onPerMinute(() => { ... })` callback.

**Formatting:**

```javascript
// FR-01: "14:30"
const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

// FR-02: "TUE, MAR 11"
const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const dateStr = `${dayNames[weekDay]}, ${monthNames[month - 1]} ${day}`
```

---

### 2.2 Step Sensor (E-02 → FR-03)

**Module:** `@zos/sensor` → `Step`

```javascript
import { Step } from '@zos/sensor'

const stepSensor = new Step()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `stepSensor.getCurrent()` | number | Current step count today | FR-03: value |
| `stepSensor.getTarget()` | number | Step goal (default 10,000) | FR-03: arc % |

**Arc Calculation:**

```javascript
const stepPercent = Math.min(currentSteps / targetSteps, 1.0)
// Arc fill = stepPercent * arcTotalLength
```

**Formatting:** Display with comma separator → `8,642`

**Fallback:** If sensor unavailable, display `0` with empty arc.

---

### 2.3 HeartRate Sensor (E-03 → FR-04)

**Module:** `@zos/sensor` → `HeartRate`

```javascript
import { HeartRate } from '@zos/sensor'

const heartRateSensor = new HeartRate()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `heartRateSensor.getCurrent()` | number | Current HR in BPM | FR-04: value |
| `heartRateSensor.getLast()` | number | Last valid reading | FR-04: fallback |

**Arc Calculation:**

```javascript
// Map HR 40-200 BPM to 0-100%
const hrPercent = Math.max(0, Math.min(1, (currentBpm - 40) / 160))
```

**Refresh:** Use `setInterval` at 10,000ms (10s).

**Fallback:** If `getCurrent()` returns 0, use `getLast()`. If both 0, display `--`.

---

### 2.4 Battery API (E-04 → FR-05)

**Module:** `@zos/sensor` → `Battery`

```javascript
import { Battery } from '@zos/sensor'

const batterySensor = new Battery()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `batterySensor.getCurrent()` | number | Battery level (0-100) | FR-05: value + color |

**Color Logic:**

```javascript
function getBatteryColor(percentage) {
  if (percentage > 50) return 0x00ff88  // --color-battery-high
  if (percentage > 20) return 0xffaa00  // --color-battery-mid
  return 0xff4444                        // --color-battery-low
}
```

**Formatting:** Display as `87%`

---

### 2.5 Weather API (E-05 → FR-06)

**Module:** `@zos/sensor` → `Weather`

```javascript
import { Weather } from '@zos/sensor'

const weatherSensor = new Weather()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `weatherSensor.getForecast()` | object | Current weather data | FR-06 |
| `.current.temperature.value` | number | Temperature in device unit | FR-06: value |
| `.current.weather.index` | number | Weather condition code | FR-06: icon |

**Weather Condition Codes → Icon Mapping:**

| Code | Condition | Icon Asset |
|------|-----------|------------|
| 0 | Sunny | `weather_sunny.png` |
| 1 | Cloudy | `weather_cloudy.png` |
| 2 | Overcast | `weather_overcast.png` |
| 3 | Rain | `weather_rain.png` |
| 4 | Snow | `weather_snow.png` |
| 5 | Thunderstorm | `weather_thunder.png` |
| 6 | Fog/Haze | `weather_fog.png` |
| 7 | Wind | `weather_wind.png` |

**Fallback:** If `getForecast()` returns null/undefined, display `—` for temperature and hide weather icon.

**Dependency:** Requires Zepp app Bluetooth connection for weather sync.

---

### 2.6 Calorie Sensor (E-06 → FR-07)

**Module:** `@zos/sensor` → `Calorie`

```javascript
import { Calorie } from '@zos/sensor'

const calorieSensor = new Calorie()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `calorieSensor.getCurrent()` | number | Daily calories burned (kcal) | FR-07: value |

**Formatting:** Display as integer → `420 cal`

---

### 2.7 Distance Sensor (E-07 → FR-08)

**Module:** `@zos/sensor` → `Distance`

```javascript
import { Distance } from '@zos/sensor'

const distanceSensor = new Distance()
```

**Properties:**

| Property | Type | Description | Used In |
|----------|------|-------------|---------|
| `distanceSensor.getCurrent()` | number | Daily distance in meters | FR-08: value |

**Formatting:** Convert meters to km, 1 decimal → `4.2 km`

```javascript
const distanceKm = (distanceMeters / 1000).toFixed(1)
```

---

### 2.8 Display Mode (FR-09: AOD)

**Module:** `@zos/ui` → `show_level`

**Mechanism:** ZeppOS uses `show_level` property on widgets to control AOD visibility.

| show_level | Behavior |
|------------|----------|
| 1 | Normal display only (hidden in AOD) |
| 2 | AOD only (hidden in normal) |
| 3 | Both normal and AOD |

**Implementation:**

```javascript
// Normal-only widgets (arcs, icons, secondary metrics)
createWidget(widget.ARC, { ..., show_level: 1 })

// AOD-only widgets (minimal time + steps)
createWidget(widget.TEXT, { ..., show_level: 2 })

// Shared widgets (time display shown in both)
createWidget(widget.TEXT, { ..., show_level: 3 })
```

---

## 3. Widget API Reference

### 3.1 createWidget

**Module:** `@zos/ui`

```javascript
import { createWidget, widget, align, text_style } from '@zos/ui'
```

**Widget Types Used:**

| Widget | Usage | FR |
|--------|-------|-----|
| `widget.TEXT` | Time, date, metric values, labels | FR-01 to FR-08 |
| `widget.IMG` | Weather icons, HR icon, battery icon | FR-03 to FR-06 |
| `widget.ARC` | Step progress ring, HR ring | FR-03, FR-04 |
| `widget.FILL_RECT` | Background fill | — |

### 3.2 TEXT Widget Properties

```javascript
createWidget(widget.TEXT, {
  x: 0,
  y: 150,
  w: 480,
  h: 80,
  text: '14:30',
  text_size: 80,
  color: 0xffffff,
  align_h: align.CENTER_H,
  show_level: 3
})
```

### 3.3 ARC Widget Properties

```javascript
createWidget(widget.ARC, {
  x: 10,
  y: 10,
  w: 460,
  h: 460,
  start_angle: 150,
  end_angle: 390,
  color: 0x00ff88,
  line_width: 12,
  show_level: 1
})
```

### 3.4 IMG Widget Properties

```javascript
createWidget(widget.IMG, {
  x: 140,
  y: 45,
  w: 28,
  h: 28,
  src: 'image/weather_sunny.png',
  show_level: 1
})
```

---

## 4. Data Flow

```
ZeppOS Sensor Layer          Watch Face Logic            UI Widgets
─────────────────          ──────────────────          ────────────
  Time sensor     ──60s──▶  formatTime()      ──────▶  TEXT (time)
                           formatDate()       ──────▶  TEXT (date)
  Step sensor     ──60s──▶  formatSteps()     ──────▶  TEXT (steps)
                           calcStepArc()      ──────▶  ARC (outer)
  HR sensor       ──10s──▶  formatHR()        ──────▶  TEXT (HR)
                           calcHRArc()        ──────▶  ARC (inner)
  Battery API     ──60s──▶  formatBattery()   ──────▶  TEXT (bat%)
                           getBatColor()      ──────▶  IMG (icon)
  Weather API     ──60s──▶  formatTemp()      ──────▶  TEXT (temp)
                           getWeatherIcon()   ──────▶  IMG (icon)
  Calorie sensor  ──60s──▶  formatCalories()  ──────▶  TEXT (cal)
  Distance sensor ──60s──▶  formatDistance()   ──────▶  TEXT (dist)

  Display mode    ─event─▶  show_level 1/2/3  ──────▶  All widgets
```

---

## 5. Error Handling

| Sensor | Error State | Fallback Display |
|--------|-------------|-----------------|
| Time | Never fails (system clock) | N/A |
| Steps | Sensor unavailable | Show `0`, empty arc |
| HeartRate | No reading / sensor off | Show `--`, empty arc |
| Battery | Never fails (system API) | N/A |
| Weather | No Bluetooth / no sync | Show `—` for temp, hide icon |
| Calories | Sensor unavailable | Show `0` |
| Distance | Sensor unavailable | Show `0.0` |

---

## 6. Permissions

Required in `app.json`:

```json
{
  "permissions": [
    "data:user.hdr.heart-rate",
    "data:user.hdr.steps",
    "data:user.hdr.calories",
    "data:user.hdr.distance",
    "device:os.battery",
    "device:os.weather"
  ]
}
```

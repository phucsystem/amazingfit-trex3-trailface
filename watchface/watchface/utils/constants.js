export const COLORS = {
  textPrimary: 0xffffff,
  textSecondary: 0xb0b0b0,
  steps: 0x00ff88,
  stepsLabel: 0x66ffaa,
  heartRate: 0xff5555,
  heartRateLabel: 0xff8888,
  weather: 0x00e5ff,
  batteryHigh: 0x00ff88,
  batteryMid: 0xffaa00,
  batteryLow: 0xff4444,
  calories: 0xffaa33,
  distance: 0xc9a8ff,
  arcTrackSteps: 0x1a2a1a,
  arcTrackHR: 0x2a1a1a,
  aodText: 0xffffff,
  aodDim: 0x666666,
}

export const ARC_CONFIG = {
  outerX: 12,
  outerY: 12,
  outerW: 456,
  outerH: 456,
  outerWidth: 12,
  innerX: 24,
  innerY: 24,
  innerW: 432,
  innerH: 432,
  innerWidth: 8,
  startAngle: 150,
  endAngle: 390,
  arcSpan: 240,
}

export const ZONE_A = {
  weatherIcon: { x: 140, y: 45, w: 28, h: 28 },
  temperature: { x: 172, y: 44, size: 22 },
  batteryIcon: { x: 280, y: 45, w: 20, h: 20 },
  batteryText: { x: 304, y: 44, size: 20 },
}

export const ZONE_B = {
  time: { x: 0, y: 150, w: 480, h: 80, size: 80 },
  date: { x: 0, y: 215, w: 480, h: 30, size: 17 },
}

export const ZONE_C = {
  hrIcon: { x: 148, y: 258, w: 22, h: 22 },
  hrValue: { x: 174, y: 258, w: 80, h: 32, size: 30 },
  hrUnit: { x: 220, y: 264, w: 40, h: 20, size: 13 },
  stepsIcon: { x: 148, y: 296, w: 22, h: 22 },
  stepsValue: { x: 174, y: 293, w: 100, h: 32, size: 30 },
  stepsLabel: { x: 264, y: 299, w: 50, h: 20, size: 13 },
}

export const ZONE_D = {
  caloriesIcon: { x: 128, y: 352, w: 18, h: 18 },
  caloriesValue: { x: 150, y: 350, w: 60, h: 28, size: 22 },
  caloriesUnit: { x: 190, y: 356, w: 30, h: 20, size: 12 },
  distanceIcon: { x: 272, y: 352, w: 18, h: 18 },
  distanceValue: { x: 294, y: 350, w: 60, h: 28, size: 22 },
  distanceUnit: { x: 330, y: 356, w: 30, h: 20, size: 12 },
}

export const AOD_LAYOUT = {
  steps: { x: 0, y: 270, w: 480, h: 30, size: 24 },
  stepsLabel: { x: 0, y: 300, w: 480, h: 20, size: 14 },
}

export const DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export const MONTH_NAMES = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

export const WEATHER_ICONS = [
  'image/weather_sunny.png',
  'image/weather_cloudy.png',
  'image/weather_overcast.png',
  'image/weather_rain.png',
  'image/weather_snow.png',
  'image/weather_thunder.png',
  'image/weather_fog.png',
  'image/weather_wind.png',
]

export const BATTERY_ICONS = {
  high: 'image/icon_battery_high.png',
  mid: 'image/icon_battery_mid.png',
  low: 'image/icon_battery_low.png',
}

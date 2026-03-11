import { DAY_NAMES, MONTH_NAMES, WEATHER_ICONS, COLORS, BATTERY_ICONS } from './constants'

export function formatTime(hours, minutes) {
  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  return `${hoursStr}:${minutesStr}`
}

export function formatDate(weekDay, month, day) {
  const dayName = DAY_NAMES[weekDay] || 'MON'
  const monthName = MONTH_NAMES[(month - 1)] || 'JAN'
  return `${dayName}, ${monthName} ${day}`
}

export function formatSteps(steps) {
  if (!steps || steps <= 0) return '0'
  return String(steps).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatHeartRate(current, last) {
  if (current > 0) return String(current)
  if (last > 0) return String(last)
  return '--'
}

export function formatBattery(percentage) {
  return `${Math.round(percentage)}%`
}

export function getBatteryColor(percentage) {
  if (percentage > 50) return COLORS.batteryHigh
  if (percentage > 20) return COLORS.batteryMid
  return COLORS.batteryLow
}

export function getBatteryIconPath(percentage) {
  if (percentage > 50) return BATTERY_ICONS.high
  if (percentage > 20) return BATTERY_ICONS.mid
  return BATTERY_ICONS.low
}

export function formatTemperature(tempValue) {
  if (tempValue === null || tempValue === undefined) return '---'
  return `${Math.round(tempValue)}°`
}

export function getWeatherIconPath(conditionCode) {
  if (conditionCode === null || conditionCode === undefined) return null
  if (conditionCode >= 0 && conditionCode < WEATHER_ICONS.length) {
    return WEATHER_ICONS[conditionCode]
  }
  return WEATHER_ICONS[1]
}

export function calcStepArcPercent(current, target) {
  if (!target || target <= 0) return 0
  return Math.min(current / target, 1.0)
}

export function calcHeartRateArcPercent(bpm) {
  if (!bpm || bpm <= 0) return 0
  return Math.max(0, Math.min(1, (bpm - 40) / 160))
}

export function formatCalories(calories) {
  return String(Math.round(calories || 0))
}

export function formatDistance(meters) {
  return (meters / 1000).toFixed(1)
}

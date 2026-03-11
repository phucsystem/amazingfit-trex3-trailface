import {
  initSensors,
  readTime,
  readSteps,
  readHeartRate,
  readBattery,
  readWeather,
  readCalories,
  readDistance,
  destroySensors,
} from './utils/sensors'

import {
  formatTime,
  formatDate,
  formatSteps,
  formatHeartRate,
  formatBattery,
  getBatteryColor,
  getBatteryIconPath,
  formatTemperature,
  getWeatherIconPath,
  calcStepArcPercent,
  calcHeartRateArcPercent,
  formatCalories,
  formatDistance,
} from './utils/formatters'

import { createTimeWidgets, updateTimeWidgets } from './widgets/time-widgets'
import { createStatusWidgets, updateStatusWidgets } from './widgets/status-widgets'
import { createMetricWidgets, updateHRValue, updateStepsValue } from './widgets/metric-widgets'
import { createArcWidgets, updateStepArc, updateHRArc } from './widgets/arc-widgets'
import { createSecondaryWidgets, updateSecondaryWidgets } from './widgets/secondary-widgets'
import { createAodWidgets, updateAodWidgets } from './widgets/aod-widgets'

let mainTimer = null
let hrTimer = null
let widgetRefs = {}

function updateAllWidgets() {
  const time = readTime()
  updateTimeWidgets(widgetRefs, formatTime(time.hours, time.minutes), formatDate(time.weekDay, time.month, time.day))

  const steps = readSteps()
  const stepsStr = formatSteps(steps.currentSteps)
  updateStepsValue(widgetRefs, stepsStr)
  updateStepArc(widgetRefs, calcStepArcPercent(steps.currentSteps, steps.targetSteps))
  updateAodWidgets(widgetRefs, stepsStr)

  updateHeartRateData()

  const battery = readBattery()
  const weather = readWeather()
  updateStatusWidgets(
    widgetRefs,
    { temperatureStr: formatTemperature(weather.temperature), weatherIconPath: getWeatherIconPath(weather.conditionCode) },
    { batteryStr: formatBattery(battery.percentage), batteryColor: getBatteryColor(battery.percentage), batteryIconPath: getBatteryIconPath(battery.percentage) },
  )

  const calories = readCalories()
  const distance = readDistance()
  updateSecondaryWidgets(widgetRefs, formatCalories(calories.dailyCalories), formatDistance(distance.dailyMeters))
}

function updateHeartRateData() {
  const heartRate = readHeartRate()
  const hrStr = formatHeartRate(heartRate.currentBpm, heartRate.lastBpm)
  const displayBpm = heartRate.currentBpm > 0 ? heartRate.currentBpm : heartRate.lastBpm
  const hrPercent = calcHeartRateArcPercent(displayBpm)

  updateHRValue(widgetRefs, hrStr)
  updateHRArc(widgetRefs, hrPercent)
}

WatchFace({
  onInit() {
    initSensors()
  },

  build() {
    Object.assign(widgetRefs, createArcWidgets())
    Object.assign(widgetRefs, createTimeWidgets())
    Object.assign(widgetRefs, createStatusWidgets())
    Object.assign(widgetRefs, createMetricWidgets())
    Object.assign(widgetRefs, createSecondaryWidgets())
    Object.assign(widgetRefs, createAodWidgets())

    updateAllWidgets()

    mainTimer = setInterval(updateAllWidgets, 60000)
    hrTimer = setInterval(updateHeartRateData, 10000)
  },

  onDestroy() {
    if (mainTimer) {
      clearInterval(mainTimer)
      mainTimer = null
    }
    if (hrTimer) {
      clearInterval(hrTimer)
      hrTimer = null
    }
    destroySensors()
  },
})

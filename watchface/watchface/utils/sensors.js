import { Time, Step, HeartRate, Battery, Weather, Calorie, Distance } from '@zos/sensor'

let timeSensor = null
let stepSensor = null
let heartRateSensor = null
let batterySensor = null
let weatherSensor = null
let calorieSensor = null
let distanceSensor = null

export function initSensors() {
  timeSensor = new Time()
  stepSensor = new Step()
  heartRateSensor = new HeartRate()
  batterySensor = new Battery()
  weatherSensor = new Weather()
  calorieSensor = new Calorie()
  distanceSensor = new Distance()
}

export function readTime() {
  return {
    hours: timeSensor.getHours(),
    minutes: timeSensor.getMinutes(),
    day: timeSensor.getDay(),
    month: timeSensor.getMonth(),
    weekDay: timeSensor.getWeekDay(),
  }
}

export function readSteps() {
  return {
    currentSteps: stepSensor.getCurrent() || 0,
    targetSteps: stepSensor.getTarget() || 10000,
  }
}

export function readHeartRate() {
  const current = heartRateSensor.getCurrent() || 0
  const last = heartRateSensor.getLast() || 0
  return { currentBpm: current, lastBpm: last }
}

export function readBattery() {
  return { percentage: batterySensor.getCurrent() || 0 }
}

export function readWeather() {
  try {
    const forecastData = weatherSensor.getForecastWeather()
    if (!forecastData || !forecastData.forecastData || !forecastData.forecastData.data || !forecastData.forecastData.data.length) {
      return { available: false, temperature: null, conditionCode: null }
    }
    const today = forecastData.forecastData.data[0]
    const temperature = (today.high !== undefined && today.low !== undefined)
      ? Math.round((today.high + today.low) / 2)
      : null
    const conditionCode = today.index !== undefined ? today.index : null
    return { available: true, temperature, conditionCode }
  } catch (error) {
    return { available: false, temperature: null, conditionCode: null }
  }
}

export function readCalories() {
  return { dailyCalories: calorieSensor.getCurrent() || 0 }
}

export function readDistance() {
  return { dailyMeters: distanceSensor.getCurrent() || 0 }
}

export function destroySensors() {
  timeSensor = null
  stepSensor = null
  heartRateSensor = null
  batterySensor = null
  weatherSensor = null
  calorieSensor = null
  distanceSensor = null
}

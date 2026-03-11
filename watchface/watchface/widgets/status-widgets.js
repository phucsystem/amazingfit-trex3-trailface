import { createWidget, widget, align, prop } from '@zos/ui'
import { COLORS, ZONE_A } from '../utils/constants'

export function createStatusWidgets() {
  const weatherIcon = createWidget(widget.IMG, {
    x: ZONE_A.weatherIcon.x,
    y: ZONE_A.weatherIcon.y,
    w: ZONE_A.weatherIcon.w,
    h: ZONE_A.weatherIcon.h,
    src: 'image/weather_sunny.png',
    show_level: 1,
  })

  const temperatureText = createWidget(widget.TEXT, {
    x: ZONE_A.temperature.x,
    y: ZONE_A.temperature.y,
    w: 60,
    h: 28,
    text: '---',
    text_size: ZONE_A.temperature.size,
    color: COLORS.weather,
    show_level: 1,
  })

  const batteryIcon = createWidget(widget.IMG, {
    x: ZONE_A.batteryIcon.x,
    y: ZONE_A.batteryIcon.y,
    w: ZONE_A.batteryIcon.w,
    h: ZONE_A.batteryIcon.h,
    src: 'image/icon_battery_high.png',
    show_level: 1,
  })

  const batteryText = createWidget(widget.TEXT, {
    x: ZONE_A.batteryText.x,
    y: ZONE_A.batteryText.y,
    w: 60,
    h: 28,
    text: '0%',
    text_size: ZONE_A.batteryText.size,
    color: COLORS.batteryHigh,
    show_level: 1,
  })

  return { weatherIcon, temperatureText, batteryIcon, batteryText }
}

export function updateStatusWidgets(refs, weatherData, batteryData) {
  const { temperatureStr, weatherIconPath } = weatherData
  const { batteryStr, batteryColor, batteryIconPath } = batteryData

  refs.temperatureText.setProperty(prop.MORE, { text: temperatureStr })
  if (weatherIconPath) {
    refs.weatherIcon.setProperty(prop.MORE, { src: weatherIconPath })
  }

  refs.batteryText.setProperty(prop.MORE, { text: batteryStr, color: batteryColor })
  refs.batteryIcon.setProperty(prop.MORE, { src: batteryIconPath })
}

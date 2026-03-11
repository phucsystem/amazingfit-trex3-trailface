import { createWidget, widget, prop } from '@zos/ui'
import { COLORS, ZONE_D } from '../utils/constants'

export function createSecondaryWidgets() {
  createWidget(widget.IMG, {
    x: ZONE_D.caloriesIcon.x,
    y: ZONE_D.caloriesIcon.y,
    w: ZONE_D.caloriesIcon.w,
    h: ZONE_D.caloriesIcon.h,
    src: 'image/icon_calories.png',
    show_level: 1,
  })

  const caloriesText = createWidget(widget.TEXT, {
    x: ZONE_D.caloriesValue.x,
    y: ZONE_D.caloriesValue.y,
    w: ZONE_D.caloriesValue.w,
    h: ZONE_D.caloriesValue.h,
    text: '0',
    text_size: ZONE_D.caloriesValue.size,
    color: COLORS.calories,
    show_level: 1,
  })

  createWidget(widget.TEXT, {
    x: ZONE_D.caloriesUnit.x,
    y: ZONE_D.caloriesUnit.y,
    w: ZONE_D.caloriesUnit.w,
    h: ZONE_D.caloriesUnit.h,
    text: 'cal',
    text_size: ZONE_D.caloriesUnit.size,
    color: COLORS.calories,
    show_level: 1,
  })

  createWidget(widget.IMG, {
    x: ZONE_D.distanceIcon.x,
    y: ZONE_D.distanceIcon.y,
    w: ZONE_D.distanceIcon.w,
    h: ZONE_D.distanceIcon.h,
    src: 'image/icon_distance.png',
    show_level: 1,
  })

  const distanceText = createWidget(widget.TEXT, {
    x: ZONE_D.distanceValue.x,
    y: ZONE_D.distanceValue.y,
    w: ZONE_D.distanceValue.w,
    h: ZONE_D.distanceValue.h,
    text: '0.0',
    text_size: ZONE_D.distanceValue.size,
    color: COLORS.distance,
    show_level: 1,
  })

  createWidget(widget.TEXT, {
    x: ZONE_D.distanceUnit.x,
    y: ZONE_D.distanceUnit.y,
    w: ZONE_D.distanceUnit.w,
    h: ZONE_D.distanceUnit.h,
    text: 'km',
    text_size: ZONE_D.distanceUnit.size,
    color: COLORS.distance,
    show_level: 1,
  })

  return { caloriesText, distanceText }
}

export function updateSecondaryWidgets(refs, caloriesStr, distanceStr) {
  refs.caloriesText.setProperty(prop.MORE, { text: caloriesStr })
  refs.distanceText.setProperty(prop.MORE, { text: distanceStr })
}

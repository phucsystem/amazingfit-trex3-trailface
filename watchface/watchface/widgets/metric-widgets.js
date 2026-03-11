import { createWidget, widget, align, prop } from '@zos/ui'
import { COLORS, ZONE_C } from '../utils/constants'

export function createMetricWidgets() {
  const hrIcon = createWidget(widget.IMG, {
    x: ZONE_C.hrIcon.x,
    y: ZONE_C.hrIcon.y,
    w: ZONE_C.hrIcon.w,
    h: ZONE_C.hrIcon.h,
    src: 'image/icon_heart.png',
    show_level: 1,
  })

  const hrValueText = createWidget(widget.TEXT, {
    x: ZONE_C.hrValue.x,
    y: ZONE_C.hrValue.y,
    w: ZONE_C.hrValue.w,
    h: ZONE_C.hrValue.h,
    text: '--',
    text_size: ZONE_C.hrValue.size,
    color: COLORS.heartRate,
    show_level: 1,
  })

  const hrUnitText = createWidget(widget.TEXT, {
    x: ZONE_C.hrUnit.x,
    y: ZONE_C.hrUnit.y,
    w: ZONE_C.hrUnit.w,
    h: ZONE_C.hrUnit.h,
    text: 'bpm',
    text_size: ZONE_C.hrUnit.size,
    color: COLORS.heartRateLabel,
    show_level: 1,
  })

  const stepsIcon = createWidget(widget.IMG, {
    x: ZONE_C.stepsIcon.x,
    y: ZONE_C.stepsIcon.y,
    w: ZONE_C.stepsIcon.w,
    h: ZONE_C.stepsIcon.h,
    src: 'image/icon_steps.png',
    show_level: 1,
  })

  const stepsValueText = createWidget(widget.TEXT, {
    x: ZONE_C.stepsValue.x,
    y: ZONE_C.stepsValue.y,
    w: ZONE_C.stepsValue.w,
    h: ZONE_C.stepsValue.h,
    text: '0',
    text_size: ZONE_C.stepsValue.size,
    color: COLORS.steps,
    show_level: 1,
  })

  const stepsLabelText = createWidget(widget.TEXT, {
    x: ZONE_C.stepsLabel.x,
    y: ZONE_C.stepsLabel.y,
    w: ZONE_C.stepsLabel.w,
    h: ZONE_C.stepsLabel.h,
    text: 'steps',
    text_size: ZONE_C.stepsLabel.size,
    color: COLORS.stepsLabel,
    show_level: 1,
  })

  return { hrIcon, hrValueText, hrUnitText, stepsIcon, stepsValueText, stepsLabelText }
}

export function updateHRValue(refs, hrStr) {
  refs.hrValueText.setProperty(prop.MORE, { text: hrStr })
}

export function updateStepsValue(refs, stepsStr) {
  refs.stepsValueText.setProperty(prop.MORE, { text: stepsStr })
}

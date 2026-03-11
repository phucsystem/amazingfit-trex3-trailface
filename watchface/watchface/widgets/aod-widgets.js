import { createWidget, widget, align, prop } from '@zos/ui'
import { COLORS, AOD_LAYOUT } from '../utils/constants'

export function createAodWidgets() {
  const aodStepsText = createWidget(widget.TEXT, {
    x: AOD_LAYOUT.steps.x,
    y: AOD_LAYOUT.steps.y,
    w: AOD_LAYOUT.steps.w,
    h: AOD_LAYOUT.steps.h,
    text: '0',
    text_size: AOD_LAYOUT.steps.size,
    color: COLORS.aodDim,
    align_h: align.CENTER_H,
    show_level: 2,
  })

  createWidget(widget.TEXT, {
    x: AOD_LAYOUT.stepsLabel.x,
    y: AOD_LAYOUT.stepsLabel.y,
    w: AOD_LAYOUT.stepsLabel.w,
    h: AOD_LAYOUT.stepsLabel.h,
    text: 'STEPS',
    text_size: AOD_LAYOUT.stepsLabel.size,
    color: COLORS.aodDim,
    align_h: align.CENTER_H,
    show_level: 2,
  })

  return { aodStepsText }
}

export function updateAodWidgets(refs, stepsStr) {
  refs.aodStepsText.setProperty(prop.MORE, { text: stepsStr })
}

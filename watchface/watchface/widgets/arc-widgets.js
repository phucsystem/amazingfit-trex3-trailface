import { createWidget, widget, prop } from '@zos/ui'
import { COLORS, ARC_CONFIG } from '../utils/constants'

export function createArcWidgets() {
  // Outer step arc — track (dark background)
  createWidget(widget.ARC, {
    x: ARC_CONFIG.outerX,
    y: ARC_CONFIG.outerY,
    w: ARC_CONFIG.outerW,
    h: ARC_CONFIG.outerH,
    start_angle: ARC_CONFIG.startAngle,
    end_angle: ARC_CONFIG.endAngle,
    color: COLORS.arcTrackSteps,
    line_width: ARC_CONFIG.outerWidth,
    show_level: 1,
  })

  // Outer step arc — fill (green, dynamic)
  const stepArcFill = createWidget(widget.ARC, {
    x: ARC_CONFIG.outerX,
    y: ARC_CONFIG.outerY,
    w: ARC_CONFIG.outerW,
    h: ARC_CONFIG.outerH,
    start_angle: ARC_CONFIG.startAngle,
    end_angle: ARC_CONFIG.startAngle,
    color: COLORS.steps,
    line_width: ARC_CONFIG.outerWidth,
    show_level: 1,
  })

  // Inner HR arc — track (dark background)
  createWidget(widget.ARC, {
    x: ARC_CONFIG.innerX,
    y: ARC_CONFIG.innerY,
    w: ARC_CONFIG.innerW,
    h: ARC_CONFIG.innerH,
    start_angle: ARC_CONFIG.startAngle,
    end_angle: ARC_CONFIG.endAngle,
    color: COLORS.arcTrackHR,
    line_width: ARC_CONFIG.innerWidth,
    show_level: 1,
  })

  // Inner HR arc — fill (red, dynamic)
  const hrArcFill = createWidget(widget.ARC, {
    x: ARC_CONFIG.innerX,
    y: ARC_CONFIG.innerY,
    w: ARC_CONFIG.innerW,
    h: ARC_CONFIG.innerH,
    start_angle: ARC_CONFIG.startAngle,
    end_angle: ARC_CONFIG.startAngle,
    color: COLORS.heartRate,
    line_width: ARC_CONFIG.innerWidth,
    show_level: 1,
  })

  return { stepArcFill, hrArcFill }
}

export function updateStepArc(refs, stepPercent) {
  const fillAngle = ARC_CONFIG.startAngle + (stepPercent * ARC_CONFIG.arcSpan)
  refs.stepArcFill.setProperty(prop.MORE, {
    start_angle: ARC_CONFIG.startAngle,
    end_angle: fillAngle,
  })
}

export function updateHRArc(refs, hrPercent) {
  const fillAngle = ARC_CONFIG.startAngle + (hrPercent * ARC_CONFIG.arcSpan)
  refs.hrArcFill.setProperty(prop.MORE, {
    start_angle: ARC_CONFIG.startAngle,
    end_angle: fillAngle,
  })
}

import { createWidget, widget, align, prop } from '@zos/ui'
import { COLORS, ZONE_B } from '../utils/constants'

export function createTimeWidgets() {
  const timeText = createWidget(widget.TEXT, {
    x: ZONE_B.time.x,
    y: ZONE_B.time.y,
    w: ZONE_B.time.w,
    h: ZONE_B.time.h,
    text: '00:00',
    text_size: ZONE_B.time.size,
    color: COLORS.textPrimary,
    align_h: align.CENTER_H,
    show_level: 3,
  })

  const dateText = createWidget(widget.TEXT, {
    x: ZONE_B.date.x,
    y: ZONE_B.date.y,
    w: ZONE_B.date.w,
    h: ZONE_B.date.h,
    text: '',
    text_size: ZONE_B.date.size,
    color: COLORS.textSecondary,
    align_h: align.CENTER_H,
    show_level: 1,
  })

  return { timeText, dateText }
}

export function updateTimeWidgets(refs, timeStr, dateStr) {
  refs.timeText.setProperty(prop.MORE, { text: timeStr })
  refs.dateText.setProperty(prop.MORE, { text: dateStr })
}

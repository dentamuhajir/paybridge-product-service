import pino from 'pino'
import { context, trace } from '@opentelemetry/api'

export const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label }
    },
  },
  mixin() {
    const span = trace.getSpan(context.active())
    if (!span) return {}

    const ctx = span.spanContext()

    return {
      trace_id: ctx.traceId,
      span_id: ctx.spanId,
    }
  },
})

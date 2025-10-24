export type Severity =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

export const textSeverityClasses: Record<Severity, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  secondary: 'text-secondary',
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning',
  info: 'text-info',
}

export const bgSeverityClasses: Record<Severity, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  secondary: 'bg-secondary',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
}

export const hoverSeverityClasses: Record<Severity, string> = {
  primary: 'hover:bg-primary-hover',
  accent: 'hover:bg-accent-hover',
  secondary: 'hover:bg-secondary-hover',
  success: 'hover:bg-success-hover',
  danger: 'hover:bg-danger-hover',
  warning: 'hover:bg-warning-hover',
  info: 'hover:bg-info-hover',
}

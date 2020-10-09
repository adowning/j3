import Color from 'color'
import { WorkorderPriority, WorkorderStatus } from '@/types/workorder'

export const tuneColor = {
  darken: (colorValue: string, amount: number) =>
    Color(colorValue)
      .darken(amount)
      .string(),
  lighten: (colorValue: string, amount: number) =>
    Color(colorValue)
      .lighten(amount)
      .string()
}

export const avatarColors = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA'
]

export const buttonVariants = {
  primary: '#0052cc',
  success: '#0B875B',
  danger: '#E13C3C',
  warning: '#F89C1C',
  info: '#0fb9b1',
  secondary: '#F4F5F7'
}

export const workorderStatusVariants = {
  [WorkorderStatus.WAITING]: 'secondary',
  [WorkorderStatus.NOTIFIED]: 'success',
  [WorkorderStatus.COMPLETED]: 'secondary',
  [WorkorderStatus.APPROVED]: 'primary'
}

export const workorderPriorityColors = {
  [WorkorderPriority.HIGHEST]: '#CD1317',
  [WorkorderPriority.HIGH]: '#E9494A',
  [WorkorderPriority.MEDIUM]: '#E97F33',
  [WorkorderPriority.LOW]: '#2D8738',
  [WorkorderPriority.LOWEST]: '#57A55A'
}

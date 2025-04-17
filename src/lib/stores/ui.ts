// src/lib/stores/ui.ts
import { writable } from 'svelte/store'

export type Controlador =
  | 'asistente'
  | 'control-menu'
  | 'control-mesas'
  | 'control-pago'
  | null

export const controladorActual = writable<Controlador>('asistente')

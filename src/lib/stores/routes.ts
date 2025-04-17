// src\lib\stores\routes.ts

import { writable } from 'svelte/store'

export type Zona =
  | 'entrada'
  | 'menu'
  | 'lounge'
  | 'mesas'
  | 'cocina'
  | 'pago'

export const zonaActual = writable<Zona>('entrada')

export const estadoUsuario = writable({
  hizoPedido: false,
  pedidoConfirmado: false
})

export function irA(zona: Zona) {
  estadoUsuario.update((estado) => {
    zonaActual.update((actual) => {
      if (zona === 'mesas' && !estado.hizoPedido) {
        console.warn('No puedes ir a mesas sin hacer un pedido.')
        return actual
      }
      if (zona === 'pago' && !estado.pedidoConfirmado) {
        console.warn('No puedes ir a pago sin confirmar el pedido.')
        return actual
      }
      return zona
    })
    return estado
  })
}

export type Paso = {
  imagen: string
  texto: string
  animacion?: string
}

export type Opcion = {
  label: string
  value: string
}

export type Secuencia = {
  pasos: {
    imagen: string
    texto: string
    animacion?: string
  }[]
  opciones?: {
    label: string
    value: string
  }[]
  redireccion?: string // ← NUEVO: navegación automática al finalizar
}


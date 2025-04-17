// src/routes/restaurante/[slug]/+page.ts

import type { PageLoad } from './$types'

type Paso = {
  imagen: string
  texto: string
  animacion?: string
}
type Opcion = {
  label: string
  value: string
}
type Secuencia = {
  pasos: Paso[]
  opciones?: Opcion[]
  redireccion?: string // ← nuevo
}
type Restaurante = {
  nombre: string
  descripcion: string
  imagenDestacada: string
  secuenciaInicial: Secuencia
}

const restaurantes: Record<string, Restaurante> = {
  'mi-cantina': {
    nombre: 'La Cantina Bar',
    descripcion: 'Comida tradicional con un toque especial',
    imagenDestacada: '/cantina.webp',
    secuenciaInicial: {
      pasos: [
        {
          imagen: 'anfitrion-bienvenida',
          texto: '¡Hola! Bienvenidos a La Cantina Bar, un lugar donde la tradición se encuentra con el sabor.'
        },
        {
          imagen: 'anfitrion-sonriente',
          texto: 'Aquí puedes explorar nuestro menú, relajarte en el lounge o preguntarme lo que necesites.'
        },
        {
          imagen: 'anfitrion-explicacion',
          texto: '¿Con qué te gustaría empezar hoy?'
        }
      ],
      opciones: [
        { label: 'Ver menú', value: 'ir:menu' },
        { label: 'Ir al lounge', value: 'ir:lounge' },
        { label: 'Hacer una pregunta', value: 'escribir' }
      ]
    }
  }
}


export const load: PageLoad = async ({ params }) => {
  const restaurante = restaurantes[params.slug]
  if (!restaurante) {
    return { restaurante: null }
  }
  return { restaurante }
}

export type PageData = {
  restaurante: Restaurante | null
}

export type { Restaurante }

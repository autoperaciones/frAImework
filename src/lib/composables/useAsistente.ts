// src/lib/composables/useAsistente.ts

import { writable, get } from 'svelte/store'
import { tick } from 'svelte'
import { gsap } from 'gsap'
import { irA } from '$lib/stores/routes'
import type { Zona, Secuencia, Paso, Opcion } from '$lib/stores/routes'

export function useAsistente(
  secuencia: Secuencia,
  imagenes: Record<string, string>,
  onFinalizado?: () => void,
  onOpcionSeleccionada?: (value: string) => void
) {
  const pasoActual = writable(0)
  const textoActual = writable('')
  const escribiendo = writable(false)
  const inicioCompletado = writable(false)
  const mostrandoInput = writable(false)
  const preguntaUsuario = writable('')
  const modoPregunta = writable(false)

  const pasosActivos = writable(secuencia.pasos)
  let pasosOriginales: Paso[] = secuencia.pasos
  let usandoTemporales = false

  let typingCancelado = false
  let textoContainer: HTMLElement
  let imagenElemento: HTMLElement

  function setRefs(textoRef: HTMLElement, imagenRef: HTMLElement) {
    textoContainer = textoRef
    imagenElemento = imagenRef
  }

  function hayMasPasos(index: number, lista = get(pasosActivos)) {
    return index < lista.length - 1
  }

  async function iniciarSecuencia() {
    const index = get(pasoActual)
    const lista = get(pasosActivos)

    if (index >= lista.length) {
      if (usandoTemporales) {
        restaurarPasosOriginales()
        return
      }

      // Si se terminó la secuencia y hay redireccionamiento
      if (secuencia.redireccion) {
        irA(secuencia.redireccion as Zona)
      }

      onFinalizado?.()
      return
    }

    const paso = lista[index]
    escribiendo.set(true)
    textoActual.set('')
    await tick()
    inicioCompletado.set(true)

    if (textoContainer && imagenElemento) {
      gsap.fromTo(textoContainer, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 })
      gsap.fromTo(imagenElemento, { opacity: 0 }, { opacity: 1, duration: 1 })
    }

    await escribirTexto(paso.texto)
    escribiendo.set(false)
  }

  async function escribirTexto(texto: string) {
    textoActual.set('')
    typingCancelado = false
    let acumulado = ''

    for (let i = 0; i < texto.length; i++) {
      if (typingCancelado) break
      acumulado += texto[i]
      textoActual.set(acumulado)
      await esperar(40)
    }

    textoActual.set(texto)
  }

  function manejarClick() {
    const index = get(pasoActual)
    const lista = get(pasosActivos)

    if (index === lista.length - 1 && secuencia.opciones?.length) return

    const paso = lista[index]
    if (get(escribiendo)) {
      typingCancelado = true
      textoActual.set(paso.texto)
      escribiendo.set(false)
    } else {
      pasoActual.set(index + 1)
      iniciarSecuencia()
    }
  }

  function seleccionarOpcion(opcion: Opcion) {
    if (opcion.value === 'escribir') {
      setPasosTemporales([
        {
          imagen: 'anfitrion-pregunta',
          texto: 'Por supuesto, ¿qué deseas preguntarme?'
        }
      ])
      mostrandoInput.set(true)
      modoPregunta.set(true)
      return
    }

    if (opcion.value.startsWith('ir:')) {
      const destino = opcion.value.split(':')[1]
      irA(destino as Zona)
    } else {
      onOpcionSeleccionada?.(opcion.value)
    }
  }

  function enviarPregunta() {
    const pregunta = get(preguntaUsuario).trim()
    if (pregunta) {
      console.log('Pregunta del usuario:', pregunta)
      preguntaUsuario.set('')
      mostrandoInput.set(false)
      modoPregunta.set(false)

      setPasosTemporales([
        {
          imagen: 'anfitrion-sonriente',
          texto: 'Gracias por tu pregunta. Enseguida te responderé.'
        }
      ])
    }
  }

  function setPasosTemporales(nuevos: Paso[]) {
    pasosOriginales = get(pasosActivos)
    pasosActivos.set(nuevos)
    pasoActual.set(0)
    usandoTemporales = true
    iniciarSecuencia()
  }

  function restaurarPasosOriginales() {
    pasosActivos.set(pasosOriginales)
    pasoActual.set(0)
    usandoTemporales = false
    iniciarSecuencia()
  }

  function esperar(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  return {
    pasoActual,
    textoActual,
    escribiendo,
    inicioCompletado,
    setRefs,
    iniciarSecuencia,
    manejarClick,
    seleccionarOpcion,
    mostrandoInput,
    preguntaUsuario,
    enviarPregunta,
    modoPregunta,
    setPasosTemporales,
    restaurarPasosOriginales
  }
}

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { gsap } from 'gsap'

  import meseroInvitacion from '$lib/assets/images/mesero-invitacion.webp'
  import meseroAlegre from '$lib/assets/images/mesero-alegre.webp'
  import meseroPregunta from '$lib/assets/images/mesero-pregunta.webp'
  import fondoCantina from '$lib/assets/images/cantina2.webp'

  // Mapa de imágenes por nombre
  const imagenes: Record<string, string> = {
    'mesero-invitacion': meseroInvitacion,
    'mesero-alegre': meseroAlegre,
    'mesero-pregunta': meseroPregunta
  }

  // Props que llegan desde el padre
  export let pasos: { imagen: string; texto: string; animacion?: string }[] = []
  export let opciones: { label: string; value: string }[] = []
  export let onFinalizado: () => void
  export let onOpcionSeleccionada: (value: string) => void

  // Elementos del DOM
  let container: HTMLElement | null = null
  let textoContainer: HTMLElement | null = null
  let imagenMesero: HTMLElement | null = null

  // Estado del asistente
  let imagenActual = ''
  let textoActual = ''
  let escribiendo = false
  let pasoActual = 0
  let typingCancelado = false
  let inicioCompletado = false

  // Verifica si hay más pasos disponibles
  function hayMasPasos() {
    return pasoActual < pasos.length - 1
  }

  // Al montar el componente, inicia la animación del contenedor
  onMount(async () => {
    await tick()
    if (container) {
      gsap.set(container, { opacity: 0 })
      gsap.to(container, {
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => { void iniciarSecuencia() }
      })
    }
  })

  // Muestra paso a paso los mensajes
  async function iniciarSecuencia() {
    if (pasoActual >= pasos.length) {
      onFinalizado?.()
      return
    }

    const paso = pasos[pasoActual]
    imagenActual = imagenes[paso.imagen] || ''
    textoActual = ''
    escribiendo = true
    await tick()

    if (!inicioCompletado) inicioCompletado = true

    gsap.fromTo(textoContainer, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 })
    gsap.fromTo(imagenMesero, { opacity: 0 }, { opacity: 1, duration: 1 })

    await escribirTexto(paso.texto)
    escribiendo = false

    if (!hayMasPasos()) {
      onFinalizado?.()
    }
  }

  // Simula el efecto de "typing"
  async function escribirTexto(texto: string) {
    textoActual = ''
    typingCancelado = false
    for (let i = 0; i < texto.length; i++) {
      if (typingCancelado) break
      textoActual += texto[i]
      await esperar(40)
    }
    textoActual = texto
  }

  // Al hacer clic: acelerar o avanzar al siguiente paso
  function manejarClick() {
    const paso = pasos[pasoActual]
    if (escribiendo) {
      typingCancelado = true
      textoActual = paso.texto
      escribiendo = false
    } else {
      pasoActual++
      iniciarSecuencia()
    }
  }

  // Manejador de opciones (selección del usuario)
  function seleccionarOpcion(opcion: { label: string; value: string }) {
    onOpcionSeleccionada?.(opcion.value)
  }

  // Espera asincrónica
  function esperar(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
</script>

<!-- CONTENIDO -->

<div bind:this={container} class="fixed inset-0 flex flex-col justify-end m-0 p-6 z-50 overflow-hidden">
  <!-- Fondo -->
  <img src={fondoCantina} alt="Fondo Cantina" class="absolute inset-0 w-screen h-screen object-cover -z-10" />
  
  <!-- Opciones del usuario -->
  {#if !escribiendo && pasoActual === pasos.length - 1 && opciones.length > 0}
    <div class="flex justify-center mt-4 gap-4 flex-wrap">
      {#each opciones as opcion}
        <button
          class="w-full sm:w-auto my-3 py-4 px-6 
                bg-gradient-to-b from-red-50 to-white bg-opacity-100
                border-4 border-gray-600 rounded-xl shadow-md 
                text-lg sm:text-xl font-semibold text-gray-800 
                hover:bg-red-100 transition"
          on:click={() => seleccionarOpcion(opcion)}
        >
          {opcion.label}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Mesero -->
  <div class="flex justify-center items-end h-[40%] sm:h-[45%] lg:h-[55%]">
    {#if imagenActual}
      <img bind:this={imagenMesero} src={imagenActual} alt="Mesero IA" class="object-contain h-full" />
    {/if}
  </div>

  <!-- Cuadro de diálogo -->
  <button on:click={manejarClick}
    class="flex relative h-[40%] sm:h-[35%] lg:h-[25%] w-3xs sm:w-md lg:w-xl mx-auto
           bg-gradient-to-b from-red-50 to-white bg-opacity-100
           shadow-lg rounded-xl border-6 border-gray-600 pt-5 px-4 sm:px-4 lg:px-6 z-20 text-left">
    <div bind:this={textoContainer} class="flex self-start items-center text-center max-w-2xl w-full">
      <p class="text-lg sm:text-2xl lg:text-3xl text-gray-800 font-semibold leading-snug w-full">
        {textoActual}
      </p>
    </div>

    <!-- Indicador de interacción -->
    <div class="absolute bottom-3 right-4 text-xl sm:text-2xl lg:text-3xl text-blue-800 pointer-events-none">
      {#if inicioCompletado}
        {#if escribiendo}
          <span class="animate-pulse block">...</span>
        {:else if hayMasPasos()}
          <span class="animate-bounce block">➤</span>
        {/if}
      {/if}
    </div>
  </button>

</div>

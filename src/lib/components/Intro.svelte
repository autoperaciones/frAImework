<script lang="ts">
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import { gsap } from 'gsap'

  // Importamos la imagen del fondo como recurso
  import cantinaImage from '$lib/assets/images/cantina.webp'

  const dispatch = createEventDispatcher()

  let container: HTMLElement
  let fondo: HTMLElement
  let logo: HTMLElement
  let restaurante: HTMLElement

  onMount(async () => {
    await tick()

    const tl = gsap.timeline({
      onComplete: () => {
        dispatch('introFinished')
      }
    })

    // Fondo que entra con escala y opacidad
    tl.from(fondo, {
      scale: 0.8,
      opacity: 0,
      duration: 2.5,
      ease: 'power4.out'
    })

    // Nombre del restaurante
    tl.from(logo, {
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=1')

    // Subtítulo animado
    tl.from(restaurante, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.8')

    // Desvanecer toda la intro al finalizar
    tl.to(container, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '+=0.5')
  })
</script>

<!-- Contenedor general de la intro -->
<div bind:this={container} class="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
  
  <!-- Imagen de fondo como etiqueta <img> -->
  <img
    bind:this={fondo}
    src={cantinaImage}
    alt="Fondo Cantina"
    class="absolute inset-0 w-full h-full object-cover"
  />

  <!-- Contenido de la intro -->
  <div class="relative flex flex-col items-center justify-center z-10">
    
    <!-- Nombre del restaurante -->
    <div bind:this={logo} class="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg text-center">
      LA CANTINA
    </div>
    
    <!-- Subtítulo -->
    <div bind:this={restaurante} class="text-lg sm:text-xl lg:text-2xl text-white drop-shadow-md text-center">
      Rstaurante y Bar
    </div>
  
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import { gsap } from 'gsap'

  const dispatch = createEventDispatcher()

  let container: HTMLElement
  let logo: HTMLElement
  let restaurante: HTMLElement
  let puerta: HTMLElement

  onMount(async () => {
    await tick()

    const tl = gsap.timeline({
      onComplete: () => {
        dispatch('introFinished')
      }
    })

    // Logo de la marca
    tl.from(logo, {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: 'power4.out'
    })

    // Restaurante animado
    tl.from(restaurante, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power4.out'
    }, '+=0.2')

    // Puerta que se abre
    tl.from(puerta, {
      scaleY: 0,
      transformOrigin: 'bottom center',
      duration: 1,
      ease: 'power4.out'
    }, '+=0.2')

    // Espera pequeña y termina la intro
    tl.to(container, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '+=0.5')
  })
</script>

<div bind:this={container} class="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100 z-50">
  <div bind:this={logo} class="mb-6 text-4xl font-extrabold">
    🍽️ Mi Restaurante
  </div>
  <div bind:this={restaurante} class="mb-6 text-2xl">
    🏠 Restaurante animado
  </div>
  <div bind:this={puerta} class="text-6xl">
    🚪
  </div>
</div>

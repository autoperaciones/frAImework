<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { gsap } from 'gsap'
  import cantinaImage from '$lib/assets/images/cantina.webp'

  export let onFinished: () => void // Nueva prop tipo callback

  let container: HTMLElement
  let fondo: HTMLElement
  let logo: HTMLElement
  let restaurante: HTMLElement

  onMount(async () => {
    await tick()

    const tl = gsap.timeline({
      onComplete: () => {
        onFinished?.() // Llamamos al callback cuando termina
      }
    })

    tl.from(fondo, {
      scale: 0.8,
      opacity: 0,
      duration: 2.5,
      ease: 'power4.out'
    })

    tl.from(logo, {
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=1')

    tl.from(restaurante, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=0.8')

    tl.to(container, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '+=0.5')
  })
</script>

<div bind:this={container} class="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
  <img
    bind:this={fondo}
    src={cantinaImage}
    alt="Fondo Cantina"
    class="absolute inset-0 w-full h-full object-cover"
  />

  <div class="relative flex flex-col items-center justify-center z-10">
    <div bind:this={logo} class="mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg text-center">
      LA CANTINA
    </div>
    <div bind:this={restaurante} class="text-lg sm:text-xl lg:text-2xl text-white drop-shadow-md text-center">
      Restaurante y Bar
    </div>
  </div>
</div>

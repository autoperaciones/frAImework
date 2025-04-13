<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { gsap } from 'gsap'

  import cantinaBackground from '$lib/assets/images/cantina2.webp'
  import meseroInvitacion from '$lib/assets/images/mesero-invitacion.webp'
  import meseroAlegre from '$lib/assets/images/mesero-alegre.webp'
  import meseroPregunta from '$lib/assets/images/mesero-pregunta.webp'

  let container: HTMLElement
  let textoContainer: HTMLElement
  let imagenMesero: HTMLElement

  const pasos = [
    {
      imagen: meseroInvitacion,
      texto: 'Hola, bienvenidos al restaurante La Cantina',
      animacion: { opacity: 0, y: 0, duration: 1, ease: 'power2.out' }
    },
    {
      imagen: meseroAlegre,
      texto: 'Mucho gusto, soy tu asistente IAN de la Cantina Bar',
      animacion: { opacity: 0, y: 0, duration: 1, ease: 'power2.out' }
    },
    {
      imagen: meseroPregunta,
      texto: '¿Desean conocer la carta o tienen alguna pregunta?',
      animacion: { opacity: 0, y: 0, duration: 1.2, ease: 'power2.out' }
    }
  ]

  let imagenActual = ''
  let textoActual = ''

  onMount(async () => {
    await tick()

    gsap.set(container, { opacity: 0 })

    gsap.to(container, {
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      onComplete: () => { iniciarSecuencia() }
    })
  })

  async function iniciarSecuencia() {
    for (let i = 0; i < pasos.length; i++) {
      const paso = pasos[i]

      imagenActual = paso.imagen
      textoActual = ''

      await tick()

      gsap.fromTo(
        textoContainer,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: paso.animacion.ease }
      )

      gsap.fromTo(
        imagenMesero,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: paso.animacion.ease }
      )

      await escribirTexto(paso.texto)
      await esperar(1500)
    }
  }

  async function escribirTexto(texto: string) {
    textoActual = ''
    for (let i = 0; i < texto.length; i++) {
      textoActual += texto[i]
      await esperar(50)
    }
  }

  function esperar(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
</script>

<!-- Contenedor general que ocupa toda la pantalla -->
<div bind:this={container} class="fixed inset-0 flex flex-col justify-end m-0 p-6 z-50 overflow-hidden">

  <!-- Fondo del asistente -->
  <img
    src={cantinaBackground}
    alt="Fondo Cantina"
    class="absolute inset-0 w-full h-full object-cover -z-10"
  />

  <!-- Contenedor de la imagen del mesero -->
  <div class="flex justify-center items-end h-[40%] sm:h-[45%] lg:h-[55%]">
    {#if imagenActual}
      <img
        bind:this={imagenMesero}
        src={imagenActual}
        alt="Mesero IA"
        class="object-contain h-full"
      />
    {/if}
  </div>

  <!-- Contenedor del texto tipo cuadro RPG -->
  <div class="
    flex justify-center items-start
    h-[40%] sm:h-[35%] lg:h-[25%] w-xs sm:w-md lg:w-xl mx-auto
    bg-gradient-to-b from-red-50 to-white bg-opacity-100
    shadow-lg rounded-xl border-6 border-gray-600
    pt-10 px-4 sm:px-6 lg:px-8 z-20
  ">
    <div bind:this={textoContainer} class="flex items-center text-center max-w-2xl">
      <p class="text-xl sm:text-2xl lg:text-3xl text-gray-800 font-semibold leading-snug">
        {textoActual}
      </p>
    </div>
  </div>

</div>

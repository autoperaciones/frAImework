<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { gsap } from 'gsap'
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
      texto: 'Mucho gusto, Soy tu asistente IAN de la Cantina Bar',
      animacion: { opacity: 0, y: 0, duration: 1, ease: 'power2.out' }
    },
    {
      imagen: meseroPregunta,
      texto: '¿Desean conocer la carta o tienen alguna pregunta?',
      animacion: { opacity: 0, y: 0, duration: 1.2, ease: 'power2.out' }
    }
  ]

  // Inicializamos vacío para evitar que se muestre antes de tiempo
  let imagenActual = ''
  let textoActual = ''

  onMount(async () => {
    await tick()

    // Ocultamos el container desde el principio para que no parpadee al cargar
    gsap.set(container, { opacity: 0 })

    // Iniciamos la animación del container
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

      // Actualizamos el contenido antes de animar
      imagenActual = paso.imagen
      textoActual = ''

      await tick()

      // Animamos el texto
      gsap.fromTo(
        textoContainer,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: paso.animacion.ease }
      )

      // Animamos la imagen
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
<div bind:this={container} class="fixed inset-0 flex flex-col m-0 p-5 bg-gradient-to-br from-yellow-100 to-red-100 z-50">

  <!-- Contenedor de la imagen del mesero -->
  <div class="
    flex justify-center items-end
    h-[55%] sm:h-[65%] lg:h-[75%]
  ">
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
  h-[45%] sm:h-[35%] lg:h-[25%] w-xs sm:w-md lg:w-xl mx-auto
  bg-gradient-to-b from-red-50 to-white bg-opacity-100
  shadow-lg rounded-xl border-6 border-gray-600
  pt-10 px-4 sm:px-6 lg:px-8 z-50
  ">
    <div bind:this={textoContainer} class="flex items-center text-center max-w-2xl">
      <p class="text-xl sm:text-2xl lg:text-3xl text-gray-800 font-semibold leading-snug">
        {textoActual}
      </p>
    </div>
  </div>


</div>

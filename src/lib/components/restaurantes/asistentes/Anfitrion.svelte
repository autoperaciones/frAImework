<!-- src\lib\components\restaurantes\asistentes\Anfitrion.svelte -->

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { useAsistente } from '$lib/composables/useAsistente'
  import type { Secuencia } from '$lib/stores/routes'

  // Imágenes del anfitrión
  import anfitrionBienvenida from '$lib/assets/images/mesero-invitacion.webp'
  import anfitrionSonriente from '$lib/assets/images/mesero-alegre.webp'
  import anfitrionExplicacion from '$lib/assets/images/mesero-explicacion.webp'
  import anfitrionPregunta from '$lib/assets/images/mesero-pregunta.webp'
  

  export let secuencia: Secuencia

  const imagenes: Record<string, string> = {
    'anfitrion-bienvenida': anfitrionBienvenida,
    'anfitrion-sonriente': anfitrionSonriente,
    'anfitrion-explicacion': anfitrionExplicacion,
    'anfitrion-pregunta': anfitrionPregunta
  }

  const {
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
    modoPregunta
  } = useAsistente(secuencia, imagenes)

  let container: HTMLElement
  let imagenEl: HTMLElement
  let textoEl: HTMLElement

  onMount(async () => {
    await tick()
    setRefs(textoEl, imagenEl)
    iniciarSecuencia()
  })
</script>

<!-- Contenedor flotante -->
<div bind:this={container} class="fixed bottom-0 inset-x-0 p-6 z-50 pointer-events-none">

  <!-- Botones de opciones -->
  {#if !$mostrandoInput && !$modoPregunta && !$escribiendo && $pasoActual === secuencia.pasos.length - 1 && secuencia.opciones}
    <div class="flex justify-center my-2 gap-4 flex-wrap pointer-events-auto">
      {#each secuencia.opciones as opcion}
        <button
          class="bg-white border-2 border-amber-600 rounded-xl shadow px-5 py-3 text-gray-800 font-semibold hover:bg-gray-100 transition"
          on:click={() => seleccionarOpcion(opcion)}
        >
          {opcion.label}
        </button>
      {/each}
    </div>
  {/if}

  <!-- Imagen del asistente -->
  <div class="flex justify-center items-end h-[35vh] pointer-events-none">
    {#if $modoPregunta}
      <img
        src={imagenes['anfitrion-pregunta']}
        alt="Esperando pregunta"
        class="object-contain h-full pointer-events-none animate-fade-in"
      />
    {:else if secuencia.pasos[$pasoActual]}
      <img
        bind:this={imagenEl}
        src={imagenes[secuencia.pasos[$pasoActual].imagen]}
        alt="Anfitrión IA"
        class="object-contain h-full pointer-events-none"
      />
    {/if}
  </div>

  <!-- Cuadro de diálogo -->
  {#if !$mostrandoInput && !$modoPregunta}
    <button
      on:click={manejarClick}
      class="flex relative h-40 w-full max-w-3xl mx-auto
             bg-gradient-to-b from-white to-gray-100 shadow-lg
             rounded-xl border-2 border-amber-600 pt-5 px-6 z-20 text-left pointer-events-auto"
    >
      <div bind:this={textoEl} class="flex items-start text-left w-full">
        <p class="text-md sm:text-2xl text-gray-800 font-semibold w-full">
          {$textoActual}
        </p>
      </div>

      <div class="absolute bottom-2 right-4 text-xl sm:text-2xl text-amber-600 pointer-events-none">
        {#if $inicioCompletado}
          {#if $escribiendo}
            <span class="animate-pulse">...</span>
          {:else if secuencia.pasos.length > $pasoActual + 1}
            <span class="animate-bounce block">➤</span>
          {/if}
        {/if}
      </div>
    </button>
  {/if}

  <!-- Campo para preguntas abiertas -->
  {#if $mostrandoInput && $modoPregunta}
    <div class="flex flex-col items-center gap-2 pointer-events-auto w-full max-w-3xl mx-auto">
      <textarea
        bind:value={$preguntaUsuario}
        placeholder="Escribe tu pregunta aquí..."
        rows="3"
        class="w-full resize-none overflow-y-auto max-h-40 min-h-[3rem]
              border-1 border-amber-600 rounded-xl px-4 py-3 text-gray-800 text-md
              shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-500"
      ></textarea>

      <button
        on:click={enviarPregunta}
        class="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-10 py-2
              transition transform active:scale-95 shadow animate-pulse [animation-duration:4.5s]"
      >
        Enviar ➤
      </button>
    </div>
  {/if}
</div>

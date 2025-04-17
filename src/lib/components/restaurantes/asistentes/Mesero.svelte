<!-- src\lib\components\restaurantes\asistentes\Mesero.svelte -->

<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { useAsistente } from '$lib/composables/useAsistente'
  import type { Secuencia } from '$lib/stores/routes'

  // Imágenes del mesero
  import meseroNeutral from '$lib/assets/images/mesero-neutral.webp'
  import meseroSugerencia from '$lib/assets/images/mesero-sugerencia.webp'
  import meseroPregunta from '$lib/assets/images/mesero-pregunta.webp'

  export let secuencia: Secuencia

  const imagenes: Record<string, string> = {
    'mesero-neutral': meseroNeutral,
    'mesero-sugerencia': meseroSugerencia,
    'mesero-pregunta': meseroPregunta
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

<div bind:this={container} class="fixed bottom-0 inset-x-0 p-6 z-50 pointer-events-none">

  {#if !$mostrandoInput && !$modoPregunta && !$escribiendo && $pasoActual === secuencia.pasos.length - 1 && secuencia.opciones}
    <div class="flex justify-center my-2 gap-4 flex-wrap pointer-events-auto">
      {#each secuencia.opciones as opcion}
        <button
          class="bg-white border-2 border-indigo-600 rounded-xl shadow px-5 py-3 text-gray-800 font-semibold hover:bg-gray-100 transition"
          on:click={() => seleccionarOpcion(opcion)}
        >
          {opcion.label}
        </button>
      {/each}
    </div>
  {/if}

  <div class="flex justify-center items-end h-[35vh] pointer-events-none">
    {#if $modoPregunta}
      <img
        src={imagenes['mesero-pregunta']}
        alt="Mesero escucha"
        class="object-contain h-full pointer-events-none animate-fade-in"
      />
    {:else if secuencia.pasos[$pasoActual]}
      <img
        bind:this={imagenEl}
        src={imagenes[secuencia.pasos[$pasoActual].imagen]}
        alt="Mesero IA"
        class="object-contain h-full pointer-events-none"
      />
    {/if}
  </div>

  {#if !$mostrandoInput && !$modoPregunta}
    <button
      on:click={manejarClick}
      class="flex relative h-40 w-full max-w-3xl mx-auto
             bg-gradient-to-b from-white to-gray-100 shadow-lg
             rounded-xl border-2 border-indigo-600 pt-5 px-6 z-20 text-left pointer-events-auto"
    >
      <div bind:this={textoEl} class="flex items-start text-left w-full">
        <p class="text-md sm:text-2xl text-gray-800 font-semibold w-full">
          {$textoActual}
        </p>
      </div>

      <div class="absolute bottom-2 right-4 text-xl sm:text-2xl text-indigo-600 pointer-events-none">
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

  {#if $mostrandoInput && $modoPregunta}
    <div class="flex flex-col items-center gap-2 pointer-events-auto w-full max-w-3xl mx-auto mt-3">
      <textarea
        bind:value={$preguntaUsuario}
        placeholder="¿Tienes alguna duda sobre el menú?"
        rows="3"
        class="w-full resize-none overflow-y-auto max-h-40 min-h-[3rem]
              border-1 border-indigo-600 rounded-xl px-4 py-3 text-gray-800 text-md
              shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ></textarea>

      <button
        on:click={enviarPregunta}
        class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-10 py-2
              transition transform active:scale-95 shadow animate-pulse [animation-duration:4.5s]"
      >
        Enviar ➤
      </button>
    </div>
  {/if}
</div>

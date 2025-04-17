<!-- \routes\restaurante\[slug]\+page.svelte -->
<script lang="ts">
  import type { PageData } from './+page'
  import { goto } from '$app/navigation'
  import Restaurante from '$lib/components/restaurantes/Restaurante.svelte'

  export let data: PageData
</script>

{#if !data.restaurante}
  <div class="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6">
    <h1 class="text-5xl font-bold text-red-600 mb-4">Restaurante no encontrado</h1>
    <p class="text-xl mb-6 text-gray-700">
      El restaurante que estás buscando no existe o ha sido eliminado.
    </p>
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
      on:click={() => goto('/restaurante')}
    >
      Volver a restaurantes
    </button>
  </div>
{:else}
  <Restaurante restaurante={data.restaurante} />
{/if}

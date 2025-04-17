<!-- ZonaMenu.svelte -->
<script lang="ts">
  import { irA } from '$lib/stores/routes'
</script>

<div class="p-6">
  <h2 class="text-2xl font-bold mb-4">Zona del Menú</h2>
  <button on:click={() => irA('mesas')} class="bg-blue-600 text-white px-4 py-2 rounded">
    Ir a Mesas
  </button>
</div>

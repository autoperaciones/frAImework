<script lang="ts">
  import { irA } from '$lib/stores/routes'
</script>

<div class="p-6">
  <h2 class="text-2xl font-bold mb-4">Zona Mesas</h2>
  <p class="text-gray-700 mb-4">
    Aquí puedes esperar mientras se prepara tu pedido. El asistente te notificará cuando esté listo.
  </p>

  <button
    on:click={() => irA('lounge')}
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
  >
    Ir al Lounge
  </button>
</div>

<script lang="ts">
  import { irA } from '$lib/stores/routes'
</script>

<div class="p-6">
  <h2 class="text-2xl font-bold mb-4">Zona Lounge</h2>
  <p class="text-gray-700 mb-4">
    Esta es la zona de descanso. Puedes relajarte mientras preparan tu pedido o explorar el menú.
  </p>

  <button
    on:click={() => irA('menu')}
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
  >
    Ir al Menú
  </button>
</div>

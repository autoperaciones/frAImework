<script lang="ts">
  import { irA } from '$lib/stores/routes'
</script>

<div class="p-6">
  <h2 class="text-2xl font-bold mb-4">Zona Pago</h2>
  <p class="text-gray-700 mb-4">
    Aquí puedes revisar tu cuenta y finalizar tu pedido.
  </p>

  <button
    on:click={() => irA('entrada')}
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
  >
    Volver a Entrada
  </button>
</div>

<script lang="ts">
  import { cart } from '$lib/stores/cart'
</script>

<div class="fixed bottom-4 right-4 bg-white border rounded shadow-lg p-4 w-64">
  <h2 class="text-lg font-bold mb-2">Carrito</h2>
  {#if $cart.length === 0}
    <p>El carrito está vacío.</p>
  {:else}
    <ul>
      {#each $cart as item}
        <li class="mb-1">{item.nombre} - ${item.precio}</li>
      {/each}
    </ul>
  {/if}
</div>

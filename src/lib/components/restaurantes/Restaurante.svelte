<script lang="ts">
  import type { Restaurante } from '../../../routes/restaurante/[slug]/+page'
  import { zonaActual } from '$lib/stores/routes'

  import Entrada from './zonas/Entrada.svelte'
  import Menu from './zonas/Menu.svelte'
  import Lounge from './zonas/Lounge.svelte'
  import Mesas from './zonas/Mesas.svelte'
  import Cocina from './zonas/Cocina.svelte'
  import Pago from './zonas/Pago.svelte'
  import Anfitrion from './asistentes/Anfitrion.svelte'

  export let restaurante: Restaurante

</script>

<!-- Zona dinámica -->
{#if $zonaActual === 'entrada'}
  <Entrada />
  <Anfitrion secuencia={restaurante.secuenciaInicial} />
{:else if $zonaActual === 'menu'}
  <Menu />
{:else if $zonaActual === 'lounge'}
  <Lounge />
{:else if $zonaActual === 'mesas'}
  <Mesas />
{:else if $zonaActual === 'cocina'}
  <Cocina />
{:else if $zonaActual === 'pago'}
  <Pago />
{/if}

<script lang="ts">
  import Intro from '$lib/components/Intro.svelte'
  import AsistenteIA from '$lib/components/AsistenteIA.svelte'

  let introCompletada = false
</script>

{#if !introCompletada}
  <Intro on:introFinished={() => introCompletada = true} />
{:else}
  <AsistenteIA />
{/if}

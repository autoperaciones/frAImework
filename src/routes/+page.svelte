<script lang="ts">
  import Intro from '$lib/components/Intro.svelte'
  import AsistenteIA from '$lib/components/AsistenteIA.svelte'

  let introCompletada = false

  // Tipado explícito para evitar warnings
  let pasos: { imagen: string; texto: string; animacion?: string }[] = []
  let opciones: { label: string; value: string }[] = []

  function cargarSimulacion() {
    const respuestaSimulada = {
      pasos: [
        {
          imagen: 'mesero-invitacion',
          texto: '¡Hola! Bienvenidos a La Cantina. ¿Qué les apetece hoy?'
        },
        {
          imagen: 'mesero-alegre',
          texto: 'Tenemos platos del día que podrían interesarte.'
        },
        {
          imagen: 'mesero-pregunta',
          texto: '¿Te gustaría ver el menú o tienes alguna pregunta?'
        }
      ],
      opciones: [
        { label: 'Ver menú', value: 'ver_menu' },
        { label: 'Tengo una pregunta', value: 'hacer_pregunta' }
      ]
    }

    pasos = respuestaSimulada.pasos
    opciones = respuestaSimulada.opciones
  }

  function manejarOpcion(value: string) {
    console.log('Usuario eligió:', value)
    // Aquí puedes procesar la selección
  }
</script>

{#if !introCompletada}
  <Intro onFinished={() => {
    introCompletada = true
    cargarSimulacion()
  }} />
{:else}
  <AsistenteIA
    {pasos}
    {opciones}
    onFinalizado={() => console.log('Secuencia finalizada')}
    onOpcionSeleccionada={manejarOpcion}
  />
{/if}

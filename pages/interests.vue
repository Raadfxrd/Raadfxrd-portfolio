<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera/>
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]"/>
      <TresMeshBasicMaterial color="orange"/>
    </TresMesh>
  </TresCanvas>
</template>

<script setup>

</script>

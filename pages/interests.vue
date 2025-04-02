<script setup lang="ts">
import {TresCanvas} from '@tresjs/core'
import {OrbitControls} from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
      preset="realistic"
  >
    <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :look-at="[0, 0, 0]"
    />
    <OrbitControls/>
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]"/>
      <TresMeshBasicMaterial color="orange"/>
    </TresMesh>
    <TresAmbientLight :intensity="1"/>
  </TresCanvas>
</template>
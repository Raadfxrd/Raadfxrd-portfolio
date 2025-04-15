<script setup lang="ts">
import {TresCanvas} from '@tresjs/core'
import {OrbitControls, GLTFModel} from '@tresjs/cientos'
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
    <Suspense>
      <GLTFModel path="/models/ibm_model_m_keyboard/scene.gltf" draco/>
    </Suspense>
    <TresAmbientLight :intensity="0.4"/>
  </TresCanvas>
</template>
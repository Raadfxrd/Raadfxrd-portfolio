<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { GLTFModel } from "@tresjs/cientos";
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center w-full h-screen">
      <TresCanvas preset="realistic">
        <TresPerspectiveCamera
          :position="[0.2, 0.5, 0.5]"
          :look-at="[0, 0, 0]"
        />
        <Suspense>
          <GLTFModel path="/models/ibm_model_m_keyboard/scene.gltf" draco />
        </Suspense>
        <TresAmbientLight :intensity="0.6" />
      </TresCanvas>
    </div>
  </section>
</template>

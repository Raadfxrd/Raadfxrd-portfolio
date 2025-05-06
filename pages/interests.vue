<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { GLTFModel } from "@tresjs/cientos";
</script>

<template>
  <section class="relative w-full h-screen">
    <div class="absolute w-full h-full">
      <!-- Background Canvas -->
      <TresCanvas preset="realistic" class="absolute inset-0 z-0">
        <TresPerspectiveCamera
          :position="[0.2, 0.5, 0.5]"
          :look-at="[0, 0, 0]"
        />
        <Suspense>
          <GLTFModel path="/models/ibm_model_m_keyboard/scene.gltf" draco />
        </Suspense>
        <TresAmbientLight :intensity="0.6" />
      </TresCanvas>

      <!-- Foreground Content -->
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-center"
      >
        <h1 class="text-4xl font-bold text-gray-800">
          Welcome to the Interests Page
        </h1>
        <p class="text-lg text-gray-600 mt-4">
          Explore the world of keyboards and more!
        </p>
      </div>
    </div>
  </section>
</template>
<style>
/* Ensure the canvas covers the entire background */
canvas {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>

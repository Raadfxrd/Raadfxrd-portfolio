<template>
  <section class="interests py-16 bg-[#132534] text-white">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-semibold mb-8">My Interests</h2>
      <div class="w-full h-[400px] relative">
        <!-- Three.js component with rotating 3D model -->
        <Canvas>
          <GltfModel></GltfModel>
        </Canvas>
      </div>
    </div>
  </section>
</template>

<script setup>
import {GltfModel} from "troisjs";
</script>

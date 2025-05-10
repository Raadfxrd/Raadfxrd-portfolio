<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { GLTFModel } from "@tresjs/cientos";

const sections = [
  {
    title: "My Journey into Tech",
    text: `As a Software Engineering student at AUAS, I blend formal education with my self-taught coding journey. My passion for technology extends beyond the classroom, where I create meaningful projects that solve real-world problems and bring joy to others.`,
  },
  {
    title: "The World of Audio",
    text: `By day, I'm immersed in the audiophile world at Hifi Klubben Rijnstraat, where I help others discover the perfect harmony between technology and sound. This role fuels my appreciation for both technical excellence and artistic expression.`,
  },
  {
    title: "Gaming as a Creative Outlet",
    text: `Gaming isn't just a hobby—it's my creative outlet. Whether it's strategic plays in Valorant, building virtual worlds in Minecraft, or exploring the vast landscapes of Black Desert Online, each game offers a unique perspective on interactive design and user experience.`,
  },
  {
    title: "The Joy of Mechanical Keyboards",
    text: `I'm particularly drawn to the world of mechanical keyboards, where engineering meets aesthetics. Each build is an opportunity to create something unique, combining tactile feedback, sound design, and visual appeal into a daily driver that sparks joy.`,
  },
  {
    title: "Why I Love Building for People",
    text: `I’m especially fascinated by how users interact with tech—how emotion and logic merge in well-designed interfaces. Whether I’m working on a portfolio or a client’s site, I strive to create smooth, meaningful experiences that leave a lasting impression.`,
  },
];
</script>

<template>
  <section class="relative w-full">
    <!-- Background Canvas -->
    <TresCanvas preset="realistic" class="absolute inset-0 z-0">
      <TresPerspectiveCamera :position="[0.2, 0.5, 0.5]" :look-at="[0, 0, 0]" />
      <Suspense>
        <GLTFModel path="/models/ibm_model_m_keyboard/scene.gltf" draco />
      </Suspense>
      <TresAmbientLight :intensity="0.6" />
    </TresCanvas>

    <!-- Foreground Content -->
    <div
      class="relative z-10 flex items-center justify-center text-left text-white backdrop-blur-md px-4 pt-32 pb-24"
    >
      <div class="max-w-3xl space-y-8">
        <header class="space-y-4">
          <h2
            class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Hello, World!
          </h2>
          <p class="text-xl font-light leading-relaxed">
            Bridging the gap between technology and creativity in Amsterdam
          </p>
        </header>

        <div class="space-y-16">
          <FadeInSection v-for="(section, index) in sections" :key="index">
            <div
              :class="[
                'flex flex-col md:flex-row items-center gap-8',
                index % 3 === 0
                  ? 'justify-center text-center'
                  : index % 3 === 1
                    ? 'justify-start text-left'
                    : 'justify-end text-right',
              ]"
            >
              <div
                class="max-w-xl bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                :style="{ transitionDelay: `${index * 100}ms` }"
              >
                <h3 class="text-2xl font-bold mb-2">{{ section.title }}</h3>
                <p class="leading-relaxed">{{ section.text }}</p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div class="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <h2 class="text-2xl font-semibold mb-4">Quick Facts</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="font-semibold">🎓 Education:</span>
                <span>Software Engineering @ AUAS</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-semibold">💼 Work:</span>
                <span>Hifi Klubben Rijnstraat</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-semibold">🌍 From:</span>
                <span>Poland</span>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <span class="font-semibold">🎮 Gaming:</span>
                <span>Valorant, Minecraft, Black Desert</span>
              </div>
              <div>
                <span class="font-semibold">⌨️ Tech:</span>
                <span>Custom PCs, Mechanical Keyboards</span>
              </div>
              <div>
                <span class="font-semibold">🎵 Passion:</span>
                <span>High-fidelity Audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
canvas {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>

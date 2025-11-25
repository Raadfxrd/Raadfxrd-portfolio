<script lang="ts" setup>
import {TresCanvas} from "@tresjs/core";
import {GLTFModel} from "@tresjs/cientos";

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
    <TresCanvas class="absolute inset-0 z-0" preset="realistic">
      <TresPerspectiveCamera :look-at="[0, 0, 0]" :position="[0.2, 0.5, 0.5]"/>
      <Suspense>
        <GLTFModel draco path="/models/ibm_model_m_keyboard/scene.gltf"/>
      </Suspense>
      <TresAmbientLight :intensity="0.6"/>
    </TresCanvas>

    <div
        class="relative z-10 flex items-center justify-center px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 text-left text-white backdrop-blur-md"
    >
      <div class="max-w-3xl space-y-6 md:space-y-8">
        <header class="space-y-3 md:space-y-4">
          <h2 class="gradient w-fit text-3xl md:text-4xl font-bold">Hello, World!</h2>
          <p class="w-fit text-base md:text-xl leading-relaxed font-light">
            Bridging the gap between technology and creativity in Amsterdam
          </p>
        </header>

        <div class="space-y-12 md:space-y-16">
          <FadeInSection v-for="(section, index) in sections" :key="index">
            <div
                :class="[
                'flex flex-col items-center gap-6 md:gap-8 md:flex-row',
                index % 3 === 0
                  ? 'justify-center text-justify'
                  : index % 3 === 1
                    ? 'justify-start text-justify'
                    : 'justify-end text-justify',
              ]"
            >
              <div
                  :style="{ transitionDelay: `${index * 100}ms` }"
                  class="max-w-xl rounded-lg bg-white/10 p-4 md:p-6 backdrop-blur-sm"
              >
                <h3 class="mb-2 w-fit text-xl md:text-2xl font-bold">
                  {{ section.title }}
                </h3>
                <p class="w-fit leading-relaxed text-sm md:text-base">{{ section.text }}</p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div class="mt-8 md:mt-12 rounded-lg bg-white/10 p-4 md:p-6 backdrop-blur-sm">
          <h2 class="mb-3 md:mb-4 text-xl md:text-2xl font-semibold">Quick Facts</h2>
          <div class="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
            <div class="space-y-2 md:space-y-3">
              <div class="flex items-center space-x-2 text-sm md:text-base">
                <span class="font-semibold">🎓 Education:</span>
                <span>Software Engineering @ AUAS</span>
              </div>
              <div class="flex items-center space-x-2 text-sm md:text-base">
                <span class="font-semibold">💼 Work:</span>
                <span>Hifi Klubben Rijnstraat</span>
              </div>
              <div class="flex items-center space-x-2 text-sm md:text-base">
                <span class="font-semibold">🌍 From:</span>
                <span>Poland</span>
              </div>
            </div>
            <div class="space-y-2 md:space-y-3">
              <div class="text-sm md:text-base">
                <span class="font-semibold">🎮 Gaming:</span>
                <span>Valorant, Minecraft, Black Desert</span>
              </div>
              <div class="text-sm md:text-base">
                <span class="font-semibold">⌨️ Tech:</span>
                <span>Custom PCs, Mechanical Keyboards</span>
              </div>
              <div class="text-sm md:text-base">
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

<script lang="ts" setup>
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  HeartIcon,
  MapPinIcon,
  MusicalNoteIcon,
  PuzzlePieceIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";
import {computed, ref} from "vue";

const interests = [
  {
    title: "My Journey into Tech",
    icon: ComputerDesktopIcon,
    text: `As a Software Engineering student at AUAS, I blend formal education with my self-taught coding journey. Working as a Software Engineer at IRP and in sales at Hifi Klubben, I continuously apply and expand my technical skills while helping others find the perfect tech and audio solutions.`,
    details: [
      "Currently pursuing Software Engineering at Amsterdam University of Applied Sciences",
      "Working as a Software Engineer at IRP, building real-world solutions",
      "Sales consultant at Hifi Klubben, helping customers with audio and tech",
      "Self-taught developer with focus on web technologies and modern frameworks",
      "Building projects that combine creativity with technical excellence",
      "Passionate about clean code and user-centered design",
    ],
  },
  {
    title: "The World of Audio",
    icon: MusicalNoteIcon,
    text: `By day, I'm immersed in the audiophile world at Hifi Klubben Rijnstraat, where I help others discover the perfect harmony between technology and sound. This role fuels my appreciation for both technical excellence and artistic expression.`,
    details: [
      "Working at Hifi Klubben Rijnstraat in Amsterdam",
      "Helping customers find their perfect audio setup",
      "Deep appreciation for high-fidelity sound reproduction",
      "Understanding the intersection of technology and art",
    ],
  },
  {
    title: "Gaming as a Creative Outlet",
    icon: PuzzlePieceIcon,
    text: `Gaming isn't just a hobby—it's my creative outlet. From strategic competitive play to sandbox creativity and immersive open-world exploration, each gaming experience offers a unique perspective on interactive design and user experience.`,
    details: [
      "FPS games for strategic thinking and quick decision-making",
      "Sandbox games for creative expression and world-building",
      "RPGs for immersive storytelling and character development",
      "Analyzing game design and user experience patterns",
    ],
  },
  {
    title: "The Joy of Mechanical Keyboards",
    icon: CommandLineIcon,
    text: `I'm particularly drawn to the world of mechanical keyboards, where engineering meets aesthetics. Each build is an opportunity to create something unique, combining tactile feedback, sound design, and visual appeal into a daily driver that sparks joy.`,
    details: [
      "Custom keyboard builds tailored to personal preferences",
      "Experimenting with different switch types and layouts",
      "Appreciating the craftsmanship in keycap design",
      "Finding the perfect balance between form and function",
    ],
  },
  {
    title: "Why I Love Building for People",
    icon: SparklesIcon,
    text: `I'm especially fascinated by how users interact with tech—how emotion and logic merge in well-designed interfaces. Whether I'm working on a portfolio or a client's site, I strive to create smooth, meaningful experiences that leave a lasting impression.`,
    details: [
      "User-centered design approach in every project",
      "Creating intuitive and accessible interfaces",
      "Balancing aesthetics with functionality",
      "Building lasting relationships through quality work",
      "Quality of materials and attention to detail in every build",
    ],
  },
];

const openModalIndex = ref<number | null>(null);

const currentInterest = computed(() => {
  if (openModalIndex.value !== null) {
    return interests[openModalIndex.value];
  }
  return null;
});

const toggleCard = (index: number) => {
  if (openModalIndex.value === index) {
    openModalIndex.value = null;
  } else {
    openModalIndex.value = index;
  }
};

const closeModal = () => {
  openModalIndex.value = null;
};


const quickFacts = [
  {icon: AcademicCapIcon, label: "Education", value: "Software Engineering @ AUAS"},
  {icon: BriefcaseIcon, label: "Work", value: "Software Engineer @ IRP & Sales @ Hifi Klubben"},
  {icon: MapPinIcon, label: "Location", value: "Based in the Netherlands, from Poland"},
  {icon: PuzzlePieceIcon, label: "Gaming", value: "FPS, Sandbox, RPGs"},
  {icon: CpuChipIcon, label: "Tech", value: "Custom PCs, Mechanical Keyboards, Networking"},
  {icon: HeartIcon, label: "Passion", value: "High-fidelity Audio, Gaming, Coding"},
];
</script>

<template>
  <div class="min-h-screen w-full bg-background-light px-4 py-24 md:px-6 md:py-32">
    <div class="mx-auto max-w-6xl space-y-12 md:space-y-16">
      <!-- Header Section -->
      <header class="space-y-4 text-center flex flex-col items-center">
        <h1 class="gradient text-4xl md:text-5xl lg:text-6xl font-bold w-fit">
          Hello, World!
        </h1>
        <p class="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto w-1/2">
          Based in Amsterdam, bridging the gap between technology and creativity
        </p>
      </header>

      <!-- Interests Grid -->
      <div class="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <FadeInSection
            v-for="(interest, index) in interests"
            :key="index"
        >
          <div
              class="group relative h-full overflow-hidden rounded-2xl border border-border-light bg-background-light-2 p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer"
              @click="toggleCard(index)"
          >
            <!-- Icon -->
            <div
                class="mb-4 inline-flex items-center justify-center rounded-xl bg-background-light p-3 border border-border-light">
              <component :is="interest.icon" class="w-12 h-12 text-text-primary"/>
            </div>

            <!-- Title -->
            <h3 class="mb-3 text-2xl md:text-3xl font-bold text-text-primary w-fit">
              {{ interest.title }}
            </h3>

            <!-- Description -->
            <p class="text-text-secondary text-justify leading-relaxed mb-4 w-fit">
              {{ interest.text }}
            </p>

            <!-- Click Hint -->
            <p class="text-text-secondary text-sm italic mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Click to learn more →
            </p>
          </div>
        </FadeInSection>
      </div>

      <!-- Modal Overlay -->
      <Teleport to="body">
        <Transition name="modal">
          <div
              v-if="openModalIndex !== null"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              @click.self="closeModal"
          >
            <div
                class="modal-card relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-border-light bg-background-light-2 p-8 shadow-2xl"
                @click.stop
            >
              <!-- Close Button -->
              <button
                  @click="closeModal"
                  class="absolute top-4 right-4 p-2 rounded-lg hover:bg-background-light transition-colors duration-200"
                  aria-label="Close modal"
              >
                <svg class="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <!-- Modal Content -->
              <div v-if="currentInterest" class="text-text-primary">
                <!-- Icon -->
                <div
                    class="mb-6 inline-flex items-center justify-center rounded-xl bg-background-light p-4 border border-border-light">
                  <component :is="currentInterest.icon" class="w-12 h-12 text-text-primary"/>
                </div>

                <!-- Title -->
                <h3 class="mb-6 text-3xl md:text-4xl font-bold text-text-primary">
                  {{ currentInterest.title }}
                </h3>

                <!-- Original Description -->
                <p class="text-text-secondary leading-relaxed mb-6 pb-6 border-b border-border-light text-base">
                  {{ currentInterest.text }}
                </p>

                <!-- Detailed Information -->
                <h4 class="text-lg font-semibold text-text-primary mb-4">More Details:</h4>
                <ul class="space-y-3 mb-4">
                  <li
                      v-for="(detail, detailIndex) in currentInterest.details"
                      :key="detailIndex"
                      class="flex items-start space-x-3 text-text-secondary text-base"
                  >
                    <span class="text-accent mt-1 text-lg font-bold">•</span>
                    <span class="leading-relaxed flex-1">{{ detail }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Quick Facts Section -->
      <FadeInSection>
        <div class="rounded-2xl border border-border-light bg-background-light-2 p-6 md:p-8 shadow-sm">
          <h2 class="gradient mb-6 text-2xl md:text-3xl font-bold w-fit">
            Quick Facts
          </h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="(fact, index) in quickFacts"
                :key="index"
                class="flex items-start space-x-3 rounded-xl border border-border-light bg-background-light p-4"
            >
              <component :is="fact.icon" class="w-10 h-10 text-text-primary flex-shrink-0 mt-0.5"/>
              <div class="flex-1 min-w-0">
                <p class="text-text-secondary text-sm font-semibold w-fit">
                  {{ fact.label }}
                </p>
                <p class="text-text-primary text-base break-words w-fit">
                  {{ fact.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <!-- Call to Action -->
      <FadeInSection>
        <div class="text-center space-y-6">
          <p class="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
            Interested in collaborating or just want to chat about tech? I'm not afraid to say that I love meeting new
            people and discussing exciting ideas.
          </p>
          <NuxtLink
              to="/contact"
              class="inline-block rounded-xl border-2 border-text-primary bg-background-light px-8 py-4 text-lg font-semibold text-text-primary transition-all duration-300 hover:bg-text-primary hover:text-background-light hover:shadow-lg"
          >
            Get in Touch
          </NuxtLink>
        </div>
      </FadeInSection>
    </div>
  </div>
</template>

<style scoped>
/* Modal animations */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-card {
  animation: modalSpinIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-leave-active .modal-card {
  animation: modalSpinOut 0.4s cubic-bezier(0.36, 0, 0.66, -0.56);
}

@keyframes modalSpinIn {
  0% {
    transform: scale(0.7) rotateY(-180deg) rotateX(20deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotateY(0deg) rotateX(0deg);
    opacity: 1;
  }
}

@keyframes modalSpinOut {
  0% {
    transform: scale(1) rotateY(0deg) rotateX(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.7) rotateY(180deg) rotateX(-20deg);
    opacity: 0;
  }
}
</style>

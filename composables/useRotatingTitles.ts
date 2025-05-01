import { onMounted, ref } from "vue";

export function useRotatingTitles() {
  const titles = [
    "Frontend Developer,",
    "Full-Stack Developer,",
    "Web Developer,",
    "Software Engineer,",
  ];

  const currentTitleIndex = ref(0);
  const currentTitle = ref(titles[0]);
  const isFadingOut = ref(false);

  const startTitleRotation = () => {
    // Rotate immediately for first time
    rotateTitle();
    // Then set up interval
    const interval = setInterval(rotateTitle, 4000);
    return interval;
  };

  const rotateTitle = () => {
    isFadingOut.value = true;

    setTimeout(() => {
      currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length;
      currentTitle.value = titles[currentTitleIndex.value];
      isFadingOut.value = false;
    }, 500);
  };

  onMounted(() => {
    const interval = startTitleRotation();
    // Cleanup on unmount
    return () => clearInterval(interval);
  });

  return {
    currentTitle,
    isFadingOut,
    startTitleRotation,
  };
}

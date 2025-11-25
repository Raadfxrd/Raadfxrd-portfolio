import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";

let isNavbarVisible = ref(false);
let isAnimationComplete = ref(false);

export function useNavbarVisibility() {
    const route = useRoute();

    // Singleton pattern to ensure shared state
    if (!isNavbarVisible || !isAnimationComplete) {
        isNavbarVisible = ref(false);
        isAnimationComplete = ref(false);
    }

    // Watch for route changes
    watch(
        () => route.path,
        (newPath) => {
            if (newPath === "/") {
                // Hide navbar when navigating to home page
                isNavbarVisible.value = false;
                isAnimationComplete.value = false;
            }
        },
        {immediate: true},
    );

    onMounted(() => {
        const hasPlayedIntro = localStorage.getItem("hasPlayedIntro");

        // If not on home page or intro was played before, show navbar
        if (route.path !== "/" || hasPlayedIntro === "true") {
            isNavbarVisible.value = true;
            isAnimationComplete.value = true;
        }
    });

    return {
        isNavbarVisible,
        isAnimationComplete,
        showNavbar: () => {
            isNavbarVisible.value = true;
            isAnimationComplete.value = true;
            localStorage.setItem("isNavbarVisible", "true");
        },
    };
}

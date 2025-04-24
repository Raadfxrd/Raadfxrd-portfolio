import {onMounted, ref} from 'vue';

let isNavbarVisible = ref(false);
let isAnimationComplete = ref(false);

export function useNavbarVisibility() {
    // Singleton pattern to ensure shared state
    if (!isNavbarVisible || !isAnimationComplete) {
        isNavbarVisible = ref(false);
        isAnimationComplete = ref(false);
    }

    onMounted(() => {
        const hasPlayedIntro = localStorage.getItem('hasPlayedIntro');
        const hasPlayedNavbarAnimation = localStorage.getItem('hasPlayedNavbarAnimation');
        const navbarVisibleState = localStorage.getItem('isNavbarVisible');

        // Restore navbar visibility state from localStorage
        if (navbarVisibleState === 'true') {
            isNavbarVisible.value = true;
        }

        if (hasPlayedIntro && !hasPlayedNavbarAnimation) {
            isNavbarVisible.value = true;
            localStorage.setItem('isNavbarVisible', 'true');

            // Play animation once
            setTimeout(() => {
                isAnimationComplete.value = true;
                localStorage.setItem('hasPlayedNavbarAnimation', 'true'); // Mark animation as played
            }, 1000);
        } else if (hasPlayedIntro) {
            isNavbarVisible.value = true;
            isAnimationComplete.value = true; // Skip animation if already played
        }
    });

    return {
        isNavbarVisible,
        isAnimationComplete,
        showNavbar: () => {
            console.log('showNavbar called. Setting isNavbarVisible to true.');
            isNavbarVisible.value = true;
            localStorage.setItem('isNavbarVisible', 'true');
        },
    };
}
import {onMounted, ref} from 'vue';
import {useNavbarVisibility} from '~/composables/useNavbarVisibility';
import {useRotatingTitles} from '~/composables/useRotatingTitles';

export function useIntroSequence() {
    const showIntro = ref(false);
    const showContent = ref(false);

    const {startTitleRotation} = useRotatingTitles();
    const {showNavbar} = useNavbarVisibility();

    onMounted(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            const hasPlayedIntro = localStorage.getItem('hasPlayedIntro');

            if (!hasPlayedIntro) {
                showIntro.value = true;
                startTitleRotation?.();

                setTimeout(() => {
                    showIntro.value = false;

                    setTimeout(() => {
                        showContent.value = true;
                        showNavbar?.();
                        localStorage.setItem('hasPlayedIntro', 'true');
                    }, 300);
                }, 2000);
            } else {
                showContent.value = true;
                showNavbar?.();
            }
        } else {
            showContent.value = true;
        }
    });

    return {
        showIntro,
        showContent,
    };
}
import {ref, onMounted} from 'vue';
import {useNavbarVisibility} from '~/composables/useNavbarVisibility';
import {useRotatingTitles} from '~/composables/useRotatingTitles';

export function useIntroSequence() {
    const showIntro = ref(true);
    const showContent = ref(false);

    const {startTitleRotation} = useRotatingTitles();
    const {showNavbar} = useNavbarVisibility();

    onMounted(() => {
        startTitleRotation();

        setTimeout(() => {
            showIntro.value = false;

            setTimeout(() => {
                showContent.value = true;
                showNavbar();
            }, 300);
        }, 2000);
    });

    return {
        showIntro,
        showContent,
    };
}
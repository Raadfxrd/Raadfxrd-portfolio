import {onMounted, ref} from 'vue';

const isNavbarVisible = ref(false);

export function useNavbarVisibility() {
    onMounted(() => {
        const hasPlayedNavbarAnimation = localStorage.getItem('hasPlayedNavbarAnimation');

        if (!hasPlayedNavbarAnimation) {
            isNavbarVisible.value = true;
            localStorage.setItem('hasPlayedNavbarAnimation', 'true');
        } else {
            isNavbarVisible.value = false;
        }
    });

    return {
        isNavbarVisible,
        showNavbar: () => (isNavbarVisible.value = true),
    };
}
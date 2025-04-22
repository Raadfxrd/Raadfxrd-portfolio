import {ref} from 'vue';

const isNavbarVisible = ref(false);

export function useNavbarVisibility() {
    return {
        isNavbarVisible,
        showNavbar: () => (isNavbarVisible.value = true),
    };
}
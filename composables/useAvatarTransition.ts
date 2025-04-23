import {useRoute} from "#vue-router";
import {onMounted, onUnmounted, ref} from "vue";

export function useAvatarTransition() {
    const route = useRoute(); // Ensure this is used within the setup function
    const isScrolledPastHero = ref(false);

    const checkScroll = () => {
        // Check if the hero content is out of view
        const heroElement = document.querySelector('#hero-content');
        const heroBottom = heroElement?.getBoundingClientRect().bottom ?? window.innerHeight;

        // Check if we've scrolled past the hero section or the route is not "/"
        isScrolledPastHero.value = heroBottom < 0 || route.path !== '/';
    };

    onMounted(() => {
        // Attach the scroll listener
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Initial check
    });

    onUnmounted(() => {
        // Clean up the scroll listener
        window.removeEventListener('scroll', checkScroll);
    });

    return {isScrolledPastHero};
}
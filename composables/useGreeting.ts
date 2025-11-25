import {computed} from "vue";

export function useGreeting() {
    const greeting = computed(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning,";
        if (hour < 18) return "Good afternoon,";
        return "Good evening,";
    });

    return {greeting};
}

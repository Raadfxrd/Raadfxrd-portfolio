import {ref} from 'vue'

export function useRotatingTitles() {
    const titles = [
        'Frontend Developer,',
        'Full-Stack Developer,',
        'Web Developer,',
        'Software Engineer,',
    ]

    const currentTitleIndex = ref(0)
    const currentTitle = ref(titles[0])
    const isFadingOut = ref(false)

    const startTitleRotation = () => {
        setInterval(() => {
            isFadingOut.value = true
            setTimeout(() => {
                currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
                currentTitle.value = titles[currentTitleIndex.value]
                isFadingOut.value = false
            }, 500)
        }, 4000)
    }

    return {
        currentTitle,
        isFadingOut,
        startTitleRotation,
    }
}
export function useTechStack() {
  const techStack = ref([
    { class: "devicon-html5-plain", title: "HTML5" },
    { class: "devicon-css3-plain", title: "CSS3" },
    { class: "devicon-javascript-plain", title: "JavaScript" },
    { class: "devicon-typescript-plain", title: "TypeScript" },
    { class: "devicon-vuejs-plain", title: "VueJS" },
    { class: "devicon-tailwindcss-plain", title: "Tailwind CSS" },
    { class: "devicon-laravel-plain", title: "Laravel" },
    { class: "devicon-nodejs-plain", title: "Node.js" },
    { class: "devicon-docker-plain", title: "Docker" },
    { class: "devicon-mysql-plain", title: "MySQL" },
    { class: "devicon-github-original", title: "GitHub" },
    { class: "devicon-gitlab-plain", title: "GitLab" },
    { class: "devicon-figma-plain", title: "Figma" },
    { class: "devicon-discordjs-plain", title: "DiscordJS" },
    { class: "devicon-photoshop-plain", title: "Adobe Photoshop" },
    { class: "devicon-aftereffects-plain", title: "Adobe After Effects" },
    { class: "devicon-premierepro-plain", title: "Adobe Premiere Pro" },
  ]);

  return { techStack };
}

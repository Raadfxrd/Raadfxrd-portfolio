<template>
  <div class="relative w-full overflow-hidden">
    <section class="flex min-h-screen w-full flex-col items-center justify-center px-4 pt-20 md:pt-30 pb-12 md:pb-20">
      <div class="mx-auto max-w-2xl w-full">
        <!-- Header Section -->
        <div class="mb-8 md:mb-12 text-center relative flex flex-col items-center">
          <h1 class="gradient text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 relative z-10 w-fit">
            Get in Touch
          </h1>
          <p class="text-text-secondary text-sm md:text-base lg:text-lg max-w-xl mx-auto relative z-10">
            Have a project in mind, want to collaborate, or just want to chat? Maybe some feedback? Drop me a message!
          </p>
        </div>

        <!-- Contact Form -->
        <div
            class="bg-background-light border border-border-light rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
          <form action="#" method="POST" class="space-y-5">
            <div class="group">
              <label
                  class="text-text-secondary group-focus-within:text-text-primary block text-sm md:text-base font-medium mb-2 transition-colors"
                  for="name">
                Name
              </label>
              <input
                  id="name"
                  class="bg-background-light-2 text-text-primary border border-transparent focus:border-button-primary mt-1 w-full rounded-lg p-3 text-sm md:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-button-primary/20"
                  name="name"
                  placeholder="Your name"
                  required
                  type="text"
              />
            </div>

            <div class="group">
              <label
                  class="text-text-secondary group-focus-within:text-text-primary block text-sm md:text-base font-medium mb-2 transition-colors"
                  for="email">
                Email
              </label>
              <input
                  id="email"
                  class="bg-background-light-2 text-text-primary border border-transparent focus:border-button-primary mt-1 w-full rounded-lg p-3 text-sm md:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-button-primary/20"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  type="email"
              />
            </div>

            <div class="group">
              <label
                  class="text-text-secondary group-focus-within:text-text-primary block text-sm md:text-base font-medium mb-2 transition-colors"
                  for="message">
                Message
              </label>
              <textarea
                  id="message"
                  class="bg-background-light-2 text-text-primary border border-transparent focus:border-button-primary mt-1 w-full rounded-lg p-3 text-sm md:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-button-primary/20 resize-none"
                  name="message"
                  placeholder="Tell me about your project or just say hi..."
                  required
                  rows="5"
              ></textarea>
            </div>

            <button
                class="bg-button-primary text-text-primary hover:bg-background-light-2 border border-transparent hover:border-button-primary group relative w-full overflow-hidden rounded-lg py-3 md:py-4 font-semibold text-sm md:text-base transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                type="submit"
            >
              <span>Send Message</span>
              <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </form>
        </div>

        <!-- Social Links -->
        <div class="mt-10 md:mt-12 flex flex-col items-center text-center">
          <h2 class="gradient text-center text-xl md:text-2xl font-bold mb-6 md:mb-8 w-fit">Connect with me</h2>

          <div class="flex justify-center gap-6 md:gap-8">
            <!-- GitHub -->
            <a href="https://github.com/raadfxrd" target="_blank" rel="noopener noreferrer"
               class="flex flex-col items-center gap-3 p-5 md:p-6 bg-background-light border border-border-light hover:border-button-primary rounded-lg transition-all duration-200 group min-w-[110px] md:min-w-[120px] shadow-sm hover:shadow-md">
              <i class="devicon-github-original text-text-secondary group-hover:text-text-primary text-4xl md:text-5xl transition-colors"></i>
              <span
                  class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm font-medium transition-colors">GitHub</span>
            </a>

            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/borys-babas/" target="_blank" rel="noopener noreferrer"
               class="flex flex-col items-center gap-3 p-5 md:p-6 bg-background-light border border-border-light hover:border-button-primary rounded-lg transition-all duration-200 group min-w-[110px] md:min-w-[120px] shadow-sm hover:shadow-md">
              <i class="devicon-linkedin-plain text-text-secondary group-hover:text-text-primary text-4xl md:text-5xl transition-colors"></i>
              <span
                  class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm font-medium transition-colors">LinkedIn</span>
            </a>

            <!-- Instagram -->
            <a href="https://www.instagram.com/borysbabas/" target="_blank" rel="noopener noreferrer"
               class="flex flex-col items-center gap-3 p-5 md:p-6 bg-background-light border border-border-light hover:border-button-primary rounded-lg transition-all duration-200 group min-w-[110px] md:min-w-[120px] shadow-sm hover:shadow-md">
              <svg class="text-text-secondary group-hover:text-text-primary w-10 h-10 md:w-12 md:h-12 transition-colors"
                   fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span
                  class="text-text-secondary group-hover:text-text-primary text-xs md:text-sm font-medium transition-colors">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

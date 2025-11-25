<template>
  <div class="bg-background-light border-border-light rounded-l border p-3 md:p-4">
    <h2 class="mb-2 md:mb-3 w-fit text-xs md:text-sm font-bold">Stay up to date</h2>
    <p class="text-text-secondary mb-3 md:mb-4 w-fit text-justify text-xs leading-relaxed">
      Get notified when I post something, unsubscribe at any moment.
    </p>
    <form class="space-y-2 md:space-y-3">
      <div class="flex flex-col sm:flex-row gap-2">
        <input
            id="email"
            class="bg-background-light border-border-light focus:ring-button-primary flex-1 rounded-md border p-2 text-xs focus:ring-1"
            placeholder="Enter your email"
            type="email"
        />
        <button
            class="bg-button-primary text-text-secondary hover:bg-background-light-2 rounded-md px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors"
            type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  </div>
</template>

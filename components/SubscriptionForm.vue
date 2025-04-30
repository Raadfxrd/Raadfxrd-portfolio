<template>
  <div class="bg-background-light border border-border-light p-4 rounded-l">
    <h2 class="text-sm font-bold mb-3">Stay up to date</h2>
    <p class="text-xs text-text-secondary leading-relaxed mb-4">
      Get notified when I post something, unsubscribe at any moment.
    </p>
    <form class="space-y-3">
      <div class="flex gap-2">
        <input
          id="email"
          class="flex-1 text-xs p-2 rounded-md bg-background-light border border-border-light focus:ring-1 focus:ring-button-primary"
          placeholder="Enter your email"
          type="email"
        />
        <button
          class="whitespace-nowrap text-xs bg-button-primary text-text-secondary font-medium rounded-md hover:bg-background-light-2 px-3 py-2 transition-colors"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  </div>
</template>

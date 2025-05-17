<template>
  <div class="relative w-full overflow-hidden">
    <section
      class="flex min-h-screen w-full flex-col items-center justify-center"
    >
      <h1 class="text-primary text-center text-4xl font-bold">Contact</h1>
      <div class="mt-10 w-1/3">
        <form action="#" method="POST">
          <div class="mb-4">
            <label class="text-primary block text-lg" for="name">Name</label>
            <input
              id="name"
              class="bg-background-light-2 text-primary mt-2 w-full rounded-lg p-3"
              name="name"
              required
              type="text"
            />
          </div>
          <div class="mb-4">
            <label class="text-primary block text-lg" for="email">Email</label>
            <input
              id="email"
              class="bg-background-light-2 text-primary mt-2 w-full rounded-lg p-3"
              name="email"
              required
              type="email"
            />
          </div>
          <div class="mb-4">
            <label class="text-primary block text-lg" for="message"
              >Message</label
            >
            <textarea
              id="message"
              class="bg-background-light-2 text-primary mt-2 w-full rounded-lg p-3"
              name="message"
              required
              rows="5"
            ></textarea>
          </div>
          <button
            class="bg-button-primary text-primary hover:bg-text-secondary w-full rounded-lg py-3 font-semibold"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

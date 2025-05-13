<template>
  <div class="relative w-full overflow-hidden">
    <section
      class="min-h-screen w-full flex flex-col items-center justify-center"
    >
      <h1 class="text-4xl font-bold text-center text-primary">Contact</h1>
      <div class="mt-10 w-1/3">
        <form action="#" method="POST">
          <div class="mb-4">
            <label class="block text-lg text-primary" for="name">Name</label>
            <input
              id="name"
              class="w-full p-3 mt-2 rounded-lg bg-background-light-2 text-primary"
              name="name"
              required
              type="text"
            />
          </div>
          <div class="mb-4">
            <label class="block text-lg text-primary" for="email">Email</label>
            <input
              id="email"
              class="w-full p-3 mt-2 rounded-lg bg-background-light-2 text-primary"
              name="email"
              required
              type="email"
            />
          </div>
          <div class="mb-4">
            <label class="block text-lg text-primary" for="message"
              >Message</label
            >
            <textarea
              id="message"
              class="w-full p-3 mt-2 rounded-lg bg-background-light-2 text-primary"
              name="message"
              required
              rows="5"
            ></textarea>
          </div>
          <button
            class="w-full py-3 rounded-lg bg-button-primary text-primary hover:bg-text-secondary font-semibold"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

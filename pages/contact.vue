<template>
  <div class="relative w-full overflow-hidden">
    <section class="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-center text-primary">Contact</h1>
      <div class="mt-10 w-1/3">
        <form action="#" method="POST">
          <div class="mb-4">
            <label for="name" class="block text-lg text-primary">Name</label>
            <input type="text" id="name" name="name"
                   class="w-full p-3 mt-2 rounded-lg bg-background-light-2 text-primary" required/>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-lg text-primary">Email</label>
            <input type="email" id="email" name="email"
                   class="w-full p-3 mt-2 rounded-lg bg-background-light-2 text-primary" required/>
          </div>
          <div class="mb-4">
            <label for="message" class="block text-lg text-primary">Message</label>
            <textarea id="message" name="message" rows="5"
                      class="w-full p-3 mt-2 rounded-lg bg-background-light-2 text-primary"
                      required></textarea>
          </div>
          <button type="submit"
                  class="w-full py-3 rounded-lg bg-button-primary text-primary hover:bg-text-secondary font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

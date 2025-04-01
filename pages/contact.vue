<template>
  <div class="py-20">
    <h1 class="text-4xl font-bold text-center text-white">Contact</h1>
    <div class="mt-10 max-w-lg mx-auto">
      <form action="#" method="POST">
        <div class="mb-4">
          <label for="name" class="block text-lg text-white">Name</label>
          <input type="text" id="name" name="name"
                 class="w-full p-3 mt-2 rounded-lg bg-[var(--color-secondary-dark)] text-white" required/>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-lg text-white">Email</label>
          <input type="email" id="email" name="email"
                 class="w-full p-3 mt-2 rounded-lg bg-[var(--color-secondary-dark)] text-white" required/>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-lg text-white">Message</label>
          <textarea id="message" name="message" rows="5"
                    class="w-full p-3 mt-2 rounded-lg bg-[var(--color-secondary-dark)] text-white" required></textarea>
        </div>
        <button type="submit" class="w-full py-3 rounded-lg bg-[var(--color-primary-light)] text-black font-semibold">
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>

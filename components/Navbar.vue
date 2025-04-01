<template>
  <nav class="bg-[#1d3351] p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink href="/" class="text-xl font-bold">Borys.dev</NuxtLink>
      <ul class="flex space-x-4">
        <li>
          <NuxtLink href="/projects" class="hover:text-gray-300">Projects</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/services" class="hover:text-gray-300">Services</NuxtLink>
        </li>
        <li>
          <NuxtLink href="/contact" class="hover:text-gray-300">Contact</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<
<template>
  <ClientOnly>
    <Renderer>
      <Scene>
        <PointLight :position="{ y: 50, z: 50 }"/>
        <Box>
          <LambertMaterial/>
        </Box>
      </Scene>
    </Renderer>
  </ClientOnly>
</template>

<script setup>
import {
  Renderer,
  Scene,
  PointLight,
  Box,
  LambertMaterial
} from 'troisjs';
</script>

<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-project-header">
    <img :src="blok.asset_image.filename" :alt="blok.asset_image.alt">
    <div class="meta">
      <nuxt-link to="/">
        <svg viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 10.5C32.8284 10.5 33.5 11.1716 33.5 12C33.5 12.8284 32.8284 13.5 32 13.5V10.5ZM0.93917 13.0607C0.353384 12.4749 0.353384 11.5251 0.93917 10.9393L10.4851 1.3934C11.0709 0.807612 12.0206 0.807612 12.6064 1.3934C13.1922 1.97918 13.1922 2.92893 12.6064 3.51472L4.12115 12L12.6064 20.4853C13.1922 21.0711 13.1922 22.0208 12.6064 22.6066C12.0206 23.1924 11.0709 23.1924 10.4851 22.6066L0.93917 13.0607ZM32 13.5H1.99983V10.5H32V13.5Z" fill="black" />
        </svg>
      </nuxt-link>
      <span>{{ blok.text_title }}</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100svh;
}

img {
  position: absolute;
  inset: 0;
  z-index: -1;
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta {
  position: absolute;
  left: to-rem(100);
  bottom: to-rem(5);
  display: flex;
  align-items: center;
  gap: to-rem(20);

  a {
    width: to-rem(20);
    transform: translateY(-1px);
  }
}
</style>

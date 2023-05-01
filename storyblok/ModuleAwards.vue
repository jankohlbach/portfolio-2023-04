<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'

defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-awards">
    <div class="temp-watermark">
      www
    </div>
    <div class="wrap">
      <h2>{{ blok.text_pre }}</h2>

      <div class="awards">
        <h3 v-for="award in (blok.blocks_awards as SbBlokData[])" :key="award._uid" class="award">
          {{ award.text }}
        </h3>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/functions' as *;

section {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin-top: rem(320);
  background-color: var(--c-dark);
  color: var(--c-light);
}

.temp-watermark {
  position: absolute;
  inset: 0;
  margin: auto;
  text-align: center;
  line-height: 100vh;
  font-size: 30vmin;
  opacity: 0.2;
}

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding-block: rem(100);
  margin-inline: var(--s-s);
}

h2 {
  font-size: var(--fs-base);
  font-weight: 200;
}

h3 {
  font-size: var(--fs-m);
  font-weight: 100;
  line-height: 1.5;
}
</style>

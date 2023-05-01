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
  <section class="module-skills">
    <h2>{{ blok.text_pre }}</h2>

    <div v-for="skill in (blok.blocks_skills as SbBlokData[])" :key="skill._uid" class="skill">
      <h3>{{ skill.text_title }}</h3>

      <div class="tags">
        <span v-for="tag in (skill.multioptions_tags as SbBlokData[])" :key="tag._uid">{{ tag }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/functions' as *;
@use '~/assets/styles/mixins' as *;

section {
  margin-inline: var(--s-s);
  margin-top: rem(320);
}

h2 {
  font-size: var(--fs-base);
  font-weight: 200;
}

.skill {
  margin-top: var(--s-l);

  @include has-hover {
    &:hover .tags {
      opacity: 1;
    }
  }
}

h3 {
  font-size: var(--fs-xxl);
  font-weight: 100;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1em 1.2em;
  margin-top: rem(20);

  @include has-hover {
    opacity: 0;
  }

  span {
    padding: 1em 2em;
    border: 1px solid var(--c-dark);
    border-radius: 2em;
    font-size: var(--fs-s);
  }
}
</style>

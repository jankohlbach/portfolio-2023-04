<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-project-intro">
    <div class="text richtext richtext-simple" v-html="renderRichText(blok.richtext_text)" />
    <div class="intro">
      <h2>{{ blok.textarea_intro }}</h2>
      <div class="tags">
        <span v-for="tag in blok.multioptions_areas" :key="tag._uid">{{ tag }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: rem(60) rem(100);

  @media (min-width: 960px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.text {
  flex-shrink: 2;
  max-width: min(rem(450), 90%);
}

.intro {
  flex-shrink: 1;
  margin-top: rem(60);
  max-width: rem(960);

  @media (min-width: 960px) {
    margin-top: rem(160);
  }
}

h2 {
  max-width: min(rem(520), 90%);
  font-size: var(--fs-m);
  font-weight: 100;

  @media (min-width: 960px) {
    max-width: rem(900);
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1em 1.2em;
  margin-top: rem(40);

  span {
    padding: 1em 2em;
    border: 1px solid var(--c-dark);
    border-radius: 2em;
    font-size: var(--fs-s);
  }
}
</style>

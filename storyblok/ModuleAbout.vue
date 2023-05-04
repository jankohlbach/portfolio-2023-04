<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-about">
    <img :src="blok.asset_image.filename" :alt="blok.asset_image.alt">
    <div class="richtext" v-html="renderRichText(blok.richtext_text)" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-top: rem(180);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: rem(80);
}

img {
  max-width: min(rem(520), 100%);
  max-height: rem(800);
  object-fit: cover;

  @media (min-width: 960px) {
    margin-top: rem(200);
  }
}

.richtext {
  width: 100%;
  max-width: max(rem(380), 70vw);

  @media (min-width: 960px) {
    width: 40%;
    max-width: rem(450);
  }
}
</style>

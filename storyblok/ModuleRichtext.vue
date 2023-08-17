<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-richtext">
    <div class="richtext" v-html="renderRichText(blok.richtext_text)" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-block: to-rem(180) to-rem(320);
}

div {
  max-width: min(to-rem(960), 90%);

  @media (min-width: 768px) {
    margin: auto;
  }
}
</style>

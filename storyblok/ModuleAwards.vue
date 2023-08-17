<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <section class="module-awards">
    <AwardsShader />
    <div class="wrap">
      <h2>{{ blok.text_pre }}</h2>

      <div class="awards">
        <h3 v-for="award in blok.blocks_awards" :key="award._uid" class="award">
          {{ award.text }}
        </h3>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin-top: to-rem(320);
  background-color: var(--c-dark);
  color: var(--c-light);
}

.wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding-block: to-rem(100);
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

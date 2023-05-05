<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js/dist/types'

defineProps({
  blok: {
    type: Object,
    default: null
  }
})

const watermark = ref('')
const links = ref([])

const changeWatermark = (e: MouseEvent) => {
  watermark.value = (e.target as HTMLElement | null)?.dataset.abbr || ''
}

const removeWatermark = () => {
  watermark.value = ''
}

onMounted(() => {
  links.value.forEach((link: HTMLElement) => {
    link.addEventListener('mouseenter', changeWatermark)
    link.addEventListener('mouseleave', removeWatermark)
  })
})

onBeforeUnmount(() => {
  links.value.forEach((link: HTMLElement) => {
    link.removeEventListener('mouseenter', changeWatermark)
    link.removeEventListener('mouseleave', removeWatermark)
  })
})
</script>

<template>
  <section class="module-external-links">
    <div class="temp-watermark">
      {{ watermark }}
    </div>

    <h2>{{ blok.text_pre }}</h2>

    <nav class="links-external">
      <ul class="links-external__list">
        <li v-for="item in (blok.blocks_links_external as SbBlokData[])" ref="links" :key="item._uid" :data-abbr="(<any>item.link).abbr">
          <nuxt-link :to="(<any>item.link).url" target="_blank">
            {{ (<any>item.link).title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  margin-inline: var(--s-s);
  margin-top: rem(320);

  @media (min-width: 960px) {
    min-height: calc(100vh - rem(80));
  }
}

.temp-watermark {
  position: absolute;
  inset: 0;
  margin: auto;
  text-align: center;
  line-height: 3;
  font-size: 30vmin;
  opacity: 0.2;
}

h2 {
  font-size: var(--fs-base);
  font-weight: 200;
}

.links-external {
  width: 100%;
  margin-block: rem(100) rem(200);

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16) rem(50);
    justify-content: space-between;
    list-style-type: none;
  }

  li {
    width: calc(50% - rem(25));
  }

  a {
    text-transform: uppercase;
  }

  @media (min-width: 960px) {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0;
    margin: 0;

    &__list {
      flex-wrap: nowrap;
    }

    li {
      width: auto;
    }
  }
}
</style>

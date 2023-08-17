<script setup lang="ts">
defineProps({
  blok: {
    type: Object,
    default: null
  }
})

const texturePath = ref('')
const links = ref([])

const changeWatermark = (e: MouseEvent) => {
  texturePath.value = `/textures/links-texture-${(e.target as HTMLElement | null)?.dataset.abbr?.toLowerCase()}.svg`
}

const removeWatermark = () => {
  texturePath.value = ''
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
    <div class="shader">
      <LinksShader :texture="texturePath" />
    </div>

    <div class="content">
      <h2>{{ blok.text_pre }}</h2>

      <nav class="links-external">
        <ul class="links-external__list">
          <li v-for="item in blok.blocks_links_external" ref="links" :key="item._uid" :data-abbr="item.link.abbr">
            <nuxt-link :to="item.link.url" target="_blank">
              {{ item.link.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  margin-top: to-rem(320);
}

.shader {
  display: none;

  @media (min-width: 960px) {
    display: block;
  }
}

.content {
  position: relative;
  margin-inline: var(--s-s);

  @media (min-width: 960px) {
    min-height: 100vh;
  }
}

h2 {
  font-size: var(--fs-base);
  font-weight: 200;

  @media (min-width: 960px) {
    padding-top: to-rem(80);
  }
}

.links-external {
  width: 100%;
  margin-block: to-rem(100) to-rem(200);

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: to-rem(16) 0;
    justify-content: space-between;
    list-style-type: none;
  }

  li {
    width: calc(50% - to-rem(25));

    @media (min-width: 960px) {
      &:first-child a {
        padding-left: 0;
      }

      &:last-child a {
        padding-right: 0;
      }
    }
  }

  a {
    text-transform: uppercase;

    @media (min-width: 960px) {
      padding: to-rem(50) to-rem(40);
    }
  }

  @media (min-width: 960px) {
    position: absolute;
    top: 55%;
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

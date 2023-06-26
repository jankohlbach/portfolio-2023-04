<script setup lang="ts">
import VirtualScroll from 'virtual-scroll'

const props = defineProps({
  projects: {
    type: Object,
    default: null
  },
  changeIndex: {
    type: Function,
    default: null
  }
})

useHead({
  bodyAttrs: {
    class: 'no-overscroll'
  }
})

const home = useHome()

const linksContainer = ref()
const pauseScrolling = ref(false)

let scroller: any
let links: NodeListOf<HTMLAnchorElement>

const setTransform = () => {
  linksContainer.value.style.transform = `
    translateY(calc(
      50vh - ${links[0].clientHeight / 2}px - ${home.value.currentIndex * links[0].clientHeight}px
    ))
  `
}

watch(() => home.value.currentIndex, setTransform)

onMounted(() => {
  links = linksContainer.value.querySelectorAll('a')

  setTimeout(() => {
    setTransform()
  }, 600)

  scroller = new VirtualScroll()

  scroller.on((event: any) => {
    if (!pauseScrolling.value && Math.abs(event.deltaY) > 20) {
      const change = Math.sign(event.deltaY)
      props.changeIndex(home.value.currentIndex - change)
      pauseScrolling.value = true

      setTimeout(() => {
        pauseScrolling.value = false
      }, window.matchMedia('(hover: hover)').matches ? 1000 : 500)
    }
  })
})

onBeforeUnmount(() => {
  scroller.destroy()
})
</script>

<template>
  <div class="container-index">
    <div ref="linksContainer" class="links-container">
      <nuxt-link v-for="project, i in projects" :key="project._uid" :to="project.link_project.story.url" :class="{'active': home.currentIndex === Number(i)}">
        {{ project.link_project.story.name }}
      </nuxt-link>
    </div>
  </div>
  <img class="image image-main" :src="projects[home.currentIndex].asset_image.filename" :alt="projects[home.currentIndex].asset_image.alt">
  <img class="image image-previous" :src="projects[home.currentIndex - 1]?.asset_image.filename" :alt="projects[home.currentIndex - 1]?.asset_image.alt">
  <img class="image image-next" :src="projects[home.currentIndex + 1]?.asset_image.filename" :alt="projects[home.currentIndex + 1]?.asset_image.alt">
  <span class="current-project">{{ projects[home.currentIndex].text_title_long }}</span>
</template>

<style lang="scss" scoped>
.container-index {
  position: fixed;
  inset: 0;
  height: 100svh;
  color: var(--c-light);
  mix-blend-mode: difference;
}

.links-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform .7s;
}

a {
  font-size: var(--fs-xl);

  &.active {
    text-decoration: underline;
  }
}

.image {
  position: fixed;
  z-index: -1;
  object-fit: cover;

  &-main {
    inset: 0;
    margin: auto;
    aspect-ratio: 450 / 250;
    max-width: min(90%, rem(450));
  }

  &-previous,
  &-next {
    display: none;
    aspect-ratio: 135 / 90;
    max-width: rem(135);
    filter: blur(2px);

    @media (min-width: 768px) {
      display: block;
    }
  }

  &-previous {
    top: 70vh;
    left: clamp(1.25rem, -1.538rem + 11.896vw, 11.25rem);
  }

  &-next {
    top: 15vh;
    right: clamp(1.25rem, -1.538rem + 11.896vw, 11.25rem);
  }
}

.current-project {
  position: fixed;
  left: var(--s-s);
  bottom: rem(5);
  z-index: 1;
  color: var(--c-light);
  mix-blend-mode: difference;
}
</style>

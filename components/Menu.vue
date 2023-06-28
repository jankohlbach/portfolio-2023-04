<script setup lang="ts">
const sb = useStoryblokApi()
const { data: { story: { content } } } = await sb.get(
  'cdn/stories/globals',
  { version: <'draft'|'published'>useRuntimeConfig().public.contentVersion, resolve_links: 'url' }
)

const menu = useMenu()
</script>

<template>
  <aside v-if="menu.isOpen" class="menu" :class="{'open': menu.isOpen}">
    <Noise />
    <ShaderBackground />
    <nav class="links-internal">
      <ul class="links-internal__list">
        <li v-for="item in content.blocks_links_internal" :key="item._uid">
          <nuxt-link v-if="item.link.linktype === 'url'" :to="item.link.url">
            {{ item.link.title }}
          </nuxt-link>
          <!-- TODO: temp, add lab and activate -->
          <!-- <nuxt-link v-else :to="`/${item.link.story.url}`">
            {{ item.link.story.name }}
          </nuxt-link> -->
          <nuxt-link v-else :to="`/${item.link.story?.url || '#'}`" :class="{'disabled': !item.link.story}">
            {{ item.link.story?.name || 'Lab' }}
            <sub v-if="!item.link.story">(coming)</sub>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <nav class="links-external">
      <ul class="links-external__list">
        <li v-for="item in content.blocks_links_external" :key="item._uid">
          <nuxt-link :to="item.link.url" target="_blank">
            {{ item.link.title }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="footer">
      <nav>
        <ul class="links-meta">
          <li v-for="item in content.blocks_links_meta" :key="item._uid">
            <nuxt-link :to="item.link.story.url">
              {{ item.link.story.name }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        <span>©{{ `${new Date().getFullYear()}` }}</span>
        <span>🧑‍💻 <nuxt-link to="/">Jan Kohlbach</nuxt-link></span>
        <span>🖌️ <nuxt-link to="https://undesigned.studio" target="_blank">undesigned.studio</nuxt-link></span>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  inset: 0;
  z-index: var(--zi-menu);
  display: none;
  background: var(--c-light);

  &.open {
    display: block;
  }
}

ul {
  list-style-type: none;
}

.links-internal {
  width: 100%;
  padding: var(--s-s);
  margin-top: max(rem(140), 20vmin);

  &__list {
    display: flex;
    flex-direction: column;
  }

  a {
    font-size: var(--fs-xl);
    line-height: 1.3;
    text-transform: uppercase;

    // TODO: temp, add lab and activate
    &.disabled {
      position: relative;
      opacity: 0.2;
      pointer-events: none;

      sub {
        position: absolute;
        top: 15%;
        white-space: nowrap;
        font-size: 0.2em;
      }
    }
  }

  @media (min-width: 960px) {
    position: absolute;
    top: 2%;
    left: 0;
    height: 100%;
    padding: 0;
    margin-top: 0;

    &__list {
      justify-content: space-between;
      align-items: center;
      height: 96%;
    }

    li {
      &:nth-child(1) {
        transform: translateX(-5%);
      }

      &:nth-child(2) {
        transform: translateX(90%);
      }

      &:nth-child(3) {
        transform: translateX(-180%);
      }

      &:nth-child(4) {
        transform: translateX(17%);
      }
    }
  }
}

.links-external {
  width: 100%;
  padding: var(--s-s);

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16) rem(50);
    justify-content: space-around;
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

    &__list {
      flex-wrap: nowrap;
    }

    li {
      width: auto;
    }
  }
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--s-s);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  line-height: 1.1;
  pointer-events: none;

  .links-meta {
    display: flex;
    pointer-events: all;

    li:last-child {
      a::after {
        content: '';
      }
    }

    a {
      text-transform: uppercase;

      &::after {
        content: '·';
        padding-inline: rem(5);
      }
    }
  }

  .copyright {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    pointer-events: all;

    a {
      display: inline-block;
    }
  }
}
</style>

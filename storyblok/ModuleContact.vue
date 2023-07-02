<template>
  <section class="module-contact">
    <div class="wrap">
      <h2>Want to work on something together, have a request or just wanna say hi?</h2>
      <a href="mailto:hi@jankohlbach.com">→ hi@jankohlbach.com</a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-inline: var(--s-s);
  margin-top: rem(180);
}

.wrap {
  max-width: min(rem(960), 90%);

  @media (min-width: 768px) {
    margin: auto;
  }
}

h2 {
  font-size: var(--fs-m);
  font-weight: 100;
}

a {
  display: inline-block;
  margin-top: rem(20);
  font-size: var(--fs-m);
}
</style>

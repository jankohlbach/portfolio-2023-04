<template>
  <div class="layout">
    <Noise />
    <Menu />
    <Header />

    <slot />

    <PageTransition />
    <Intro />
  </div>
</template>

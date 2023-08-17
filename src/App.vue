<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import HelloWorld from './components/HelloWorld.vue';
  // import { createEditor } from './rete';
  import { createEditor } from './rete/editor';

  const reteRef = ref<HTMLElement | null>(null);

  onMounted(async () => {
    if (reteRef.value) {
      // console.log(reteRef.value);
      await createEditor(reteRef.value);
    }
  });
</script>

<template>
  <div id="app">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="Rete.js v2" />
      </div>
    </header>

    <main style="width: 650px" class="rete" ref="reteRef"></main>
  </div>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  .rete {
    position: relative;
    height: 90vh;
    font-size: 1rem;
    background: white;
    border-radius: 1em;
    text-align: left;
    border: 3px solid #55b881;
    line-height: 1;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>

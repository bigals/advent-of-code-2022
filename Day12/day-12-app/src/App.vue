<template>
  <div>
    <h1 v-if="solution1">Answer 1</h1>
    <p>{{ solution1 }}</p>

    <h1 v-if="solution2">Answer 2</h1>
    <p>{{ solution2 }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDay12Composition from "./use/day12Composition";

export default defineComponent({
  name: "App",
  setup() {
    const { day12FirstSolution, day12SecondSolution } = useDay12Composition();
    const solution1 = day12FirstSolution();
    const solution2 = day12SecondSolution();

    return {
      solution1,
      solution2,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

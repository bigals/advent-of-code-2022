<template>
  <div>
    <h1 v-if="solution1">Answer 1</h1>
    <p>{{ solution1 }}</p>

    <h1 v-if="solution2">Answer 2</h1>

    <div class="pretty-grid">
      <p v-for="(line, index) in solution2" :key="index">{{ line }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDay10Composition from "./use/day10Composition";

export default defineComponent({
  name: "App",
  setup() {
    const { day10FirstSolution, day10SecondSolution } = useDay10Composition();
    const solution1 = day10FirstSolution();
    const solution2 = day10SecondSolution();

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

.pretty-grid {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

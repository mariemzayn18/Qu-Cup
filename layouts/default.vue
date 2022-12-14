<template>
  <v-app fluid class="bg pa-0 ma-0">
    <v-main>
      <NavBar />
      <Nuxt />
    </v-main>

   </v-app>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
 components: {
    NavBar,
   },
  name: "DefaultLayout",
};
</script>
<style scoped>
.bg{
  background-color:#6e1131 ;
}
</style>


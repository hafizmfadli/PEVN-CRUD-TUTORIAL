<template>
  <v-app>
    <Navbar />
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>

body{
  height: 100000px;
}

</style>

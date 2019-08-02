<template>
  <div id="app">
    <html2pdf-demo></html2pdf-demo>
  </div>
</template>

<script>
import html2pdfDemo from './components/html2pdf';

export default {
  name: 'app',
  components: {
    html2pdfDemo,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="html2pdf">
    <button class="btn" @click="download">下载</button>
    <div class="pdf-container">
      <div v-for="(item, index) in data" :key="index">
      <p>{{ item.text }}</p>
      <img :src="item.imgUrl">
    </div>
    </div>
  </div>
</template>

<script>
import data from './data';
import helper from './helper';

export default {
  data() {
    return {
      data
    }
  },
  methods: {
    async download() {
      const el = document.querySelector('.pdf-container');
      try {
        await helper.downloadPdf(el, 'pdf-demo');
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: 500;
  user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
</style>

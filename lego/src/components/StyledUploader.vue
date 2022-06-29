<template>
  <uploader
    class="styled-uploader"
    action="/utils/upload-img" 
    :showUploadList="false"
    :beforeUpload="commonUploadCheck"
    @success="(data) => {handleUploadSuccess(data.resp, data.file.raw)}"
  >
    <div class="uploader-container">
      <FileImageOutlined />
      <h4>{{text}}</h4>
    </div>
    <template #loading>
      <div class="uploader-container">
        <LoadingOutlined spin/>
        <h4>上传中</h4>
      </div>
    </template>
    <template #uploaded="dataProps">
      <div class="uploader-container">
        <img :src="dataProps.uploadedData.data.urls[0]" v-if="showUploaded">
        <template v-else>
          <FileImageOutlined />
          <h4>{{text}}</h4>
        </template>
      </div>
    </template>
  </uploader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { commonUploadCheck } from '../helper'
import Uploader from './Uploader.vue'
export default defineComponent({
  props: {
    text: {
      type: String,
      default: '上传图片'
    },
    showUploaded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Uploader,
    FileImageOutlined,
    LoadingOutlined,
  },
  emits: ['success'],
  setup(props, { emit }) {
    const handleUploadSuccess = (resp: any, file: File) => {
      emit('success', { resp, file })
    }
    return {
      commonUploadCheck,
      handleUploadSuccess
    }
  }
})
</script>

<style lang="scss">
.styled-uploader {
  .uploader-container {
    width: 100px;
    padding: 10px;
    color: #ffffff;
    background: #1890ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .uploader-container:hover {
    background: #40a9ff;
  }
  .uploader-container h4 {
    color: #ffffff;
    margin-bottom: 0;
    margin-left: 10px;
  }
  .uploader-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
} 
</style>
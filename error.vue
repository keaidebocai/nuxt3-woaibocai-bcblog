<template>
    <div class="error-404">
      <h1 style="font-size: 10vh;">404 - 页面正在研发中...</h1>
      <p style="font-size: 5vh;">很抱歉，页面被菠菜吃掉了...</p>
      <button @click="goBack">返回上一页</button>
    </div>
  </template>
  
  <script setup>
  const router = useRouter()
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .error-404 {
    margin-top: 40vh;
    text-align: center;
    padding: 50px;
  }
  
  button {
    width: 10vh;
    height: 5vh;
    background-color: #4caf50;
    color: white;
    border-radius: 25px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  
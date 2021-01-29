<template>
  <div>
    <video-background
      src="http://test.com:81/videos/nobody.mp4"
      style="height: 100vh;"
    >
      <div class="container">
        <h1 class="title">Добро пожаловать на хостинг трейлеров</h1>
        <router-link :to="{ name: 'films' }" class="button"
          >Перейти к трейлерам</router-link
        >
      </div>
    </video-background>
  </div>
</template>

<script>
import VideoBackground from "vue-responsive-video-background-player";
export default {
  name: "Home",
  components: {
    "video-background": VideoBackground,
  },
};
</script>

<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Marck+Script&display=swap");
body {
  margin: 0;
  padding: 0;
}
.wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/main.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  max-width: 1000px;
  text-align: center;
  height: 100%;
}
.title {
  font-family: "Marck Script";
  font-weight: 400;
  font-size: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  user-select: none;
}
.button {
  font-family: "Arial", sans-serif;
  box-shadow: 0px 10px 14px -7px #347327;
  background: linear-gradient(to bottom, #59b36e 5%, #409940 100%);
  background-color: #59b36e;
  border-radius: 8px;
  border: 0;
  outline: none;
  user-select: none;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  padding: 13px 32px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #578a3e;
}
.button:hover {
  background: linear-gradient(to bottom, #409940 5%, #59b36e 100%);
  background-color: #409940;
}
.button:active {
  position: relative;
  top: 1px;
}
</style>

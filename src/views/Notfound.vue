<template>
  <div class="wrapper">
    <div class="gif"></div>
    <div class="title">
      404 Ничего не найдено
    </div>
    <router-link :to="{ name: 'home' }" class="button">По домам?</router-link>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Not Found",
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap");
.wrapper {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/images/notFound/lol.gif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.title {
  padding-top: 3vw;
  background-color: rgba(0, 0, 0, 0.05);
  color: white;
  font-family: "Stalinist One", cursive;
  font-size: 3vw;
  text-align: center;
}
.button {
  position: absolute;
  left: 50%;
  bottom: 5vh;
  transform: translateX(-50%);
  cursor: pointer;
  box-shadow: inset 0px 34px 0px -15px #ede9e8;
  background-color: #c4d4c3;
  border: 1px solid #e0dcd7;
  display: block;
  cursor: pointer;
  color: #000000;
  font-family: Arial;
  font-size: 18px;
  font-weight: bold;
  padding: 9px 23px;
  text-decoration: none;
  text-shadow: 0px -1px 0px #8c6e69;
  width: 150px;
  text-align: center;
  margin-bottom: 25px;
}
.button:hover {
  background-color: #dbd3d2;
}
.gif {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 50vh;
  width: 50vh;
  background-image: url("../assets/images/notFound/travolta.gif");
  background-size: cover;
  background-position: center;
}
</style>

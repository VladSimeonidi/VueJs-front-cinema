<template>
  <div class="wrapper">
    <div class="gif"></div>
    <h1 class="title">
      Ничего не найдено
    </h1>
    <router-link :to="{ name: 'home' }" class="button">По домам?</router-link>
  </div>
</template>
<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap");
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/notFound/lol.gif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.title {
  background-color: rgba(0, 0, 0, 0.05);
  color: white;
  font-family: "Stalinist One", cursive;
  font-size: 5vw;
  margin-bottom: auto;
}
.button {
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
.button:active {
  position: relative;
  top: 1px;
}
</style>

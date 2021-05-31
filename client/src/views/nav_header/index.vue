<template>
  <div id="nav">
    <router-link to="/status" id="logo">
      <img src="@/assets/logo/ipfs.png" alt="ipfs" />
      <div>IPFS</div>
    </router-link>
    <!-- <router-link to="/status">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconstatus"></use>
      </svg>
      状态
    </router-link> -->
    <router-link to="/files">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconfiles"></use>
      </svg>
      文件
    </router-link>
    <!-- <router-link to="/nodes">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconnodes"></use>
      </svg>
      节点</router-link
    > -->
  </div>
</template>

<style lang="scss" scoped>
#nav {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  width: 10rem;
  background-color: #0b3a53;
}
a {
  color: #839ba7;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &.router-link-exact-active {
    color: #fbfcfc;
    background-color: #244e65;
    &::before {
      display: block;
      width: 0.4rem;
      height: 5rem;
      content: "";
      position: absolute;
      left: 0;
      background-color: #668393;
    }
  }
  svg {
    font-size: 30px;
    margin: 0 0 10px 0;
  }
}
#logo {
  font-size: 30px;
  color: #fff;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  background-color: transparent;
  img {
    width: 50px;
    margin: 10px;
  }
  &::before {
    background-color: transparent;
  }
}
</style>
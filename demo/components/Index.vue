<template>
  <div>
    <!-- <scroller css-class="custom-clazz"> -->
      <h1 class="plugin-name">
        Simple Scroll
      </h1>
      <p class="for-vue-js">for Vue.js 2.0</p>

      <router-link class="row grey-bg" tag="label" to="/refreshAndInfinite">
        Refresh & Infinite
        <img src="../assets/arrow-right.png" class="arrow-right">
      </router-link>

      <router-link class="row" tag="label" to="/tabRefreshAndInfinite">
        tab & Refresh & Infinite
        <img src="../assets/arrow-right.png" class="arrow-right">
      </router-link>

      <router-link class="row  grey-bg" tag="label" to="/LoadMore">
        Load More
        <img src="../assets/arrow-right.png" class="arrow-right">
      </router-link>

      <router-link class="row" tag="label" to="/customSpinner">
        Custom Spinner
        <img src="../assets/arrow-right.png" class="arrow-right">
      </router-link>

      <router-link class="row grey-bg" tag="label" to="/prestrainLoad">
        Custom Load Distance
        <img src="../assets/arrow-right.png" class="arrow-right">
      </router-link>
    </scroller>

    <!-- github corner -->

  </div>
</template>

<style>
  .plugin-name {
    margin: 0;
    padding-top: 60px;
    text-align: center;
    color: #666;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  .for-vue-js {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }

  .plugin-name, .for-vue-js {
    font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  }

  .row {
    display: block;
    width: 100%;
    height: 50px;
    padding: 10px 0 10px 15px;
    font-size: 16px;
    line-height: 30px;
    color: #444;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }

  .arrow-right {
    width: 8px;
    height: 16px;
    float: right;
    margin-top: 7px;
    margin-right: 15px;
  }

  // github corner
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

</style>

<template>
<div id="brand-story-container">
  <p>BrandStory</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <router-link class="link-underline" to="/story">
  <p id="goDetail-link">자세히 보러가기 ></p>
  </router-link>
</div>
</template>

<script>
export default {

}
</script>

<style>
  #brand-story-container{
    border: 1px solid black;
    border-radius: 10px;
    margin: 20px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
}
#brand-story-container #goDetail-link{
  font-size: 1rem;
  color: black;
  text-decoration: none;
  font-style: none;

}
</style>
<template>
<div>
  <div id="nav">
    <router-link to="/">서베이지 Surveasy 로고</router-link> 

    <div class="nav-links">
      <router-link to="/service"><span class="nav-element">서비스 이용</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/surveylist"><span class="nav-element">설문 리스트</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/knowhow"><span class="nav-element">설문 노하우</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/story"><span class="nav-element">브랜드 스토리</span></router-link> 
      <span class="nav-element-">|</span>
      <router-link to="/contact"><span class="nav-element">문의</span></router-link> 
    </div>
    
    <router-link to="/login"><span class="nav-element">LOGIN</span></router-link> 
    
  </div>
  <router-view/>
</div>
</template>



<style>
body {
  margin: 0;
}

.nav-links {
  flex: 4;
}

.nav-links a {
  padding-left: 30px;
  padding-right: 30px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  border-bottom: 1px solid black;
  height: 40px;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 30px;
  text-decoration: none;
  
}

#nav .nav-element:hover {
  color: #42b983;
}

.link-underline{
  text-decoration: none;
}

.link-underline:hover{
  text-decoration: underline;
}
</style>

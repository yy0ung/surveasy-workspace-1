<template>
<div>
  <div id="nav">
    <router-link to="/">서베이지 Surveasy 로고</router-link> 

    <div class="nav-links">
      <router-link to="/service">서비스 이용</router-link> 
      <router-link to="/surveylist">설문 리스트</router-link> 
      <router-link to="/knowhow">설문 노하우</router-link> 
      <router-link to="/story">브랜드 스토리</router-link> 
      <router-link to="/contact">문의</router-link> 
    </div>
    
    <router-link to="/login">LOGIN</router-link> 
    
  </div>
  <router-view/>

  <div id="footer">
    <p>footer</p>
  </div>
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
  padding: 30px;
  border-bottom: 1px solid black;
  height: 40px;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 10px;
  text-decoration: none;
  
}

#nav a:hover {
  color: #42b983;
}

#footer {
  height: 100px;
}
</style>

<template>
<div class="login">
  <img class="checkimg" src="@/assets/check.png" width="50">
  <div class="loginform">
    <li>
      <input type="email" placeholder="아이디 (이메일)">
    </li>
    <li>
      <input type="password" placeholder="비밀번호">
    </li>
    <li>
      <button class="loginbtn">로그인하기</button>
    </li>
    
  </div>
  <div class="sublogin">
    <router-link to="/find-pw"><span class="sublogin-element">비밀번호 찾기</span></router-link> 
    <span class="sublogin-element">|</span> 
    <router-link to="/register"><span class="sublogin-element">회원가입</span></router-link> 
     
    
  </div>
  
</div>
  
 
  
  
</template>

<script>
export default {

}
</script>

<style>
.login {
  margin: 100px;
}
.loginform li {
  list-style-type: none;
  margin: 10px;
}
.loginform li input {
  width: 170px;
  border: none;
  padding: 4px;
  margin: 7px;
  font-size: 3px;
  background-color: rgb(228, 228, 228);
}
.loginbtn {
  width: 80px;
  height: 20px;
  margin: 5px;
  color:#0CAE02;
  background-color: #fff;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 10px;
  cursor: pointer;
}
.loginbtn:hover {
  background-color: #0CAE02;
  color: #fff;
}
.sublogin {
  margin: 20px;
}
.sublogin .sublogin-element {
  font-size: 3px;
  text-decoration: none;
  margin: 10px;
}
</style>
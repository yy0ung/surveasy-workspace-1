<template>
<div id="Register">
  <h2>회원가입</h2>
  <form>
      <ul id="registerForm">
          <li>
              <ul class="cols">
                  <li class="col1">이메일 주소</li>
                  <li class="col2"><input type="email" id="email" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">비밀번호</li>
                  <li class="col2"><input type="password" id="password" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">비밀번호 확인</li>
                  <li class="col2"><input type="password" id="passwordcheck" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">닉네임</li>
                  <li class="col2"><input type="text" id="nickname" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">휴대폰 번호</li>
                  <li class="col2"><input type="tel" id="tel" required></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">유입경로</li>
                  <li class="col2">
                      <input type="radio" name="from" id="everytime">에브리타임
                      <input type="radio" name="from" id="blog">서베이지 네이버 블로그
                      <input type="radio" name="from" id="kakaotalk">카카오톡 단톡방
                      <input type="radio" name="from" id="instagram">서베이지 인스타그램
                      <input type="radio" name="from" id="search">인터넷 검색(구글 / 네이버 / 기타)
                  </li>
              </ul>
          </li>
        </ul>

     </form>
</div>
</template>

<script>
export default {

}
</script>

<style>
ul {
    list-style-type: none;
}
#registerForm {
    width: 500px;
    margin: 10px 0 0 50px;
}
.cols li {
    display: inline-block;
    margin-top: 5px;
}
.cols li.col1 {
    width: 70px;
    text-align: left;
    padding: 10px;
    font-size: 8px;
}
.cols li.col2 {
    width: 300px;
    font-size: 8px;
}
.cols li.col2 input {
    width: 250px;
    border: none;
    background-color: rgb(228, 228, 228);
}
.cols li.col2 .inflow .from {
    width: 120px;
    border: none;
    background-color: rgb(228, 228, 228);
}
</style>
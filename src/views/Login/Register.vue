<template>
<div id="Register">
  <h3 class="registertitle">회원가입</h3>
  <form class="form-center">

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
                      <div class="radio-container">
                      <div class="radio-item">
                          <span><input type="radio" class="radio" name="from" id="everytime">에브리타임</span>
                          <span><input type="radio" class="radio" name="from" id="kakaotalk">학과 카카오톡 단톡방</span>
                          <span><input type="radio" class="radio" name="from" id="search">인터넷 검색(구글 / 네이버 / 기타)</span>
                      </div>
                      <div class="radio-item">
                          <span><input type="radio" class="radio" name="from" id="blog">서베이지 네이버 블로그</span>                         
                          <span><input type="radio" class="radio" name="from" id="instagram">서베이지 인스타그램</span>
                      </div>                      
                      </div>
                  </li>
              </ul>
          </li>

     </form>
</div>
</template>

<script>
export default {

}
</script>

<style>
.registertitle {
    margin-top: 50px;
}
li {
    list-style-type: none;
}
.form-center {
    position: center;
}
.cols li {
    display: inline-block;
}
.cols li.col1 {
    width: 70px;
    text-align: left;
    padding: 10px;
    font-size: 8px;
}

.cols li.col2 {
    width: 420px;
    font-size: 8px;
}
.cols li.col2 input {
    width: 250px;
    border: none;
    background-color: rgb(228, 228, 228);
}
.cols li.col2 input.radio {
    width: 20px;
}
.cols li.col2 .inflow .from {
    width: 120px;
    border: none;
    background-color: rgb(228, 228, 228);
}
.radio-container {
    display: flex;
    margin-left: 75px;
}
.radio-item {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-right: 15px;
}

</style>
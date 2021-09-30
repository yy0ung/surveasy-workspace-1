<template>
  <div class="serviceOption-container">
    <p>service option</p>
    <label>옵션선택</label>
    <div>
      <select class="dropdown" name="respondent" required>
        <option selected>요구 응답수</option>
        <option value="30명">30명</option>
        <option value="31~35명">31~35명</option>
        <option value="36~40명">36~40명</option>
        <option value="41~45명">41~45명</option>
        <option value="46~60명">46~60명</option>
      </select>
      <select class="dropdown" name="time" required>
        <option selected>소요 시간</option>
        <option value="5분 이하">5분 이하</option>
        <option value="5분~10분">5분~10분</option>
        <option value="10분 이상">10분 이상</option>
      </select>
      <select class="dropdown" name="deadline" required>
        <option selected>마감 기한 지정</option>
        <option value="5분 이하">24시간 이하</option>
        <option value="5분~10분">24시간~48시간</option>
        <option value="10분 이상">48시간 이상</option>
      </select>
    </div>
    <div>
      <router-link to="/serviceinputform"><button class="goServiceInputForm-btn">설문 정보 입력하러 가기</button></router-link>
    </div>
      
    </div>
    
</template>

<script>
export default {

}
</script>

<style>
label {
  text-align: left;
  margin: 15px;
}
.serviceOption-container {
  width: 60%;
  height: 450px;
  border-radius: 10px;
  margin: 40px;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  background-color: rgb(209, 209, 209);
  border-radius: 10px;
}
.dropdown {
  margin: 5px;
  width: 70%;
  height: 30px;
  cursor: pointer;
}
.goServiceInputForm-btn {
  width: 70%;
  height: 20px;
  margin: 40px;
  color:#0CAE02;
  background-color: rgb(209, 209, 209);
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 10px;
  cursor: pointer;
}

</style>
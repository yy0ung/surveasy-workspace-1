<template>
  <div class="container">
    <div class="row justify-content-center m-5">
      <div class="col-lg-8">
        <div class="section-title text-center">
          <p class="text-primary text-uppercase fw-bold mb-3">My Page</p>
          <h1>마이페이지</h1>
        </div>
      </div>
    </div>
      <!--의뢰자, 패널 버튼-->
      <!-- <div class="col-lg-12">
        	<div class="widget widget-categories row">
              <ul class="list-unstyled widget-list">
              <li class="col-lg-2"><a>의뢰자</a></li>
              <li class="col-lg-2"><a>패널</a></li>
              </ul>
				  </div>
      </div> -->
      </div>
<div class="container">
    <div class="row justify-content-center">
            <div class="col-lg-4">
              <div class="back-same" v-if="this.$store.state.myPage==1">
              <div class="from">
  <div class="img">
    <span class="grade-im" v-if="grade<=2"><img src="@/assets/myPage/gradeOne.png" width="85"></span>
    <span class="grade-im" v-if="grade>=3&&grade<=9"><img src="@/assets/myPage/gradeTwo.png" width="85"></span>
    <span class="grade-im" v-if="grade>=10"><img src="@/assets/myPage/gradeThree.png" width="85"></span>
    <div class="client-grade-text" @click="showClientModal()"><i class="fas fa-question-circle"></i> 고객 등급 알아보기</div>
    <div class="de-modal" v-if="showclientmodal==true">
      <div class="modal">
      <div class="modal_body">
          <div class="row mb-3">
          <a class="col-auto text-left" @click="showClientModal()"><i class="fas fa-times"></i></a>
          <span class="col-10"></span>
          </div>
          <h4 class="text-primary">서베이지 고객 등급 안내</h4>
          <p>고객 등급의 기준과 등급에 따른 혜택을 확인하세요!</p>
          <table class="table-clientgrade table-text">
            <thead>
              <tr>
                <th scope="col">등급</th>
                <th scope="col"><img src="@/assets/myPage/gradeOne.png" width="100"><p>새싹</p></th>
                <th scope="col"><img src="@/assets/myPage/gradeTwo.png" width="100"><p>알감자</p></th>
                <th scope="col"><img src="@/assets/myPage/gradeThree.png" width="100"><p>왕감자</p></th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <th scope="row">기준</th>
                <td>의뢰 설문 0-2개</td>
                <td>의뢰 설문 3-9개</td>
                <td>의뢰 설문 10개 이상</td>
              </tr>
              <tr>
                <th scope="row">적립금 비율</th>
                <td>결제금액의 1%</td>
                <td>결제금액의 2%</td>
                <td>결제금액의 3%</td>
              </tr>
              <tr>
                <th scope="row">쿠폰 리워드</th>
                <td>5% 할인쿠폰 1장<br>*회원가입시 전달</td>
                <td>10% 할인쿠폰 2장<br>*양도 가능 / 유효기간 1년</td>
                <td>20% 할인쿠폰 2장<br>*양도 가능 / 유효기간 1년</td>
              </tr>
            </tbody>
          </table>
    </div>
  </div>
</div>



    <div class="col-lg-8">
    <div class="title">
      <h4>
    안녕하세요, <span class="text-primary">{{this.$store.state.loginState.currentUser['name']}}</span>님 </h4>
  </div>
  <!-- <div class="go-link">
    <router-link to="/serviceidentity_mypage" class="go-link">대학(원)생 인증하러가기 ></router-link>
    <hr>
  </div> -->
  <hr>
  <div class="widget widget-categories">
              <ul class="list-unstyled widget-list">
                <li><router-link to="/mypage/dashboard" class="mypage-router-link">대시보드</router-link></li>
                <li><router-link to="/mypage/payment" class="mypage-router-link">주문 내역</router-link></li>
                <li><router-link to="/mypage/couponpoint" class="mypage-router-link">쿠폰/적립금</router-link></li>
                <li><router-link to="/mypage/myinfo" class="mypage-router-link">나의 정보</router-link></li>
              </ul>
    </div>
</div>
            </div>
            </div>
            </div>
  </div>
  <!-- 모달창으로 변경해야함-->

<div class="mypage-router-view-containe col-lg-8">
    <router-view></router-view>
</div>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      
     
      grade : this.$store.state.loginState.currentUser['uploadIndex'].length,

      showclientmodal: false
    }
  },
  methods: {
    

    showClientModal() {
      this.showclientmodal = !this.showclientmodal
    }
  },
 
  mounted() {
    window.scrollTo(0,0)
  
    
  }
}
</script>

<style>
.table-text {
  font-size: 0.8rem;
}

.table-clientgrade{
  width: 100%;
}

.modal {
  position: fixed;
  overflow: hidden;
  z-index:3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
  display: block;
}

.modal_body {
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 550px;
  height: 500px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
}
</style>
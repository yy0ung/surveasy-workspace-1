<template>
  <div id="FAQ-detail-container">
    <div class="template-contents">
      <div>
      <p class="title"  >
        <span  :style="{color : fontcolor1}">결제 방법은 어떻게 되나요?</span>
        <span @click="toggle1">
          <span v-if="showDetail1==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail1==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail1==true">"설문 응답 서비스" : ‘서비스 이용' 배너에서 ‘설문 응답 서비스' 클릭 후, 설문 옵션을 입력하여 해당 금액을 결제해주세요.
        <br>"설문 템플릿" : 카카오뱅크로 해당 금액 결제 후, 카카오채널 @surveasy로 ‘입금자명, 설문 템플릿 종류, <br>구글 이메일 계정’을 전송해주세요. 확인 후, 전송해주신 구글아이디로 템플릿 링크를 보내드립니다.</p>
    </div>
    <div>
      <p class="title">
        <span :style="{color : fontcolor2}">결제 후 전액환불이 가능한가요?</span>
        <span @click="toggle2">
          <span v-if="showDetail2==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail2==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail2==true">"설문 응답 서비스" : 결제가 완료된 후, 설문이 바로 패널에게 전달되므로 전액 환불 불가합니다.
          <br>"설문 템플릿" : 템플릿 링크를 공유받기 전이라면 전액 환불이 가능합니다. 이미 링크를 공유 받았다면 환불은 불가합니다.</p>
    </div>
    <div>
      <p class="title">
        <span :style="{color : fontcolor3}">‘설문 응답 서비스’의 응답 수 미충족 시, 환불 절차는 어떻게 되나요?</span>
        <span @click="toggle3">
          <span v-if="showDetail3==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail3==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail3==true">응답수 미충족 시, 미달 응답 수에 해당하는 비율만큼 부분 환불을 도와드리고 있습니다. 
        환불 절차는 회원가입 시 <br>기입한 연락처 또는 문의하신 연락처로 안내드립니다.
        <br>환불 예시 : 30명 요청, 20명 응답 시 →결제 금액의 1/3 환불 진행</p>
    </div>
    
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetail1: false,
      showDetail2: false,
      showDetail3: false,
      fontcolor1: 'black',
      fontcolor2: 'black',
      fontcolor3: 'black',

      
    }
  },
  methods: {
    toggle1(){
      this.showDetail1 =!this.showDetail1
      if(this.showDetail1==true){
        this.fontcolor1='#0AAC00'
      }else{
        this.fontcolor1='black'
      }
    },
    toggle2(){
      this.showDetail2 =!this.showDetail2
      if(this.showDetail2==true){
        this.fontcolor2='#0AAC00'
      }else{
        this.fontcolor2='black'
      }
    },
    toggle3(){
      this.showDetail3 =!this.showDetail3
      if(this.showDetail3==true){
        this.fontcolor3='#0AAC00'
      }else{
        this.fontcolor3='black'
      }
    },

  },

}
</script>

<style>

</style>
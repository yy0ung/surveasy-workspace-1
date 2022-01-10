<template>
  <div id="FAQ-detail-container">
    <div class="memberinfo-contents">
      <div>
      <p class="title">
        <span @click="toggle1" :style="{color : fontcolor1}" class="FAQ-title">아이디 비밀번호는 어디서 수정할 수 있나요?</span>
        <span @click="toggle1">
          <span v-if="showDetail1==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail1==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail1==true">아이디 변경을 원하시는 경우, 서베이지 카카오톡 채널 @surveasy 로 연락주세요. 
        <br>비밀번호 변경이 필요하신 경우, LOGIN 페이지에서 ‘비밀번호 찾기’ 버튼을 눌러 해당 절차에 따라 비밀번호를 변경해주세요.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle2" :style="{color : fontcolor2}" class="FAQ-title">결제했던 내역은 어디서 볼 수 있나요?</span>
        <span @click="toggle2">
          <span v-if="showDetail2==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail2==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail2==true">로그인 후, 상단 오른쪽에 뜨는 본인의 아이디를 클릭하여 ‘마이페이지’ 로 이동해주세요. 
        <br>‘결제 내역’ 카테고리에서 확인하실 수 있습니다.</p>
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
      fontcolor1: 'black',
      fontcolor2: 'black', 
      black: 'black'
      
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
    
  },

}
</script>

<style>
.FAQ-title {
  cursor: pointer;
}
</style>
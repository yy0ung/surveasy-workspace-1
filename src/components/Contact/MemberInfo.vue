<template>
  <div id="FAQ-detail-container">
    <div class="memberinfo-contents">
      <div>
      <p class="title">
        <span :style="{color : fontcolor1}">아이디 비밀번호는 어디서 수정할 수 있나요?</span>
        <span @click="toggle1">
          <span v-if="showDetail1==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail1==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail1==true">로그인 후, 우측 상단에 뜨는 본인의 아이디를 클릭해주세요. 
        <br>클릭 시 ‘마이페이지’로 이동되며, ‘나의 정보’ 카테고리에서 아이디와 비밀번호를 수정하실 수 있습니다.</p>
    </div>
    <div>
      <p class="title">
        <span :style="{color : fontcolor2}">결제했던 내역은 어디서 볼 수 있나요?</span>
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
      fontcolor2: 'black'
      
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

</style>
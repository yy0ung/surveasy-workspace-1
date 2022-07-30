<template>
  <div id="FAQ-detail-container">
    <div class="service-contents">
      <div>
      <p class="title">
        <span @click="toggle1" :style="{color : fontcolor1}" class="FAQ-title">대학생만 설문을 올릴 수 있나요?</span>
        <span @click="toggle1">
          <span v-if="showDetail1==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail1==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail1==true">대학생, 대학원생, 일반, 기업 등 모두 설문을 업로드 하여 설문 응답 서비스를 이용하실 수 있습니다.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle2" :style="{color : fontcolor2}" class="FAQ-title">원했던 응답 수만큼 응답이 모이지 않는 경우도 있나요?</span>
        <span @click="toggle2">
          <span v-if="showDetail2==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail2==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail2==true">설문의 대상, 길이 등에 따라 목표했던 응답수에 도달하지 못하는 경우가 있을 수 있습니다. 
        <br>해당 상황의 경우, 추후 부족한 응답 수만큼 환불이 진행됩니다.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle3" :style="{color : fontcolor3}" class="FAQ-title">설문을 업로드하면 누가 응답해주나요?</span>
        <span @click="toggle3">
          <span v-if="showDetail3==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail3==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail3==true">서베이지가 보유하고 있는 대학생 패널들이 응답에 참여합니다.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle4" :style="{color : fontcolor4}" class="FAQ-title">설문 응답 서비스의 가격은 어떻게 되나요?</span>
        <span @click="toggle4">
          <span v-if="showDetail4==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail4==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail4==true">상단의 ‘서비스 이용’ 배너에서 ‘설문 응답 서비스’ 클릭 시, 옵션별로 해당 가격을 확인하실 수 있습니다.</p>
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
      showDetail4: false,
      fontcolor1: 'black',
      fontcolor2: 'black',
      fontcolor3: 'black',
      fontcolor4: 'black'
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
    toggle4(){
      this.showDetail4 =!this.showDetail4
      if(this.showDetail4==true){
        this.fontcolor4='#0AAC00'
      }else{
        this.fontcolor4='black'
      }
    }
  },

}
</script>

<style>

</style>
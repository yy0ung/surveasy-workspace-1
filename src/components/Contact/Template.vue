<template>
  <div id="FAQ-detail-container">
    <div class="template-contents">
      <div>
      <p class="title">
        <span @click="toggle1" :style="{color : fontcolor1}">템플릿의 종류는 어떻게 되나요?</span>
        <span @click="toggle1">
          <span v-if="showDetail1==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail1==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail1==true">현재 ‘사용 경험 설문조사’, ‘인식 설문조사’ 두 가지 템플릿을 보유하고 있습니다.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle2" :style="{color : fontcolor2}">설문 템플릿의 가격은 어떻게 되나요?</span>
        <span @click="toggle2">
          <span v-if="showDetail2==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail2==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail2==true">더 많은 초보 설문 제작자들이 편하게 설문을 제작하기를 바라는 마음을 담아, 모두 무료로 배포하고 있습니다.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle3" :style="{color : fontcolor3}">이메일 주소를 작성한 후, 설문 템플릿을 바로 공유받을 수 있나요?</span>
        <span @click="toggle3">
          <span v-if="showDetail3==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail3==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail3==true">결제 후 카카오채널 @surveasy 를 통해 보내주신 정보 확인 후 템플릿 링크를 공유해드리고 있습니다. 
        <br>최대 1일의 시간이 소요되므로, 이점 유의하시어 서비스 이용 바랍니다.</p>
    </div>
    <div>
      <p class="title">
        <span @click="toggle4" :style="{color : fontcolor4}">설문 템플릿의 설문 문항을 바꾸거나 추가할 수 있나요?</span>
        <span @click="toggle4">
          <span v-if="showDetail4==false"><i class="fas fa-chevron-down"></i></span>
          <span v-if="showDetail4==true"><i class="fas fa-chevron-up"></i></span>
        </span>
      </p>
      <p class="detail" v-if="showDetail4==true">공유받으신 설문은 추후 이용자가 자유롭게 수정, 추가, 삭제가 모두 가능합니다. 또한 구글폼의 권한을 '편집자'로 바꾸어 드립니다. 
        <br>단, 설문 템플릿은 서베이지 소유 저작물로, 제3자 타인과의 공유는 절대 불가합니다.</p>
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
#FAQ-detail-container .title{
  font-size: 1.1rem;
  margin-top: 0;
}
</style>
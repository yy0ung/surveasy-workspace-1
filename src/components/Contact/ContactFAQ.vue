<template>
<div id="FAQ-container">
  <div><h1>FAQ</h1></div>
  <div class="FAQ-router-link-container">
    <button @click="button(0)" class="FAQ-btn">설문 응답 서비스</button>
    <button @click="button(1)" class="FAQ-btn">설문 템플릿</button>
    <button @click="button(2)" class="FAQ-btn">회원 정보</button>
    <button @click="button(3)" class="FAQ-btn">결제 / 환불</button>
  </div>
</div> 

<div id="FAQ-detail-container">
    <div v-if="FAQbutton === 0">
    <FAQmodal v-for="(a, i) in $store.state.RespondService" :key="i" :i="i" :FAQData="$store.state.RespondService" />
    </div>
    <div v-if="FAQbutton === 1">
    <FAQmodal v-for="(a, i) in $store.state.Template" :key="i" :i="i" :FAQData="$store.state.Template" />
    </div>
    <div v-if="FAQbutton === 2">
    <FAQmodal v-for="(a, i) in $store.state.MemberInfo" :key="i" :i="i" :FAQData="$store.state.MemberInfo" />
    </div>
    <div v-if="FAQbutton === 3">
    <FAQmodal v-for="(a, i) in $store.state.Payment" :key="i" :i="i" :FAQData="$store.state.Payment" />
    </div>
</div>

</template>

<script>
import FAQmodal from './FAQmodal.vue';
export default {
  data() {
    return {
    showDetail: false,
    FAQbutton: 0,
    }
  },

  components : {
    FAQmodal: FAQmodal,
  },

  methods:{

    button(num){
      this.FAQbutton = num;
    }

  }
 
}
</script>

<style>
  #FAQ-container .FAQ-router-link-container{
    display: flex;
    justify-content: center;
    
  }
.FAQ-btn{
    background-color: white;
     cursor: pointer;
     margin-bottom: 15px;
     width: 200px;
     height: 77px;
     font-size: 20px;
     border: none;
   }

.FAQ-btn:hover{
    border-bottom: 5px solid #0AAC00;
   }

.FAQ-btn:active {
    border-bottom: 5px solid #0AAC00;
   } 
#left{
      border-left: none;
    }
    
#FAQ-detail-container{
      max-width: 800px;
      margin-right: auto;
      margin-left: auto;
      text-align: left;
    }


 
</style>
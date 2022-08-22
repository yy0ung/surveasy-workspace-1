<template>
<<<<<<< HEAD
=======
<div id="FAQ-container">
  <div><h1>자주 묻는 질문</h1></div>
  <div class="FAQ-router-link-container">
    <button class="FAQ-btn" v-for="(Category,i) in Category" :key="i" @click="button(i)" :class="{active: clickEvent[i]}">{{Category}}</button>
  </div>
</div> 
>>>>>>> e6568c21959454948a1f9c0d96d677b5b0d1feb2

<section class="section">
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-lg-6">
        <div class="section-title text-center">
          <p class="text-primary text-uppercase fw-bold mb-3">Frequently Asked Questions</p>
          <h1>자주 묻는 질문</h1>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-2">
        	<div class="widget widget-categories row">
              <ul class="list-unstyled widget-list">
              <li v-for="(Category,i) in Category" :key="i" @click="button(i)" :class="{active: clickEvent[i]}" class="col-lg-12"><a>{{Category}}</a></li>
              </ul>
				  </div>
      </div>
      <div class="col-lg-10">
        <div class="accordion accordion-border-bottom" id="accordionFAQ">
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
    </div>
    </div>
  </div>
</section>

</template>

<script>
import FAQmodal from './FAQmodal.vue';
export default {
  data() {
    return {
    Category : ['설문 응답 서비스','설문 템플릿','회원 정보','결제 / 환불'],
    clickEvent: [true,false,false,false],
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
      for(var i = 0; i < this.clickEvent.length; i++){
        this.clickEvent[i] = false}
      this.clickEvent[num] = true;
      }
    }

  }

</script>

<style>

</style>
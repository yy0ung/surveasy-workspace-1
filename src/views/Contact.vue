<template>
<div id="contact" >

    <ContactModal />
    <ContactFinalModal />

  <ContactContactUs />
  <ContactFAQ />
  <div v-if="this.$store.state.FAQbutton==0">
  <RespondService />
  </div>
  <div v-if="this.$store.state.FAQbutton==1">
  <Template />
  </div>
  <div v-if="this.$store.state.FAQbutton==2">
  <MemberInfo />
  </div>
  <div v-if="this.$store.state.FAQbutton==3">
  <Payment />
  </div>


</div>

</template>

<script>
import ContactContactUs from '../components/Contact/ContactContactUs.vue'
import ContactFAQ from '../components/Contact/ContactFAQ.vue'
import ContactModal from '../components/Contact/ContactModal.vue'
import ContactFinalModal from '../components/Contact/ContactFinalModal.vue'
import RespondService from '../components/Contact/RespondService.vue'
import Template from '../components/Contact/Template.vue'
import MemberInfo from '../components/Contact/MemberInfo.vue'
import Payment from '../components/Contact/Payment.vue'





export default {
  
  components:{
    ContactContactUs,
    ContactFAQ,
    ContactModal,
    ContactFinalModal,
    RespondService,
    Template,
    MemberInfo,
    Payment
    
    
  
  

  },
  mounted() {
    window.scrollTo(0,0)
  },
}
</script>

<style>
#contact{
  max-width: 1190px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 100px;
  height: 950px;
}

#contact .f-modal{
  position: fixed;
  margin-top: 230px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 700px;
  height: 300px;
  border-radius: 15px;
  
}


 

</style>
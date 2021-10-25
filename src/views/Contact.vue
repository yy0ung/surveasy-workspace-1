<template>
<div id="contact" >

  <div class="modal" v-if="this.$store.state.showModal==true">
    <ContactModal />
  
</div>
<div class="f-modal" v-if="this.$store.state.showFinalModal==true">
    <ContactFinalModal />
  
</div>

  <ContactContactUs />
  <ContactFAQ />
  
  
 

 

</div>

</template>

<script>
import ContactContactUs from '../components/Contact/ContactContactUs.vue'
import ContactFAQ from '../components/Contact/ContactFAQ.vue'
import ContactModal from '../components/Contact/ContactModal.vue'
import ContactFinalModal from '../components/Contact/ContactFinalModal.vue'





export default {
  
  components:{
    ContactContactUs,
    ContactFAQ,
    ContactModal,
    ContactFinalModal
    
    
  
  

  }
}
</script>

<style>
#contact{
  max-width: 1190px;
  margin-right: auto;
  margin-left: auto;

}
#contact .modal{
  position: fixed;
  margin-top: 230px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 700px;
  height: 600px;
  border-radius: 15px;
  
}
#contact .f-modal{
  position: fixed;
  margin-top: 230px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 700px;
  height: 300px;
  border-radius: 15px;
  
}


 

</style>
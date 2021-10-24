<template>
<div id="contact">

  <div class="modal" v-if="this.$store.state.showModal==true">
    <ContactModal />
  
</div>
  <ContactContactUs />
  <ContactFAQ />
  
  
 

 

</div>

</template>

<script>
import ContactContactUs from '../components/Contact/ContactContactUs.vue'
import ContactFAQ from '../components/Contact/ContactFAQ.vue'
import ContactModal from '../components/Contact/ContactModal.vue'




export default {
  
  components:{
    ContactContactUs,
    ContactFAQ,
    ContactModal
    
    
  
  

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
#contact .modal-bg{
  background: rgb(0,0,0,0.5);
}
 

</style>
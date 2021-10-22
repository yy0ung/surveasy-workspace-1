<template>
<div id="contact">


  <ContactContactUs />
  <ContactFAQ />
 

 
</div>
</template>

<script>
import ContactContactUs from '../components/Contact/ContactContactUs.vue'
import ContactFAQ from '../components/Contact/ContactFAQ.vue'



export default {
  components:{
    ContactContactUs,
    ContactFAQ,
    
  
  

  }
}
</script>

<style>
#contact{
  max-width: 1190px;
  margin-right: auto;
  margin-left: auto;

}
 

</style>
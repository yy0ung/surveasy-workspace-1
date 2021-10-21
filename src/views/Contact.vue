<template>
<div id="contact">


  <ContactContactUs />
  <ContactFAQ />
  <ContactFAQList />

 
</div>
</template>

<script>
import ContactContactUs from '../components/Contact/ContactContactUs.vue'
import ContactFAQ from '../components/Contact/ContactFAQ.vue'
import ContactFAQList from '../components/Contact/ContactFAQList.vue'


export default {
  components:{
    ContactContactUs,
    ContactFAQ,
    ContactFAQList,
  
  

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
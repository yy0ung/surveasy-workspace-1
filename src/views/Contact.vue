<template>
<div>

  <h1>Contact</h1>
  <ContactContactUs />
  <ContactFAQ />
  <ContactFAQList />
  <HomeSiteMap />
 
</div>
</template>

<script>
import ContactContactUs from '../components/Contact/ContactContactUs.vue'
import ContactFAQ from '../components/Contact/ContactFAQ.vue'
import ContactFAQList from '../components/Contact/ContactFAQList.vue'
import HomeSiteMap from '../components/Home/HomeSiteMap.vue'

export default {
  components:{
    ContactContactUs,
    ContactFAQ,
    ContactFAQList,
    HomeSiteMap,
  

  }
}
</script>

<style>
  .ContactContactUs-btn{
  color:#42b983;
  background-color: rgb(238, 238, 238);
  border: 2px solid #42b983;
  padding: 5px 13px;
  border-radius: 30px;
  font-weight: bold;
}

.ContactContactUs-btn:hover{
  background-color: #42b983;
  color: #fff;
}
#contactus-container .contactus-contents .contactus-bold{
    font-weight: bold;
    font-size: 1.1rem;
  }
</style>
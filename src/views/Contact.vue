<template>
<div>
  <h1>Contact</h1>
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
    ContactFAQ
  }
}
</script>

<style>

</style>
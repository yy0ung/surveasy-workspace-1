<template>
<div class="accordion-item">
    <h2 class="accordion-header accordion-button h5 border-0" @click="openFAQ1,openFAQ2" :class="{active: isActive}" :id="`heading${i}`" type="button" data-bs-toggle="collapse"
    :data-bs-target="`#collapse${i}`" aria-expanded="'${this.Active}'" 
    :aria-controls="`collapse${i}`">{{FAQData[i].title}}
  </h2>
  <div :id="`collapse${i}`" class="accordion-collapse collapse border-0" :class="{show: isActive}" :aria-labelledby="`heading${i}`" data-bs-parent="#accordionFAQ">
    <div class="accordion-body py-0 content">
        <p v-html="dataToHTML(FAQData[i].detail)"></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
data() {
    return{
    showDetail: false,
    isActive: false,
    Active: true,
    }
},

props: {
    i: Number,
    FAQbutton: Number,
    FAQData: String,
},

methods :{

    openFAQ1(){
      if(this.isActive==false){
        this.isActive = true;
      }else{
        this.isActive = false;
      }
    },

    openFAQ2(){
      if(this.Active==true){
        this.Active = false;
      }else{
        this.Active = true;}
    },
    
  


    dataToHTML(detail){
      return String(detail)
    },

    toggle(){
      if(this.showDetail == false){
        this.showDetail = true;
      }else{
        this.showDetail = false;
      }
}
}
}
</script>

<style>
.accordion-item{
  transition: 0.5s;
}

.accordion-header{
  transition: 0.5s;
}

.accordion-collapse{
  transition: 0.5s;
}

</style>
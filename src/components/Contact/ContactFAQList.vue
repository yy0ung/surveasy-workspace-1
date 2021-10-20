<template>
<div id="FAQ-list-container">
  <ul class="FAQ-list-contents">
    <div class="FAQ-list-toggle">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
      <p @click="toggle" >
        <span v-if="showDetail==false">
          <i class="fas fa-chevron-down"></i>
        </span>
        <span v-if="showDetail==true">
        <i class="fas fa-chevron-up"></i>
        </span>       
      </p>
    </div>
    <li v-if="showDetail==true"> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
    <div class="FAQ-list-toggle">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
    <li><i class="fas fa-chevron-down"></i></li>
    </div>
    <div class="FAQ-list-toggle">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
    <li><i class="fas fa-chevron-down"></i></li>
    </div>
    <div class="FAQ-list-toggle">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
    <li><i class="fas fa-chevron-down"></i></li>
    </div>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      showDetail:false,
    }
  },
  methods:{
    toggle(){
      this.showDetail=!this.showDetail
    }
  }
}
</script>

<style>
  #FAQ-list-container{
    margin-bottom: 50px;
    max-width: 1190px;
    margin-right: auto;
    margin-left: auto;
  }
  #FAQ-list-container .FAQ-list-contents{
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    margin-right: 100px;
    padding-left: 230px;
    padding-right: 230px;
  }
  #FAQ-list-container .FAQ-list-contents li{
    
    list-style: none;
    text-align: left;
    margin-top: 30px;
    
  }
  #FAQ-list-container .FAQ-list-contents .FAQ-list-toggle{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
</style>
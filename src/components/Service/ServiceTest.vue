<template>
  <div>
    <p>serviceTest</p>
    <p>{{Number(this.$store.state.priceTable[priceIdentity][priceSpendTime][priceSpendTime])+Number(this.$store.state.addOptionArray[0][addGenderTarget])+Number(this.$store.state.addOptionArray[1][addAgeTarget])+Number(this.$store.state.addOptionArray[2][addENTarget])}}</p>
    
    <select v-model="priceIdentity">
      <option :value=0>대학생</option>
      <option :value=1>대학원생</option>
      <option :value=2>일반</option>
    </select>

    <select v-model="priceSpendTime">
      <option :value=0>1-3분</option>
      <option :value=1>4-6분</option>
      <option :value=2>7-10분</option>
      <option :value=3>11-15분</option>
      <option :value=4>16-20분</option>
    </select>

    <select v-model="priceRequireHeadCount">
      <option :value=0>30명</option>
      <option :value=1>40명</option>
      <option :value=2>50명</option>
      <option :value=3>60명</option>
      <option :value=4>70명</option>
      <option :value=5>80명</option>
      <option :value=6>90명</option>
      <option :value=7>100명</option>
    </select>

    <div>
      성별 타깃
      <input type="radio" v-model="addGenderTarget" :value=0 name="genderTarget">선택 안함
      <input type="radio" v-model="addGenderTarget" :value=1 name="genderTarget">남/여 타겟팅
      <br>
      나이/학년 타깃
      <input type="radio" v-model="addAgeTarget" :value=0 name="ageTarget">선택 안함
      <input type="radio" v-model="addAgeTarget" :value=1 name="ageTarget">나이/학년 타겟팅
      <br>
      영어 설문 여부
      <input type="radio" v-model="addENTarget" :value=0 name="enTarget">선택 안함
      <input type="radio" v-model="addENTarget" :value=1 name="enTarget">영어 설문(50명 이하)
      <input type="radio" v-model="addENTarget" :value=2 name="enTarget">영어 설문(50명 초과)
    </div>
  </div>
  
</template>

<script>
export default {
  data(){
    return {
      priceIdentity:0,
      priceSpendTime:0,
      priceRequireHeadCount:0,
      addGenderTarget:0,
      addAgeTarget:0,
      addENTarget:0
    }
  }
}
</script>

<style>

</style>
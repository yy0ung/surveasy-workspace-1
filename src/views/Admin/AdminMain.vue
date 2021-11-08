<template>
  <div>
    <h1>{{ passInput }}</h1>
    <input v-model="passInput" type="text" placeholder="AdminPassword">
    <br>
    Admin Password
    <button @click="adminCheck">확인하기</button>

    <p>{{passInput}}</p>
    <p>{{this.$store.state.isAdmin}}</p>
    <div v-if="this.$store.state.isAdmin">
      <p>admin이 true일때만 보이는 부분</p>
      <div>{{this.$store.state.surveyData}}</div>
    </div>
  </div>
</template>

<script>
//어드민 페이지 접근을 어떻게 해야할지 고민중..
//일단은 어드민 주소는 접근은 가능하되 비번을 맞게 쳐야 뒤에 부분들이 보이게 하려고함.
export default {
data(){
  return{
    passInput:'',
  }
},
methods:{
  adminCheck(){
    if (this.passInput == this.$store.state.AdminPassword) {
      alert('ok')
      this.$store.commit('setAdminState')
    } else {
      alert('check it again')
    }
  }
}

}
</script>

<style>

</style>
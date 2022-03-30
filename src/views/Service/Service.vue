<template>
  <div class="service-container">
      <ServiceDetail />
      <ServiceOption />
  </div>
  
</template>

<script>
import ServiceDetail from '../../components/Service/Service1/ServiceDetail.vue'
import ServiceOption from '../../components/Service/Service1/ServiceOption.vue'
export default {
  components:{
    ServiceDetail,
    ServiceOption
  },

  methods: {
    async fetchAdminData_coupon() {
     const db = this.$store.state.db

      this.$store.state.adminCoupon = []
      this.$store.state.myCoupon = []
     
     const adminCoupon = this.$store.state.adminCoupon
     
     const querySnapshot = await getDocs(collection(db, "couponData"))
     querySnapshot.forEach((doc) => {
       adminCoupon.push(doc.data())
     })

     const myCoupon_group_X = adminCoupon.filter(item => item.forGroup===false &&(item.user===this.$store.state.loginState.currentUser.email) && item.isUsed===false && item.outOfDate===false)
     const myCoupon_group_O = []

     const Coupon_group_O_yet = adminCoupon.filter(item => item.forGroup===true && item.isUsed===false && item.outOfDate===false)
     
     for(var i=0 ; i<Coupon_group_O_yet.length ; i++) {
        for(var j=0 ; j<Coupon_group_O_yet[i].user.length ; j++) {

          if(Coupon_group_O_yet[i].user[j].user == this.$store.state.loginState.currentUser.email && Coupon_group_O_yet[i].user[j].used == false) {
            //console.log(Coupon_group_O_yet[i])
            myCoupon_group_O.push(Coupon_group_O_yet[i])
          }

        }
       
      }

      const myCoupon = myCoupon_group_X.concat(myCoupon_group_O)
      this.$store.state.myCoupon = myCoupon
     //console.log(this.$store.state.myCoupon)
     this.check_outOfDate()
   },

   async check_outOfDate() {
      var db = this.$store.state.db
    
      for(var i=0 ; i<this.$store.state.myCoupon.length ; i++) {
        const docref = doc(db, "couponData", this.$store.state.myCoupon[i].code) 
        var duedate = this.$store.state.myCoupon[i].duedate
        var due = new Date(duedate + ' 24:00:00')
        var diff = due.getTime()/3600000 - Date.now()/3600000
        var diffdate = Math.floor(diff/24)
  
        await updateDoc(docref, { 
            duediff: diffdate
          })
        
        if(diff<0) {
          await updateDoc(docref, { 
            outOfDate: true
          })
        }
      }
   },
  },


  mounted() {
    window.scrollTo(0,0)
    this.fetchAdminData_coupon()
  },

}
</script>

<style>
.service-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
</style>
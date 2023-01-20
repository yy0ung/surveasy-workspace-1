<template>
    <div class="shadow rounded bg-white p-4 mt-4">
      <h3>쿠폰/적립금</h3><hr>
        <div>쿠폰</div>
          <div class="row">
            <div class="col-7">
          <select class="form-select form-control-text" v-model="selectedCoupon">
            <option class="select-placeholder" :value="defaultCoupon" disabled selected>사용 가능 쿠폰 {{ this.$store.state.myCoupon.length }}장</option>
            <option class="Coupon-option" v-for="item in (this.$store.state.myCoupon)" v-bind:value="{code: item.code, rate: item.rate, forGroup: item.forGroup}" :key="item">{{ item.name }}  : {{ item.duedate }} 까지</option>
          </select>
          </div>
          <div class="col-5">
          <a class="btn btn-outline-primary btn-width100" @click="useCoupon()">쿠폰 적용</a>
          </div>
          </div>
          <div class="mb-3"></div>
        <div class="col-6">적립금</div>
            <div class="row">
              <div class="col-7">
                <input class="form-control form-control-text" type="text" v-model="point_to_use" placeholder="사용하려는 적립금 액수를 입력하세요.">
                <div class="align-right">보유 적립금 {{ show_point }}원    
              <a class="pointDelete-btn" @click="deletePoint"><i class="fas fa-times"></i></a>
              </div>
              </div>
              <div class="col-5">
              <a class="btn btn-outline-primary btn-width100" @click="usePoint()">적립금 적용</a>
              </div>
              <div>*적립금은 주문 금액의 최대 10%까지 사용 가능합니다.</div>
            </div>
        </div>
        </template>

<script>
export default {
  data() {
    return {

      selectedCoupon: {
        code: '',
        rate: 0,
        forGroup: false
      }, 

      defaultCoupon : {
        code: '',
        rate: 0,
        forGroup: false
      },

      point_to_use: '',

      point_apply: false,
      point_delete: false

    }
  },
  

  methods: {
    // Coupon methods
    useCoupon() {
      if(this.$store.state.localSurveyState.coupon_use==false) {
        this.$store.state.localSurveyState.selectedCoupon = this.selectedCoupon

        this.$store.state.localSurveyState.beforeCouponPrice = this.$store.state.localSurveyState.price
      
        if(this.selectedCoupon.rate == 5) {
          this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.05
          this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price * 0.95
        }

        if(this.selectedCoupon.rate == 10) {
          this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.1
          this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price* 0.9
        }

        if(this.selectedCoupon.rate == 20) {
          this.$store.state.localSurveyState.couponDiscount = this.$store.state.localSurveyState.price * 0.2
          this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price* 0.8
        }

        this.$store.state.localSurveyState.coupon_use = true
      }

      else if(this.$store.state.localSurveyState.coupon_use==true) {
        alert("쿠폰은 최대 1장까지 사용가능합니다.")
      }
      
    },
    
    // Point methods
    usePoint() {
      console.log(this.point_apply)
      var point_to_use_num = Number(this.point_to_use)
      if(this.$store.state.localSurveyState.point_use==false) {

        if(point_to_use_num <= this.$store.state.loginState.currentUser.point_current) {

          if(this.$store.state.localSurveyState.beforeCouponPrice < 10000) {
            alert('적립금은 결제 금액이 10,000원 이상인 경우에만 사용 가능합니다.')
            this.point_to_use = ''
          }
      
          else {            
            var maxpoint = this.$store.state.localSurveyState.beforeCouponPrice * 0.1

            if(maxpoint < point_to_use_num) {
              alert('적립금은 결제 금액의 최대 10%까지 사용 가능합니다.')
              this.point_to_use = ''
            }

            else {
              this.point_apply = true

              this.$store.state.localSurveyState.pointDiscount = point_to_use_num
              this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price - point_to_use_num

              this.$store.state.localSurveyState.point_use = true
              //console.log(this.point_apply)
            }

            
          }
        
        }

        else {
          alert('사용가능한 적립금 액수를 초과하였습니다.')
          this.point_to_use = ''
        }
      }

      else if(this.$store.state.localSurveyState.point_use==true) {
        alert("이미 적립금을 적용하셨습니다.")
        this.point_to_use = ''
      }
    },

    

  },

  computed: {
    show_point() {
      var c = this.$store.state.localPointState.point_current

      if(this.point_apply == false) {
        return c
      }
      else {
        return c - this.$store.state.localSurveyState.pointDiscount
      }
    },

    deletePoint() {
      if(this.point_apply == true) {
        this.$store.state.localSurveyState.price = this.$store.state.localSurveyState.price + this.$store.state.localSurveyState.pointDiscount
        this.$store.state.localSurveyState.pointDiscount = 0
        this.$store.state.localSurveyState.point_use = false
        this.point_apply = false

        this.show_point()
      }
      
    }
  }

}
</script>

<style>
  .point-use{
    height: 42px;
  }

  .form-control-text:not(textarea) {
    height: 48px;
  }

  .btn-width100{
    width:100%;
    max-width: 140px;
  }
</style>
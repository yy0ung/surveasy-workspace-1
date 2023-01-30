<template>
     <div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-6"></div>
			<div class="col-lg-8">
			    <div class="shadow rounded p-5 bg-white">
			        <div class="row">
                        <div class="col-lg-2"></div>
			            <div class="col-lg-8">
                			<div class="section-title">
                          <div class="text-center">
                                <div style="padding:20px"></div>
                                <img class="checkimg" src="@/assets/check.png" width="100">
                                <div style="padding:20px"></div>
                                <h3>주문 완료되었습니다!</h3>
                                <p>안내된 계좌로 입금을 완료하셔야 서비스 이용이 가능합니다.<br>설문은 입금 확인과 빠른 검수 후 패널들에게 전달됩니다.</p>
                                <div style="padding:20px"></div>
                              </div>
                                <div class="row">
                                <div class="col-12">
                                  <div class="row">
                                    <div class="col-12"><hr></div>
                                    <div class="col-6 p-2"><h5>총 결제 금액</h5></div>
                                    <div class="col-6 p-2"><h5>{{ priceToString(this.$store.state.localSurveyState.price) }} 원</h5></div>
                                    <div class="col-12"><hr></div>
                                    <div class="col-6 p-2 "><h5>입금자</h5></div>
                                    <div class="col-6 p-2"><h5>{{ this.$store.state.localSurveyState.account_userName }}</h5></div>
                                    <div class="col-12"><hr></div>
                                    <div class="col-6 p-2"><h5>계좌번호</h5></div>
                                    <div class="col-6 p-2"><h5>카카오뱅크 3333-11-5235460</h5><h5>(송다예)</h5></div>
                                    <div class="col-12"><hr></div>
                                  </div>
                                </div>
                                </div>
                                <div style="padding:20px"></div>
                                <div class="text-center">
                                <p>설문조사의 진행 상황은 마이 페이지에서 확인하실 수 있습니다.<br>문의 사항은 카카오채널 @surveasy로 보내주세요.</p>
                                  <div class="m-5"></div>
                                  <router-link to="/mypage/dashboard"><button class="btn btn-outline-primary">마이 페이지 가기</button></router-link>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
</template>
<script>
export default {
  mounted() {
    window.scrollTo(0,0)
  },
  methods: {
    priceToString(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
}
</script>
<style>
</style>
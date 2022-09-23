<template>
   <div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-6"></div>
			<div class="col-lg-8">
			    <div class="shadow rounded p-5 bg-white">
			        <div class="row">
                        <div class="col-lg-2"></div>
			            <div class="col-lg-8">
                			<div class="section-title text-center">
                                <div style="padding:20px"></div>
                                <img class="checkimg" src="@/assets/check.png" width="100">
                                <div style="padding:20px"></div>
                                <h5>템플릿 공유 신청이 완료되었습니다.</h5>
                                <p>입력해주신 이메일 주소로 공유될 예정이며, 최대 1일(24시간)의 시간이 소요될 수 있습니다.</p>
                                <div style="padding:20px"></div>
                                  <div class="m-2"></div>
                                  <router-link to="/">
                                  <a class="btn btn-outline-primary w-50">홈 화면으로 가기</a>
                                  </router-link>
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
  name: 'template-modal',
  props: { 
    showTempModal: {
      type: Boolean,
      require: true,
      default: false 
    }
  },

  methods: {
    goHome()  {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>/img/설문템플릿.83200d9c.png
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
                                <h5>Survey를 Easy하게,</h5>
                                <h5>Surveasy의 회원이 되신 것을 환영합니다!</h5>
                                <div style="padding:20px"></div>
                                  <div class="m-2"></div>
                                  <router-link to="/login">
                                  <a class="btn btn-outline-primary w-50">로그인 하러가기</a>
                                  </router-link>
                                  <div class="m-2"></div>
                                  <router-link to="/story">
                                  <a class="btn btn-primary w-50">서베이지 둘러보기</a>
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
  mounted() {
    window.scrollTo(0,0)
  },
}
</script>

<style>

</style>
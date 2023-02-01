<template>
<section class="section">
	<div class="container">
		<div class="row justify-content-center">
          <div class="section-title text-center">
          <h1>도움이 필요하신가요?</h1>
        </div>
			<div class="icon-box-item text-center col-lg-4 col-md-6 mb-4">
				<div class="rounded shadow py-5 px-4">
					<div class="icon"> <i class="fas fa-comments"></i>
					</div>
					<h3 class="mb-3">카카오톡 플러스 친구</h3>
					<p class="mb-4">@surveasy 추가 후 1:1 실시간 채팅으로 문의</p> <a class="btn btn-sm btn-outline-primary" href="http://pf.kakao.com/_xfialK/chat" target="_blank">채팅하기<i class="las la-arrow-right ms-1"></i></a>
				</div>
			</div>
			<div class="icon-box-item text-center col-lg-4 col-md-6 mb-4">
				<div class="rounded shadow py-5 px-4">
					<div class="icon"> <i class="fas fa-envelope"></i>
					</div>
					<h3 class="mb-3">이메일 문의</h3>
					<p class="mb-4">official@gosurveasy.com</p><button class="btn btn-sm btn-outline-primary" @click="copyEmail">이메일 복사하기<i class="las la-arrow-right ms-1"></i></button>
				</div>
			</div>
			<div class="icon-box-item text-center col-lg-4 col-md-6 mb-4">
				<div class="rounded shadow py-5 px-4">
					<div class="icon"> <i class="fas fa-building"></i>
					</div>
					<h3 class="mb-3">B2B 문의</h3>
					<p class="mb-4">기업 배너 광고, 설문 응답 서비스 등</p> <a class="btn btn-sm btn-outline-primary" href="../b2bcontact">소개서 받기<i class="las la-arrow-right ms-1"></i></a>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="contactus-container" :class="{active:this.$store.state.showModal}">
</div>

</template>

<script>
export default {
  methods:{
    handleModal(){
      this.$store.state.showModal=true
      this.$store.state.showFinalModal=false
    },
    copyEmail(){
      const mail = document.getElementById("email")
      mail.value = "official@gosurveasy.com"
      mail.select()
      document.execCommand("copy")
      alert("이메일 주소가 복사되었습니다.")
    }
  }
}
</script>

<style>
</style>
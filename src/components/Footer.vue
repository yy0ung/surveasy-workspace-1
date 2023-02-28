<template>
	<div class="container">
	<div class="footer">
		<div class="row justify-content-between bg-gray m-3">
            <div class="col-lg-2 col-md-4 col-6 mb-4">
                <div class="row align-items-center mt-5 text-left text-md-start">
                        <ul class="list-unstyled">
                            <li class="mb-4"><router-link to="/">
                            <img loading="prelaod" decoding="async" class="img-fluid" width="160" src="@/assets/logo.png" alt="surveasy">
                            </router-link>
                            </li>
                            <li class="text-left mb-2 text-secondary">서베이지</li>
                            <li class="text-left mb-2 text-secondary">official@gosurveasy.com</li>
                            <li class="text-left mb-2 text-secondary"><router-link to="/terms1">이용약관</router-link></li>
                            <li class="text-left mb-2 text-secondary"><router-link to="/terms2">개인정보처리방침</router-link></li>
                        </ul>
                </div>
			</div>
			<div class="col-lg-2 col-md-4 col-6 mb-4">
				<div class="row align-items-center mt-5 text-left text-md-start">
					<h5 class="mb-4 text-primary font-secondary">서비스</h5>
					<ul class="list-unstyled">
						<li class="mb-2"><router-link to="/service">설문 응답 서비스</router-link>
						</li>
						<li class="mb-2"><router-link to="/surveylist">설문 리스트</router-link>
						</li>
						<li class="mb-2"><router-link to="/surveytemplate">설문 템플릿</router-link>
						</li>
						<li class="mb-2"><router-link to="/knowhow">설문 노하우</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 col-6 mb-4">
				<div class="row align-items-center mt-5 text-left text-md-start">
					<h5 class="mb-4 text-primary font-secondary">회사</h5>
					<ul class="list-unstyled">
						<li class="mb-2"><router-link to="/story">브랜드 스토리</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="col-lg-2 col-md-4 col-6 mb-4">
				<div class="row align-items-center mt-5 text-left text-md-start">
					<h5 class="mb-4 text-primary font-secondary">문의</h5>
					<ul class="list-unstyled">
						<li class="mb-2"><router-link to="/contact">1:1 문의</router-link>
						</li>
						<li class="mb-2"><router-link to="/b2bcontact">B2B 문의</router-link>
						</li>
						<li class="mb-2"><router-link to="/contact">FAQs</router-link>
						</li>
					</ul>
				</div>
			</div>

      	<div class="col-lg-2 col-md-6 col-6 mb-4">
		  <div class="row align-items-center mt-5 text-left text-md-start">
			<ul class="list-unstyled list-inline mb-0 social-icons">
				<span class="footer-icon"><img class="footerimg" src="@/assets/Footer/IHEI.jpg" width="140"></span>
			</ul>
          </div>
        </div>
		<div class="col-lg-2 col-md-6 col-6 mb-4">
		  <div class="row align-items-center mt-5 text-left text-md-start">
			<ul class="list-unstyled list-inline mb-0 social-icons">
				<li class="list-inline-item me-3 p-1"><a href="https://blog.naver.com/surveasy" target="_blank"><img class="footerimg" src="@/assets/Footer/blog.jpg" width="23"></a></li>
				<li class="list-inline-item me-3 p-1"><a href="http://pf.kakao.com/_xfialK/chat" target="_blank"><img class="footerimg" src="@/assets/Footer/kakao.jpg" width="23"></a></li>
				<li class="list-inline-item me-3 p-1"><a href="https://facebook.com/surveasy" target="_blank"><img class="footerimg" src="@/assets/Footer/facebook.jpg" width="23"></a></li>
				<li class="list-inline-item me-3 p-1"><a href="https://instagram.com/surveasy/" target="_blank"><img class="footerimg" src="@/assets/Footer/insta.jpg" width="23"></a></li>
				<li class="list-inline-item me-3 p-1"><a href="https://youtube.com/c/Surveasy/featured" target="_blank"><img class="footerimg" src="@/assets/Footer/youtube.jpg" width="23"></a></li>
				</ul>
				</div>
				</div>
		</div>
		</div>
    </div>

  <div class="footer-icons" >
    </div>
</template>

<script>
export default {

}
</script>

<style>
a{
	color : #6c757d;
}

</style>
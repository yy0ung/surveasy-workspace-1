<template>
<header class="navigation bg-tertiary">
	<nav class="navbar navbar-expand-xl navbar-light text-center py-3">
		<div class="container">
			<a class="navbar-brand" href="index.html">
				<img loading="prelaod" decoding="async" class="img-fluid" width="200" src="@/assets/logo.png" alt="surveasy">
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mx-auto mb-2 mb-lg-10">
                    <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">서비스 이용</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><a class="dropdown-item " href="/service">설문 응답 서비스</a>
							</li>
							<li><a class="dropdown-item " href="blog-details.html">설문 템플릿</a>
							</li>
						</ul>
					</li>
					<li class="nav-item"> <a class="nav-link" href="/surveylist">설문 리스트</a>
					</li>
					<li class="nav-item "> <a class="nav-link" href="/knowhow">리서치 노하우</a>
					</li>
					<li class="nav-item "> <a class="nav-link" href="/story">브랜드 스토리</a>
					</li>
					<li class="nav-item "> <a class="nav-link" href="/contact">문의</a>
					</li>
				</ul>
                <span v-if="this.$store.state.loginState.isLoggedIn == false" >
				<a href="/login" class="btn btn-outline-primary">Log In</a>
                <a href="/register" class="btn btn-primary ms-2 ms-lg-3">Sign Up</a>
                </span>
                <span v-else>
                    <li class="nav-item dropdown"> <a class="nav-link" id="navbarDropdown" role="button"> 안녕하세요 {{this.$store.state.loginState.currentUser.name}}님</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><a class="dropdown-item " href="/mypage/dashboard">마이페이지</a>
							</li>
							<li><a class="dropdown-item " href="/" @click="logout">로그아웃</a>
							</li>
						</ul>
					</li>
                </span>
			</div>
		</div>
	</nav>
</header>
</template>

<script>
export default {

methods:{
    logout() {
        this.$store.dispatch('logout')
    }

}
}

</script>

<style>

</style>
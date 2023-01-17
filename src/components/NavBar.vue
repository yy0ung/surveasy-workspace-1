<template>
<header class="navigation bg-tertiary">
	<nav class="navbar navbar-expand-xl navbar-light text-center py-3">
		<div class="container">
			<router-link class="navbar-brand" to="/">
				<img loading="prelaod" decoding="async" class="img-fluid" width="180" src="@/assets/logo.png" alt="surveasy">
			</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mx-auto mt-1 mb-lg-10">
                    <li class="nav-item dropdown"> <router-link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">서비스 이용</router-link>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><router-link class="dropdown-item " to="/service">설문 응답 서비스</router-link>
							</li>
							<li><router-link class="dropdown-item " to="/surveytemplate">설문 템플릿</router-link>
							</li>
						</ul>
					</li>
					<li class="nav-item"> <router-link class="nav-link" to="/surveylist">설문 리스트</router-link>
					</li>
					<li class="nav-item"> <router-link class="nav-link" to="/knowhow">리서치 노하우</router-link>
					</li>
					<li class="nav-item"> <router-link class="nav-link" to="/story">브랜드 스토리</router-link>
					</li>
					<li class="nav-item"> <router-link class="nav-link" to="/contact">문의</router-link>
					</li>
				</ul>
                <span v-if="this.$store.state.loginState.isLoggedIn == false" >
				<router-link to="/login" class="btn btn-outline-primary">로그인</router-link>
                <router-link to="/register" class="btn btn-primary ms-2 ms-lg-3">회원가입</router-link>
                </span>
                <span v-else>
                    <li class="nav-item dropdown"> <a class="nav-link main-color" id="navbarDropdown" role="button"> 안녕하세요 {{this.$store.state.loginState.currentUser.name}}님</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><router-link class="dropdown-item " to="/mypage/dashboard">마이페이지</router-link>
							</li>
							<li><router-link class="dropdown-item " to="/" @click="logout">로그아웃</router-link>
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

li {
list-style: none;
}

</style>
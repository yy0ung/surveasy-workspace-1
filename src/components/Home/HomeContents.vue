<template>
  <section class="m-5">
  <div class="container">
    <div class="row align-items-center justify-content-between">
        <div class="section-title">
          <h1>서베이지가 도와드릴게요</h1>
        </div>
      <div class="col-xl-4 col-lg-12 col-md-12">
        <div class="difference-of-us-item p-3 rounded">
          <div class="d-block d-sm-flex m-3">
            <div class="service-icon m-4"><img src="@/assets/Home/content01.png"></div>
            <div class="block justify-right">
              <h3 class="mb-3 mt-3">설문 응답 수집</h3>
              <p class="mb-0 detail-text">한 번에, 손쉽게 설문 응답을 모아보세요. 설문 링크만 올리면 서베이지의 패널이 빠르게 설문에 응답해드립니다.</p>
              <div class="service-button">
              <button class="btn btn-primary mt-4"><router-link class="font-white" to="/service">더 알아보기</router-link></button>
              </div>
            </div>
            </div>
        </div>
      </div>
    <div class="col-xl-4 col-lg-12 col-md-12">  
        <div class="difference-of-us-item p-3 rounded">
            <div class="d-block d-sm-flex m-3">
                <div class="service-icon m-4"><img src="@/assets/Home/content02.png"></div>
                <div class="block justify-right">
              <h3 class="mb-3 mt-3">인터뷰이 모집</h3>
              <p class="mb-0 detail-text">인터뷰를 해야할 땐, 인터뷰이 모집 서비스를 이용해보세요. 원하는 인터뷰이를, 원하는 일정에 맞게 구해드립니다.</p>
              <div class="service-button">
              <button class="btn btn-primary mt-4"><div class="font-white" to="/service">오픈 예정</div></button>
              </div>
              </div>
            </div>
          </div>
    </div>
    <div class="col-xl-4 col-lg-12 col-md-12">
        <div class="difference-of-us-item p-3 rounded">
          <div class="d-block d-sm-flex m-3">
            <div class="service-icon m-4"><img src="@/assets/Home/content03.png"></div>
            <div class="block justify-right">
              <h3 class="mb-3 mt-3">베타테스터 모집</h3>
                <p class="mb-0 detail-text">앱이나 웹사이트 출시를 앞두고 계신가요? 정식 출시에 앞서, 베타테스터를 모집해 오류는 없는지 미리 확인해보세요!</p>
                <div class="service-button">
                <a class="font-white" href="https://surveasy.oopy.io/betaservice"><button class="btn btn-primary mt-4">더 알아보기</button></a>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</div>
</section>
</template>

<script>
export default {

}
</script>

<style>
.service-icon {
    max-width: 150px;
}

.detail-text {
  line-height: 1.7em;
}

.service-button {
  text-align: right;
}

.font-white {
  color : white;
}
</style>
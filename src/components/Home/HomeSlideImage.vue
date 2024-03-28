
<template>

  <!--세로사이즈 수정 필요-->
  <div class="mainbanner">
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="mainbanner01">
          <div class="row">
            <div class="col-auto m-auto text-left">
              <div class="banner-text">
              <span class="banner-text-title">설문 응답 서비스<br>일시 중단</span>
              <p class="banner-text-contents"><br>재정비를 위해 잠깐 쉬어갑니다. <br> *중단 기간: 2024.04.01 ~ 04.04</p>
            </div>
          </div>
              <div class="col-auto mx-auto align-items-right">
              <img src="@/assets/Home/bannercontent02.png" class="d-block banner-icon" alt="...">
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="mainbanner02">
          <div class="row">
            <div class="col-auto m-auto text-left">
              <div class="banner-text">
              <span class="banner-text-title">쉽고 빠르게,<br>설문 응답 수집하기</span>
              <p class="banner-text-contents">여기저기 올릴 필요 없이 서베이지에만 올리세요!</p>
            </div>
            </div>
            <div class="col-auto mx-auto align-items-right">
            <img src="@/assets/Home/bannercontent01.png" class="d-block banner-icon" alt="...">
        </div>
      </div>
      </div>
      </div>
      <!-- <div class="carousel-item active">
        <div class="mainbanner01">
          <div class="row">
            <div class="col-auto m-auto text-left">
              <div class="banner-text">
              <span class="banner-text-title">쉽고 빠르게,<br>설문 응답 수집하기</span>
              <p class="banner-text-contents">여기저기 올릴 필요 없이 서베이지에만 올리세요!</p>
            </div>
          </div>
              <div class="col-auto mx-auto align-items-right">
              <img src="@/assets/Home/bannercontent01.png" class="d-block banner-icon" alt="...">
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="mainbanner02">
          <div class="row">
            <div class="col-auto m-auto text-left">
              <div class="banner-text">
              <span class="banner-text-title">대학생, 대학원생이라면<br>최대 40%할인까지</span>
              <p class="banner-text-contents">횟수 제한 없이, 인증만 하면 누구나</p>
            </div>
            </div>
            <div class="col-auto mx-auto align-items-right">
            <img src="@/assets/Home/bannercontent02.png" class="d-block banner-icon" alt="...">
        </div>
      </div>
      </div>
      </div> -->

      <!-- <div class="carousel-item">
        <div class="mainbanner03">
          <div class="row">
            <div class="col-auto m-auto text-left">
              <div class="banner-text">
              <span class="banner-text-title">인터뷰이를 구하시나요?<br>저희가 구해드려요</span>
              <p class="banner-text-contents">인터뷰이 모집 서비스 OPEN</p>
              <p></p>
            </div>
          </div>
            <div class="col-auto mx-auto align-items-right">
            <img src="@/assets/Home/bannercontent03.png" class="d-block banner-icon" alt="...">
        </div>
        </div>
        </div>
      </div> -->
    </div>
  
  </div>
  </div>
  
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  .mainbanner {
    position: relative;
    margin: auto;
    overflow: hidden;
    max-height: 500px;
    max-width: 1300px;
    vertical-align: middle;
  }
  
  .mainbanner01 {
    background-color: #f1efe7;
  }

  .mainbanner02 {
    background-color: #f4fef0;
  }

  .mainbanner03 {
    background-color: #f2f9fe;
  }
  
  .mainbanner-img {
    display : inline;
    position: absolute;
  }

@media screen and (min-width: 850px) {
  .banner-text {
    margin-left: 100px;
  }
  .banner-text-title{
    line-height: 1.3em;
    color: black;
    font-size: 3em;
    text-align: left;
    align-items: center;
    font-weight: 500;
  }
  .banner-text-contents{
    color: black;
    text-align: left;
    font-size: 1.5em;
    align-items: center;
    font-weight: 400;
  }
  .banner-icon{
    width:400px;
  }
}

@media screen and (max-width: 851px) {
  .banner-text {
    margin-top: 50px;
  }
  .banner-text-title{
    line-height: 1.3em;
    color: black;
    font-size: 1.7em;
    align-items: center;
    font-weight: 700;
  }
  .banner-text-contents{
    line-height: 1.3em;
    color: black;
    text-align: left;
    font-size: 1.3em;
    align-items: center;
    font-weight: 400;
  }
  .banner-icon{
    width:300px;
  }
}
  </style>
  
  

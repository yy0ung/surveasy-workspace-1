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
      <img src="@/assets/Home/banner01.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="@/assets/Home/banner02.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="@/assets/Home/banner03.jpg" class="d-block w-100" alt="...">
    </div>
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
  text-align: center;
  max-width: 1300px;
}

</style>
<template>
<div id="Review-container">
  <div class="review-title">
    <p><span id="re-green">공개후기</span> 작성하기</p>
  </div>
  <div class="review-contents">
    <p class="con-title">[{{title.id}}] 설문 의뢰는 어땠나요?</p>
    <div class="star">
      <img class="starimg" src="@/assets/myPage/restar.png" width="40">
      <img class="starimg" src="@/assets/myPage/refullstar.png" width="40">

      <img class="starimg" src="@/assets/myPage/restar.png" width="40">
      <img class="starimg" src="@/assets/myPage/restar.png" width="40">
      <img class="starimg" src="@/assets/myPage/restar.png" width="40">
      <img class="starimg" src="@/assets/myPage/restar.png" width="40">
    </div>
    <textarea class="review-text" v-model="reviewData.reviewText" placeholder="설문 의뢰 후기를 작성해주세요. 여러분의 후기는 서베이지의 다른 고객에게 공개되어 &#13;&#10;서비스 이용에 도움이 됩니다."></textarea>
    <div class="btn-review">
      <button class="btn-r">작성 완료</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$route.params,
      reviewData: {
        score: 0,
        reviewText: '',
      }
      
    }
  },

}
</script>

<style>
#Review-container{
  height: 600px;
  width: 1190px;
  margin-left: auto;
  margin-right: auto;
}
.review-title{
  font-size: 1.1rem;
  text-align: left;
  margin-left: 300px;
  margin-top: 50px;
}
#re-green{
  color:#0AAB00;
}
.con-title{
  margin-top: 30px;
  margin-bottom: 40px;
}
.review-text{
  width: 550px;
  padding-bottom: 100px;
  padding-top: 10px;
  padding-left: 10px;
  margin-top: 50px;
  font-family: 'Noto Sans KR', sans-serif;

}
.starimg{
  color: green;

}
.btn-r{
  margin-top: 40px;
  padding: 5px 20px;
  font-size: 0.9rem;
  font-family: 'Noto Sans KR', sans-serif;
  border: 1px solid #0AAC00;
  border-radius: 24px;
  opacity: 1;
  background: white;
  color: #0AAC00;

}
.btn-r:hover{
  background-color: #0AAC00;
  color: white;
}
</style>
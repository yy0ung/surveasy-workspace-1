<template>
<div id="members-container">
  <div>
    <h3>StoryMembers</h3>
  </div>
  <div class="iframe-content">
    <iframe width="280" height="157" src="https://www.youtube.com/embed/woMeiAAfM3c?controls=0" title="YouTube video player" 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
  #members-container{
    border: 1px solid black;
    border-radius: 10px;
    margin: 20px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    padding-right: 30px;
}
#members-container .iframe-content{
  display: flex;
  padding-left: 30px;
  padding-bottom: 10px;
}
</style>
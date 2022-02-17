<template>
<div id="admin-panelProof">
<h4>설문 인증 {{id}}</h4>

<span v-for="item in urlList" :key="(item)">
  <img :src="item[0]" class="proof-image">
  <!-- 버튼 눌렀을 때 기능 구현 -->
  <button id="info-text">{{item[1].substring(33)}}</button>
</span>
<!-- <span v-for="item in imageInfo" :key="item">
  <span id="info-text">{{item}}</span>
</span> -->

</div> 
</template>

<script>
import { getStorage, ref, getDownloadURL, listAll, list } from "firebase/storage"
export default {
  data() {
    return {
      urlList : [],
      id : this.$route.params.id
      //imageInfo : []
    }
  },
  mounted() {
    this.downLoad()
  },
  methods: {
    downLoad(){
      const storage = getStorage();

// Create a reference under which you want to list
    const listRef = ref(storage, this.id+"/")
    //console.log(listRef)

// Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        window.alert("불러오는 중")
      res.prefixes.forEach((folderRef) => {
       //console.log(folderRef)
     });
      res.items.forEach((itemRef) => {
        //console.log(itemRef._location)
        const path = ref(storage, itemRef._location.path_)
        getDownloadURL(path).then((url) => {
        var list = [url,itemRef._location.path_]
        this.urlList.push(list)
        
        
        
        })
        
      })
      
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
      },
    
    
    }

}
</script>

<style>
#admin-panelProof{
  height: 1000px;
}
.proof-image{
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
#info-text{
  font-size: 10px;
  margin-right: 10px;
}

</style>
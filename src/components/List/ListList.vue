<template>
  <div id='list-view-container'>
    <p></p>
    <!--테이블 만들기 -->
    
    <table id='list-table'>
      <tr>
        <th>#</th>
        <th id="title-left">설문 제목</th>
        <th>설문 대상</th>
        <th>소요시간</th>
        <th>요구 응답수</th>
        <th>의뢰자</th>
        
        <th></th>
      </tr>
      <tr v-for="item in (this.$store.state.surveyData.slice(currentPage*10-10,currentPage*10))" :key="item.id">

        <td class="list-de" :class="{active: (dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3)}">{{item[0].id}}</td>

          


          <!-- <router-link :to="`/surveylist/${item[0].id}`" class="list-title" :class="{active:item[0].progress==3}">{{item[0].title}}</router-link> -->



        <td id="title-left">
          <div v-if="item[0].progress >= 3">
            <span class="list-title" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}" ><span v-if="(item[0].title).length<43">{{item[0].title}}</span>
            <span v-else>{{(item[0].title).substring(0,44)}}...</span></span>
            <span class="due" v-if="dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3}">마감</span>
            <span class="due" v-else :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{calTime(item[0].dueDate,item[0].dueTimeTime)}}</span>
          </div>
          <div v-else>
            <span @mouseover="item[0].notice = true" @mouseleave="item[0].notice = false">
              <span v-if="item[0].notice == true">
                <a :href="item[0].link" target="_blank" class="list-title" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}" >
                  <span v-if="item[0].title.length > 44">{{(item[0].title).substring(0,35)}}<br>{{(item[0].title).substring(35,item[0].title.length)}}</span>
                  <span v-else>{{item[0].title}}</span>
                </a>
                
              </span>
              <span v-else>
                <a :href="item[0].link" target="_blank" class="list-title" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}" >
                  <span v-if="item[0].title.length > 44">{{(item[0].title).substring(0,44)}}...</span>
                  <span v-else>{{item[0].title}}</span>
                </a>
              </span>
              
            
            </span>
            
            
            <span class="due" v-if="dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3}">마감</span>
            <span class="due" v-else :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{calTime(item[0].dueDate,item[0].dueTimeTime)}}</span>
          </div>
          
          

        </td>
        

        <td class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{item[0].target}}</td>
        <td class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{item[0].spendTime}}</td>
        <td class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{item[0].requiredHeadCount}}</td>
        <td class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">
          {{item[0].uploader.substring(0,item[0].uploader.length-1)+"*"}} 
        </td>

         
      </tr>
    </table>
    <br>
    <div id='page-button'>
      <button :disabled="currentPage==1" @click="dec">이전 </button>
      {{currentPage}}
      <button :disabled="currentPage==totalPage" @click="inc">다음</button>
      
    </div>
    <br>
    <br><br>
    
  </div>
</template>

<script>

import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import { ref } from 'vue'





export default {
  data(){
    
    return{
      a:0,
      b:5,
      currentPage:1,
      dataSet : {
        isDone: false,
        headCount: 0,
        keyword: [],
        paidPrice: 0,
        dueTime: 'time',
        spendTime: 0,
        requireHeadCount: 0,
        surveyInstitute: '',
        surveyLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdTWah7LXvFHOBk6RZowuyaNk_xfRssgtH29zRJPoAfygEKnQ/viewform?embedded=true',
        surveyTitle: '',
        uploadTime:'time',
        uploader:'',
        id:0
      },
      
      
     
      
    }
  },
  
  methods:{
    
    inc(){
      this.currentPage += 1
    },
    dec(){
      this.currentPage -= 1
    },
    dueTime(date,time){
      // var dueDate = date
      var due = new Date(date)
      var timeHour = time.substring(0,2)
      var dateDiff = due.getTime()/3600000 - Date.now()/3600000 + (timeHour-9)
      return dateDiff
    },
    calTime(date,time){
      // var dueDate = date
      var due = new Date(date)
      var timeHour = time.substring(0,2)
      var dateDiff = due.getTime()/3600000 - Date.now()/3600000 + (timeHour-9)
      var Dday = ''
      
      // console.log(due.getTime()/3600000)
      // console.log(Date.now()/3600000)
      
      if(dateDiff<0){
        Dday='마감'
      }
      else if(dateDiff<24 && dateDiff>0){
        Dday = Math.floor(dateDiff)+'시간 후 마감'
      }else if(dateDiff<48){
        Dday = 'D-1'
      }else if(dateDiff<72){
        Dday = 'D-2'
      }else if(dateDiff<96){
        Dday = 'D-3'
      }else if(dateDiff<120){
        Dday = 'D-4'
      }else if(dateDiff<144){
        Dday = 'D-5'
      }else if(dateDiff<168){
        Dday = 'D-6'
      }else if(dateDiff<192){
        Dday = 'D-7'
      }
      return Dday
    }
    
    
  },
  computed:{
    totalPage(){
      let surveyDataLength = this.$store.state.surveyData.length
      let pageCount = Math.floor((surveyDataLength / 10 ) +1)
      

      return pageCount
    },
    // disp(text){
    //   return text.length<30 ? 'none' : 'flex'
    // }
    
    
  }
  

}
</script>

<style>
#list-view-container{
  font-family: 'Noto Sans KR', sans-serif;
  margin-bottom: 50px;
  padding-top: 50px;
  height: 700px;
}
#list-table{
  border: 0px solid black;
  width: 70%;
  margin: auto;
  border-spacing: 0;
  margin-top: 120px;
  margin-bottom: 50px;
  
}
.due{
  margin-left: 20px;
  background: #0AAB00 0% 0% no-repeat padding-box;
  border-radius: 10px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  padding: 3px 7px;
  color: white;
  font-weight: 300;
}
.due.active{
  background-color: #9b9a9a;
}
#title-left{
  text-align: left;
  padding-left: 100px;
  min-width: 600px;
}

#list-table td{
  border-bottom: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
  
}

#list-table th{
  border-bottom: 1px solid #0CAE02;
  padding-bottom: 20px;
  color: #0CAE02;
}
#list-table-title {
  width: 70%;
  border: 0px solid black;
  margin: auto;
  text-align: left;
  padding-bottom: 60px;
  padding-top: 100px;
}

#page-button{
  display: inline;
  
  
}
#page-button button{
  border: 1px solid #0AAB00;
  color: #0AAB00;
  background: white;
  padding: 5px 8px;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  
}
#page-button button:hover{
  color: white;
  background: #0AAB00;
  cursor: pointer;
}
#page-button button:disabled{
  cursor: pointer;
  color: #848484;
  border: #848484 1px solid;
}
#page-button button:disabled:hover{
  color: #848484;
  background: white;
  cursor: pointer;
}

.responded {
  color: #af2232
}
.list-de{
  min-width: 80px;
}
.list-de.active{
  color: #7A7A7A;
  font-weight: 300;
}
.list-title.active{
  color: #7A7A7A;
  font-weight: 300;
}
.list-title{
  color: #0CAE02;

}


</style>
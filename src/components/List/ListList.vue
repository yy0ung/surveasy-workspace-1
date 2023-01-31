<template>
  <section class="section">
	<div class="container">
		<div class="row">
      <div class="section-title text-center">
        <p class="text-primary text-uppercase fw-bold mb-3">Survey List</p>
          <h1>설문 리스트</h1>
        </div>
						<div class="col-12 col-xl-6" data-aos="fade" v-for="item in (this.$store.state.surveyData.slice(currentPage*10-10,currentPage*10))" :key="item.id">
              <div class="rounded border-green shadow py-4 px-4 my-4 mx-2">
									<h5><a class="text-black">
                    <div v-if="item[0].progress >= 3">
                      <p>
                      <span class="list-de label endlabel m-1" :class="{active: (dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3)}"><u>{{item[0].lastIDChecked}}</u></span>
                        <span class="list-de label endlabel m-1" v-if="dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3}">마감</span>
                      <span class="list-de label endlabel m-1" v-else :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{calTime(item[0].dueDate,item[0].dueTimeTime)}}</span>
                      </p>
                      <span v-if="item[0].title.length>33" class="list-title m-1" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}">{{item[0].title.substring(0,32)}}...</span>
                      <span v-if="item[0].title.length<=32" class="list-title m-1" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}">{{item[0].title}}</span>
                    </div>
                    <div v-else>
                      <span @mouseover="item[0].notice = true" @mouseleave="item[0].notice = false">
                        <span v-if="item[0].notice == true">
                          <p>
                          <span class="label duelabel m-1" :class="{active: (dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3)}"><u>{{item[0].lastIDChecked}}</u></span>
                          <span class="label duelabel m-1" v-if="dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3}">마감</span>
                          <span class="label duelabel m-1" v-else :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{calTime(item[0].dueDate,item[0].dueTimeTime)}}</span>
                          </p>
                          <a :href="item[0].link" target="_blank" class="list-title" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}" >
                            <span v-if="item[0].title.length>33" class="text-green m-1">{{item[0].title.substring(0,32)}}...</span>
                            <span v-if="item[0].title.length<=32" class="text-green m-1">{{item[0].title}}</span>
                          </a>
                        </span>
                        <span v-else>
                          <p>
                          <span class="label duelabel m-1" :class="{active: (dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3)}"><u>{{item[0].lastIDChecked}}</u></span>
                          <span class="label duelabel m-1" v-if="dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)>=0 && item[0].progress>=3}">마감</span>
                          <span class="label duelabel m-1" v-else :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}">{{calTime(item[0].dueDate,item[0].dueTimeTime)}}</span>
                          </p>
                          <a :href="item[0].link" target="_blank" class="list-title" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0|| item[0].progress>=3}" >
                            <span v-if="item[0].title.length>33" class="text-green m-1">{{item[0].title.substring(0,32)}}...</span>
                            <span v-if="item[0].title.length<=32" class="text-green m-1">{{item[0].title}}</span>
                          </a>
                        </span>
                      </span>
                    </div>
                  </a>
                </h5>
                <hr>
                <!-- 설문대상 -->
                <div class="col-12">
                <p v-if="item[0].target.length>36" class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}"><span class="label contentslabel m-2">설문대상</span>{{item[0].target.substring(0,36)}}...</p>
                <p v-if="item[0].target.length<=36" class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}"><span class="label contentslabel m-2">설문대상</span>{{item[0].target}}</p>
                  </div>
                <div class="col-12">
                <p class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}"><span class="label contentslabel m-2">응답수</span> {{countPpl(item)}}</p>
                </div>
                <div class="col-12">
                <p class="list-de" :class="{active:dueTime(item[0].dueDate,item[0].dueTimeTime)<0 || item[0].progress>=3}"><span class="label contentslabel m-2">의뢰자</span>
                {{item[0].uploader.substring(0,item[0].uploader.length-1)+"*"}} 
                </p>
								</div>
              </div>
						</div>
						<div class="col-12">
							<nav class="mt-4">
								<!-- pagination -->
								<nav class="mb-md-50">
									<ul class="pagination justify-content-center">
										<li class="page-item inactive"> 
                        <a class="page-link" :disabled="currentPage==1" @click="dec">
                        이전
                      </a>
										</li>
										<li class="page-item">
                      <a class="page-link">
                      {{currentPage}}
                      </a>
										</li>
										<li class="page-item">
											<a class="page-link" :disabled="currentPage==totalPage" @click="inc">
                        다음
											</a>
										</li>
									</ul>
								</nav>
							</nav>
						</div>
					</div>
				</div>
</section>
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
  
  mounted() {
    window.scrollTo(0,0)
    },

  methods:{

    countPpl(item){
      if(item[0].progress>=3){
        return item[0].requiredHeadCount
      }else{
        return item[0].respondedPanel.length +" / "+ item[0].requiredHeadCount
      }
    },
    
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
      var dateDiff = due.getTime()/3600000 - Date.now()/3600000 + (timeHour-8)
      return dateDiff
    },
    calTime(date,time){
      // var dueDate = date
      var due = new Date(date)
      var timeHour = time.substring(0,2)
      var dateDiff = due.getTime()/3600000 - Date.now()/3600000 + (timeHour-8)
      var Dday = ''
      
      // console.log(due.getTime()/3600000)
      // console.log(Date.now()/3600000)
      
      if(dateDiff<0){
        Dday='마감'
      }else if(dateDiff>=0 && dateDiff<1){
        Dday = '1시간 이내 마감'
      }
      else if(dateDiff<24 && dateDiff>1){
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
.contentslabel{
  border: 1px solid #519d9e;
    color: darkgray;
  width:100px;

}
.duelabel{
  background-color: #51B56D;
    color: white;
}

.endlabel{
  background-color: darkgray;
    color: white;
}

.label {
  position: relative;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
}

.text-green {
  color: #51B56D;
}
.border-green {
  border: 1px solid #51B56D;
}
.due{
  border-radius: 20px;
}

.rounded-button{
  width:30px;
  height:30px;
  background:gray;
  color:white;
  display:inline-flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border:none;
  text-decoration: none;
}

.list-de{
  font-size: 0.8rem;
}
</style>
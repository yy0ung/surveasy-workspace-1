<template>
  <div class="serviceInputForm-container">

      <div class="serviceInputForm-container-option">
            <ul id="info-title">옵션 정보</ul>
            <div class="option">
                <ul id="showOption-title">요구 응답 수</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.requiredHeadCount }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">소요 시간</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.spendTime }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">마감 기한 지정</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.dueTime }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">영어 설문 여부</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.ENTarget }}</ul>
            </div>
            <div class="option">
                <ul id="showOption-title">할인 대상 여부</ul>
                <ul id="showOption-value">{{ this.$store.state.localSurveyState.identity }}</ul>
            </div>            
            

            <ul>{{ this.$store.state.localSurveyState.title }}</ul>
            <ul>{{ this.$store.state.localSurveyState.target }}</ul>
            <ul>{{ this.$store.state.localSurveyState.institute }}</ul>
            <ul>{{ this.$store.state.localSurveyState.link }}</ul>
                        

      </div>

        <div class="serviceInputForm-container-survey">
            <div class="survey-info">
                <ul id="info-title">설문 정보</ul>                    
                <ul id="info-detail">
                    <ul class="info-detail-text">설문 제목</ul>
                    <ul class="info-detail-input"><input type="text" v-model="title" placeholder="예) 쓰레기 분리수거에 대한 대학생 인식조사" required></ul>
                </ul>
                <ul id="info-detail">
                    <ul class="info-detail-text">설문 대상</ul>
                    <ul class="info-detail-input"><input type="text" v-model="target" placeholder="예) 20대 여성, 1인 가구" required></ul>
                </ul>
                <ul id="info-detail">
                    <ul class="info-detail-text">설문 기관</ul>
                    <ul class="info-detail-input"><input type="text" v-model="institute" placeholder="예) OO학교 OO수업, OO학회, OO대학원, OO기업" required></ul>
                </ul>
                <ul id="info-detail">
                    <ul class="info-detail-text">설문 링크</ul>
                    <ul class="info-detail-input"><input type="text" v-model="link" placeholder="링크가 잘 작동하는지 꼭 확인해주세요." required></ul>
                </ul>
                <ul><button class="link-check-btn" @click="showLinkModal()">링크 확인하기</button></ul>
                <LinkCheckModal :showLinkIframe="showLinkIframe" @closeIframe="showLinkModal()" />
                <ul id="info-detail">
                    <ul class="info-detail-text">설문 참여 유의사항</ul>
                    <ul class="info-detail-input"><input type="text" v-model="notice" placeholder="예) PC참여 권장, 영상 시청 필요, 외부 링크 이동 필요"></ul>
                </ul>              
            </div>

            <div class="show-price-container2">
                <span class="service-option-totalprice-word">총 금액</span>
                <span class="service-option-totalprice-price">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.$store.state.localSurveyState.price }}원</span>
            </div>


            <button class="goServicePayDone-btn" @click="sendToAdmin(this.$store.state.localSurveyState)">결제하기</button>



        </div>
  </div>
</template>

<script>
import LinkCheckModal from '../../components/Service/Service2/LinkCheckModal.vue'
import { arrayUnion, doc, setDoc, updateDoc } from '@firebase/firestore';

export default {
    data() {
        return {
            title: '',
            target: '',
            institute: '',
            link: '',
            notice:'',

            showLinkIframe: false,
            

        }
    },

    components: { LinkCheckModal },

    methods: {
        showLinkModal() {
            this.showLinkIframe = !this.showLinkIframe
            this.$store.state.checklink = this.link
        },

        // setOption2() {
        //     this.$store.commit('setSurveyMutation2', {title: this.title, target: this.target, institute: this.institute, link: this.link, notice: this.notice});
        //     console.log(this.$store.state.localSurveyState)

        // },

        async sendToAdmin(dataset) {
            var db = this.$store.state.db
            var localLastID = this.$store.state.lastID[0].lastID
            var currentUserEmail = this.$store.state.currentUser.email
            
            
            this.$store.commit('setSurveyMutation2', {title: this.title, target: this.target, institute: this.institute, link: this.link, notice: this.notice, uploader: this.$store.state.currentUser.name});
            console.log(this.$store.state.localSurveyState)
            
            await setDoc(doc(db, "adminRequired", localLastID.toString()), {
                price : dataset.price,
                requiredHeadCount : dataset.requiredHeadCount,
                spendTime: dataset.spendTime,
                dueTime: dataset.dueTime,
                ENTarget: dataset.ENTarget,

                title: dataset.title,
                target: dataset.target,
                institute : dataset.institute,
                link : dataset.link,
                notice : dataset.notice,
                adminApproved : dataset.adminApproved,
                uploader : dataset.uploader,
                uploadTime : new Date(),
                id : localLastID
                
            })

            var idDocref = doc(db, "lastID", "lastID")
            var currentUserRef = doc(db, "userData", currentUserEmail)
            await updateDoc(idDocref, {
                lastID : (localLastID + 1)
            })

            await updateDoc(currentUserRef, {
                uploadIndex: arrayUnion(localLastID)
            })

            
            
        }

    },
  
  
}
</script>

<style>
.serviceInputForm-container {
    margin: 80px;
    padding: 70px;
    border-radius: 10px;
    background-color: rgb(231, 231, 231);
    display: flex;
    flex-direction: row;
}
.serviceInputForm-container-option {
    width: 1300px;
    z-index: 1;
}
.serviceInputForm-container-option ul {
    text-align: left;
    font-size: 13px;
    margin: 0;
}
#info-title {
    margin: 0px 0 50px 0;
    font-size: 25px;
    font-weight: bold;
}
.option {
    margin-bottom: 20px;
}
.serviceInputForm-container-option #showOption-title {
    color: grey;
}
.serviceInputForm-container-option #showOption-value {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
}


.serviceInputForm-container-survey {
    width: 2000px;
    z-index: 1;
}
.survey-info {
    text-align: left;
}
.survey-info .info-detail {
    display: flex;
    flex-direction: column;
}
#info-detail ul {
    display: inline-block;
}
.survey-info .info-detail-text {
    width: 140px;
    padding: 0;
    text-align: left;
    font-weight: bold;
}
.survey-info input {
    width: 650px;
    border: none;
    margin: 7px;
    padding: 5px;
    font-size: 18px;
}
.link-check-btn {
    background-color: #0CAE02;
    border: #0CAE02;
    height: 30px;
    color: white;
    border-radius: 10px;
    margin-left: 750px;
    cursor: pointer;
    
}
.show-price-container2 {
    width: 950px;
    margin-top: 30px;
    text-align: right;
    color:#0CAE02;
}
.show-price-container2 .service-option-totalprice-price {
    margin-right: 60px;
}
.goServicePay2-btn {
    float: right;
    width: 100px;
    height: 30px;
    margin: 20px 60px 20px 0;
    color:#0CAE02;
    background-color: rgb(231, 231, 231);
    border: 1.5px solid #0CAE02;
    border-radius: 30px;
    font-size: 15px;
    cursor: pointer;
}
</style>
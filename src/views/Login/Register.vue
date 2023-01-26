<template>

 <div class="container">
		<div class="row justify-content-center align-items-center">
			<div class="col-lg-6"></div>
			<div class="col-lg-8">
			    <div class="shadow rounded p-5 bg-white">
			        <div class="row">
                        <div class="col-lg-2"></div>
			            <div class="col-lg-8">
                			<div class="section-title text-center">
                                <div style="padding:20px"></div>
                                <img class="checkimg" src="@/assets/check.png" width="100">
                                <div style="padding:20px"></div>
					            <h2>회원가입</h2>
                                <h4>서베이지 회원가입</h4>
                            </div>
                            <form class="contact-form">
    	                        <div class="form-group mb-4 pb-2">
                                    <p class="m-1">이메일 주소*</p>
                                    <input type="email" class="form-control shadow-none" id="email" v-model="dataSet.email" required>
                                </div>
    	                        <div class="form-group mb-4 pb-2">
                                    <p class="m-1">비밀번호*</p>
                                    <input type="password" class="form-control shadow-none" id="password" v-model="dataSet.password" required>
                                    <div class="password-notice">* 8자리 이상의 비밀번호를 설정해주세요.</div>
                                </div>
    	                        <div class="form-group mb-4 pb-2">
                                     <p class="m-1">비밀번호 확인*</p>
                                    <input type="password" class="form-control shadow-none" id="passwordcheck" v-model="dataSet.passCheck" required>
                                </div>
                                <div class="form-group mb-4 pb-2">
                                    <p class="m-1">이름*</p>
                                    <input type="text" class="form-control shadow-none" id="name" v-model="dataSet.name" required placeholder="꼭 실명을 작성해주세요.">
                                </div>
                                <div class="form-group mb-4 pb-2">
                                    <p class="m-1">휴대폰 번호*</p>
                                    <input type="tel" class="form-control shadow-none" id="tel" v-model="dataSet.phoneNumber" required placeholder="- 없이 입력해주세요.">
                                </div>
                                <div class="form-group mb-4 pb-2">
                                    <p class="m-1">생년월일*</p>
                                    <input type="num" class="form-control shadow-none" id="birth" v-model="dataSet.birth" required placeholder="ex. 20220101">
                                </div>
                                <div class="row mb-4">
                                    <p class="m-1">가입경로*</p>
                                    <div class="col-1"></div>
                                    <div class="col-5">
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="everytime" v-model="dataSet.funnel" value="everytime">
                                            <label class="radio-text" for="everytime">에브리타임</label> 
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="kakaotalk" v-model="dataSet.funnel" value="kakaotalk">
                                            <label class="radio-text" for="kakaotalk">카카오톡 단톡방</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="google" v-model="dataSet.funnel" value="google">
                                            <label class="radio-text" for="google">구글 검색</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="naver" v-model="dataSet.funnel" value="naver">
                                            <label class="radio-text" for="naver">네이버 검색</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="instagram" v-model="dataSet.funnel" value="instagram">
                                            <label class="radio-text" for="instagram">인스타그램</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="etc" v-model="dataSet.funnel" value="etc">
                                            <label class="radio-text" for="etc">기타</label>
                                        </div>
                                    </div>
                                    <div class="col-5">
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="blog" v-model="dataSet.funnel" value="blog">
                                            <label class="radio-text" for="blog">네이버 블로그</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="지식in" v-model="dataSet.funnel" value="지식in">
                                            <label class="radio-text" for="지식in">네이버 지식인</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="cafe" v-model="dataSet.funnel" value="cafe">
                                            <label class="radio-text" for="cafe">네이버 카페</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="e-mail" v-model="dataSet.funnel" value="email">
                                            <label class="radio-text" for="e-mail">이메일 홍보</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="offline" v-model="dataSet.funnel" value="offline">
                                            <label class="radio-text" for="offline">오프라인 홍보</label>
                                        </div>
                                        <div class="form-check p-1">
                                            <input type="radio" class="form-check-input" name="from" id="acquaintance" v-model="dataSet.funnel" value="acquaintance">
                                            <label class="radio-text" for="acquaintance">지인 추천</label>
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                                <p class="m-1">유입경로*</p>
                                <input type="text" class="form-control shadow-none" id="funnelDetail" v-model="dataSet.funnel_detail" required placeholder="해당 유입경로에 대한 상세내용을 작성해주세요">
                                <p class="m-1">검색 유입인 경우 <u>검색어</u>, <br>에브리타임 · 카카오톡 · 네이버 카페인 경우 <u>소속</u>을 알려주세요.</p>
                                <div>
                                <hr class="col-12 mx-auto">
                                <p class="m--">이용약관*</p>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkAll" v-model="checkAll">
                                    <label class="form-check-label" for="checkAll"><b>전체 동의하기</b></label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="dataSet.check1">
                                    <label class="form-check-label"><router-link :to="{name: 'Term1'}" target="_blank">서베이지 이용약관 (필수)</router-link>
                                    </label>
                                    </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="dataSet.check2">
                                    <label class="form-check-label"><router-link :to="{name: 'Term2'}" target="_blank">서베이지 개인정보 보호 방침 (필수)</router-link>
                                    </label>
                                    </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="dataSet.check3">
                                    <label class="form-check-label">회원가입 시 작성한 개인 정보가 모두 올바름을 확인합니다.<br>가입 오류로 인한 불이익은 이용자의 책임임을 인지하고 있습니다. (필수)
                                    </label>
                                    </div>
                                    <div class="m-2"></div>
                                    <a class="btn btn-primary w-100" @click="validateRegister(this.dataSet);">회원가입하기</a>
                                    </div>     
                                </form>
                                    </div>
                                    </div>
                                </div>
                                    <div class="col-lg-3"></div>
                                </div>
                                </div>
                            </div>
                            <div style="padding:20px"></div>
</template>

<script>
import { getAuth,  createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore';
export default {
    data(){
        
        return{
            dataSet:{
              email:null,
              password:null,
              passCheck:null,
              phoneNumber:null,
              name:null,
              funnel:null,
              funnel_detail:null,
              birth:null,
              check1: false,
                check2: false,
                check3: false
                 
            },
            
           

            validReg : false,
            
        }
    },
    computed: {
        checkAll: {
            get: function(){
                return this.check1+','+this.check2+','+this.check3
            },
            set: function(e){
                if(e==true){
                    this.dataSet.check1 =true;
                    this.dataSet.check2 =true;
                    this.dataSet.check3 =true;
                }else{
                    this.dataSet.check1 =false;
                    this.dataSet.check2 =false;
                    this.dataSet.check3 =false;
                }
                
            }
           
        }
        },
        
    
    mounted() {
    window.scrollTo(0,0)
  },
    methods:{

        hasNullOption(dataSet) {
            if(dataSet.email == null || dataSet.password == null || dataSet.passCheck == null || dataSet.phoneNumber == null 
                || dataSet.name == null || dataSet.funnel == null || dataSet.funnel_detail == null || dataSet.funnel_detail == "") {
                    return true
            }
            return false
        },
        
        
        validateRegister(dataSet){  
            var errCode = [];
            
            // 입력하지 않은 항목이 있는지 체크
            // for (var key in dataSet) {
            //     if (key==null) {
            //         errCode.push(1)
            //     }
            // }

            if(this.hasNullOption(dataSet)) {
                errCode.push(1)
            }
            else {
                if (dataSet.password !== dataSet.passCheck){
                    errCode.push(2)
                }

                if ((dataSet.password).length < 8) {
                    errCode.push(3)
                }

                //휴대폰번호 숫자만있는지 확인 (#Todo)
                if((dataSet.phoneNumber).length<11 || isNaN(dataSet.phoneNumber)==true || (dataSet.phoneNumber).includes('.')==true){
                    errCode.push(4)
                }
                
                if((dataSet.birth).length<8 || dataSet.birth>=20220000){
                    errCode.push(5)
                }
                
                if(!(dataSet.check1 ==true && dataSet.check2 ==true && dataSet.check3 ==true)){
                    errCode.push(6)
                }

            }
        
            
            if (errCode.length == 0 ){
                this.validReg = true
                this.create(dataSet)
                
                
            } else {
                 //console.log(errCode)
                 //console.log(dataSet)
                var registerErrorMessage =[
                "",
                "입력하지 않은 항목이 있습니다.",
                "비밀번호 확인란을 올바르게 입력하세요.",
                "비밀번호는 8자 이상이여야 합니다.",
                "휴대폰 번호를 올바르게 입력하세요.",
                "생년월일을 올바르게 입력하세요.",
                "약관에 동의해주세요."
                

                ]
                
                
                var errArr =[]
               
                for(var i=0; i<errCode.length; i++){
                    errArr.push(registerErrorMessage[errCode[i]])
                    
                }
                // console.log(errArr)
                var msg = ''
                for(var err in errArr){
                    msg+=errArr[err]+"\n"
                }
                alert(msg) //에러코드에 해당하는 내용 띄우기
            }

            
        }
        ,
        create(dataSet){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.dataSet.email, this.dataSet.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.addUserData(dataSet)
                })
                .catch((error) => {
                    const errorCode = error.code;

                    //console.log(errorCode)

                    if(error.code=="auth/email-already-in-use") {
                        this.error = "이미 가입된 계정입니다."
                        alert(this.error)
                    }

                    if(error.code=="auth/invalid-email") {
                        this.error = "이메일 형식이 맞는지 확인해주세요."
                        alert(this.error)
                    }

                })
            
            
        },

        async addUserData(dataSet){
            
            var db = this.$store.state.db
            await setDoc(doc(db, "userData", dataSet.email.toString()),{
                name: dataSet.name,
                email: dataSet.email,
                phoneNumber: dataSet.phoneNumber,
                isPanel: false,
                birth: dataSet.birth,
                uploadIndex: [],
                identity: '할인 대상이 아닙니다.',
                identity_request: false,
                identity_responded: false,
                funnel : dataSet.funnel,
                funnel_detail : dataSet.funnel_detail,
                respondArray: [],
                clientGrade: 0,
                point_total : 0,
                point_current: 0,
                marketingSMS: false,
                marketingEmail: false
                
                
                
            })
            //console.log("됐다")
            this.$router.push('/registerdone')
        },

        
    },
    

}
</script>

<style>
</style>
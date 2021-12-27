<template>
<div id="Register">

  <form class="form-center">
        <p class="register-title"><span id="green">서베이지</span> 회원가입</p>
          <li>
              <ul class="cols">
                  <li class="col1">이메일 주소*</li>
                  <li class="col2"><input type="email" id="email" v-model="dataSet.email" required></li>

              </ul>
          </li>

          <li>
              <ul class="cols">
                  <li class="col1">비밀번호*</li>
                  <li class="col2"><input type="password" id="password" v-model="dataSet.password" required></li>
                  <div class="password-notice">* 8자리 이상의 비밀번호를 설정해주세요.</div>
                  
              </ul>
          </li>

          <li>
              <ul class="cols">
                  <li class="col1">비밀번호 확인*</li>
                  <li class="col2"><input type="password" id="passwordcheck" v-model="dataSet.passCheck" required></li>
              </ul>
          </li>

          <li>
              <ul class="cols">
                  <li class="col1">이름*</li>
                  <li class="col2"><input type="text" id="name" v-model="dataSet.name" required placeholder="꼭 실명을 작성해주세요."></li>
              </ul>
          </li>

          <li>
              <ul class="cols">
                  <li class="col1">휴대폰 번호*</li>
                  <li class="col2"><input type="tel" id="tel" v-model="dataSet.phoneNumber" required placeholder="- 없이 입력해주세요."></li>
              </ul>
          </li>
          <li>
              <ul class="cols">
                  <li class="col1">생년월일*</li>
                  <li class="col2"><input type="tel" id="birth" v-model="dataSet.birth" required placeholder="ex. 20220101"></li>
                 
              </ul>
          </li>

          <li>
              <ul class="cols">
                  <li class="col1">유입경로*</li>
                  <li class="col2">
                    <div class="radio-container">
                        <div class="radio-column">
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="everytime" v-model="dataSet.funnel" value="everytime" >
                                <label class="radio-text">에브리타임</label> 
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="kakaotalk" v-model="dataSet.funnel" value="kakaotalk">
                                <label>카카오톡 단톡방</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="search" v-model="dataSet.funnel" value="search">
                                <label>인터넷 검색(구글 / 네이버 / 기타)</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="etc" v-model="dataSet.funnel" value="instagram">
                                <label>기타 </label>
                            </div>
                        </div>
                        <div class="radio-column">
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="blog" v-model="dataSet.funnel" value="blog">
                                <label>네이버 블로그</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="instagram" v-model="dataSet.funnel" value="instagram">
                                <label>인스타그램</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="radio" name="from" id="facebook" v-model="dataSet.funnel" value="instagram">
                                <label>페이스북</label>
                            </div>
                            
                        </div> 
                      </div>
                    <!-- 약관부분 다시 -->
                      <div class="radio-column">
                            <div class="all"><input type="checkbox">전체 동의하기</div>
                        </div>                     
                  </li>
              </ul>
          </li>
          

     </form>
     <br>
     <!-- <button @click="addUserData(this.dataSet); create();"> 가입하기 </button> -->
     <button class="register-btn" @click="validateRegister(this.dataSet);"> 회원가입하기 </button>
     
</div>
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
              birth:null
                 
            },

            validReg : false,
            
        }
    }
    ,
    mounted() {
    window.scrollTo(0,0)
  },
    methods:{
        
        
        validateRegister(dataSet){
            var errCode = [];
            
            // 입력하지 않은 항목이 있는지 체크
            for (var key in dataSet) {
                if (key == null) {
                    errCode.push(1)
                }
            }
            if (dataSet.password !== dataSet.passCheck){
                errCode.push(2)
            }
            if ((dataSet.password).length < 8) {
                errCode.push(3)
            }
            //휴대폰번호 숫자만있는지 확인 (#Todo)
            if((dataSet.phoneNumber).length!=11 || isNaN(dataSet.phoneNumber)==true || (dataSet.phoneNumber).includes('.')==true){
                errCode.push(4)
               
            }
            
            if((dataSet.birth).length<8){
                errCode.push(5)
            }
            
            if (errCode.length == 0 ){
                this.validReg = true
                this.create()
                this.addUserData(dataSet)
                this.$router.push('/registerdone')
                
            } else {
                console.log(errCode)
                console.log(dataSet)
                var registerErrorMessage =[
                "",
                "입력하지 않은 항목이 있습니다.",
                "비밀번호 확인란을 올바르게 입력하세요.",
                "비밀번호는 8자 이상이여야 합니다.",
                "휴대폰 번호를 올바르게 입력하세요.",
                "생년월일을 올바르게 입력하세요."
                

                ]
                
                
                var errArr =[]
               
                for(var i=0; i<errCode.length; i++){
                    errArr.push(registerErrorMessage[errCode[i]])
                    
                }
                console.log(errArr)
                var msg = ''
                for(var err in errArr){
                    msg+=errArr[err]+"\n"
                }
                alert(msg) //에러코드에 해당하는 내용 띄우기
            }

            
        }
        ,
        create(){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.dataSet.email, this.dataSet.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                })
            
            
        },

        async addUserData(dataSet){
            
            var db = this.$store.state.db
            await setDoc(doc(db, "userData", dataSet.email),{
                name: dataSet.name,
                email: dataSet.email,
                phoneNumber: dataSet.phoneNumber,
                isPanel: false,
                // birth: dataSet.birth,
                uploadIndex: [],
                identity: 'default',
                funnel : dataSet.funnel,
                respondArray: [],
                
                
            })
            this.$router.push('/')
        },

        
    },
    

}
</script>

<style>
#Register {
    height: 1200px;
    font-family: 'Noto Sans KR', sans-serif;
    display: block;
    text-align: center;
}
.register-title {
    margin-top: 70px;
    margin-bottom: 50px;
    font-size: 2rem;
    text-align: left;
    margin-left: 40px;
    
}
.register-title #green{
    color: #0AAB00;
}
.form-center{
    display: inline-block;
    
    
}
li {
    list-style-type: none;
}

.cols li.col1 {
    width: 95px;
    text-align: left;
    margin-bottom: 10px;
    font-size: 15px;
}

.cols li.col2 {
    width: 520px;
    font-size: 8px;
}
.cols li.col2 input {
  width: 580px;
  height: 30px;
  padding: 3px;
  margin-bottom: 15px;
  border: 1px solid #848484;
  border-radius: 4px;
  opacity: 1;
  color: #848484;
  font: normal normal 300 17px/20px Noto Sans KR;
  font-size: 0.8rem;
  padding-left: 15px;
}
.password-notice {
    font-size: 5px;
    color: grey;
    text-align: left;
    margin-bottom: 10px;
}
.cols li.col2 input.radio {
    width: 15px;
    margin: 0 20px 0 5px;
}
.radio-container {
    display: flex;
    
    width: 500px;
    
    font-size: 13px;
}
.radio-column {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-right: 20px;
}
.radio-option {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
}
.register-btn {
  padding: 5px 30px;
  margin: 20px;
  color:#0CAE02;
  background-color: #fff;
  border: 1.5px solid #0CAE02;
  border-radius: 30px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
}
.register-btn:hover{
    color: white;
    background-color:#0CAE02;
}
</style>
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Service from '../views/Service/Service.vue'
import ServiceInputForm from '../views/Service/ServiceInputForm.vue'
import ServicePay from '../views/Service/ServicePay.vue'
import ServiceIdentity from '../views/Service/ServiceIdentity.vue'
import ServicePayDone from '../views/Service/ServicePayDone.vue'
import SurveyList from '../views/SurveyList.vue'
import SurveyTemplate from '../views/SurveyTemplate.vue'
import KnowHow from '../views/KnowHow.vue'
import Story from '../views/Story.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login/Login.vue'
import Find from '../views/Login/Find.vue'
import Register from '../views/Login/Register.vue'
import RegisterDone from '../views/Login/RegisterDone.vue'
import MyPage from '../views/MyPage/MyPage.vue'
import SurveyResponse from '../views/SurveyResponse.vue'
import MyInfo from '../components/MyPage/MyInfo.vue'
import DashBoard from '../components/MyPage/DashBoard.vue'
import CouponPoint from '../components/MyPage/CouponPoint.vue'
import Payment from '../components/MyPage/Payment.vue'
import ListDetail from '../components/List/ListDetail.vue'
import RespondService from '../components/Contact/RespondService.vue'
import Template from '../components/Contact/Template.vue'
import MemberInfo from '../components/Contact/MemberInfo.vue'
import PaymentInfo from '../components/Contact/Payment.vue'
import FinalModal from '../components/Contact/ContactFinalModal.vue'
import AdminMain from '../views/Admin/AdminMain.vue'
import CouponAdmin from '../views/Admin/CouponAdmin.vue'
import Withdraw from '../views/MyPage/Withdraw.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/service',
    name: 'Service',
    component: Service
  },
  {
    path: '/serviceinputform',
    name: 'ServiceInputForm',
    component: ServiceInputForm
  },
  {
    path: '/servicepay',
    name: 'ServicePay',
    component: ServicePay
  },
  {
    path: '/serviceidentity',
    name: 'ServiceIdentity',
    component: ServiceIdentity
  },
  {
    path: '/servicepaydone',
    name: 'ServicePayDone',
    component: ServicePayDone
  },
  {
    path: '/surveylist',
    name: 'SurveyList',
    component: SurveyList
  },
  {
    path: '/surveylist/:id',
    component: ListDetail
  },
  {
    path: '/surveytemplate',
    name: 'SurveyTemplate',
    component: SurveyTemplate
  },
  {
    path: '/knowhow',
    name: 'KnowHow',
    component: KnowHow
  },   
  {
    path: '/story',
    name: 'Story',
    component: Story
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    children: [
      { path: "respondService", component: RespondService },
      { path: "template", component: Template },
      { path: "memberInfo", component: MemberInfo },
      { path: "payment", component: PaymentInfo },
      { path: "finalmodal", component: FinalModal }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path : '/find-pw',
    name : 'Find',
    component : Find
  },
  
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/registerdone',
    name: 'RegisterDone',
    component: RegisterDone
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
    children: [
      { path: "payment", component: Payment },
      { path: "myinfo", component: MyInfo },
      { path: "dashboard", component: DashBoard },
      { path: "couponpoint", component: CouponPoint }
    ]
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: Withdraw
  },
  {
    path: '/response',
    name: 'SurveyResponse',
    component: SurveyResponse
  },
  {
    path: '/adminmain',
    name: 'AdminMain',
    component: AdminMain
  },
  {
    path: '/couponadmin',
    name: 'CouponAdmin',
    component: CouponAdmin
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  
})


export default router

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0a314a"],{"013f":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{staticClass:"flex flex-center"},[r("div",{staticClass:"q-pa-md",staticStyle:{"max-width":"600px"}},[r("login")],1)])},s=[],n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._v("\n  Login to our magic service!\n  "),r("q-input",{attrs:{label:"Username"},model:{value:e.$user.name,callback:function(t){e.$set(e.$user,"name",t)},expression:"$user.name"}}),r("q-input",{attrs:{label:"Password"},model:{value:e.secret,callback:function(t){e.secret=t},expression:"secret"}}),r("q-input",{attrs:{label:"Organization",placeholder:"HospitalRun"},model:{value:e.$user.organization,callback:function(t){e.$set(e.$user,"organization",t)},expression:"$user.organization"}}),r("q-btn",{directives:[{name:"go-back",rawName:"v-go-back",value:"/",expression:" '/' "}],attrs:{label:"Go Back"}}),r("q-btn",{attrs:{label:"Login"},on:{click:e.submitLogin}}),r("q-dialog",{attrs:{persistent:""},model:{value:e.hasError,callback:function(t){e.hasError=t},expression:"hasError"}},[r("q-card",[r("q-card-section",{staticClass:"row items-center"},[r("q-avatar",{attrs:{icon:"error_outline",color:"primary","text-color":"white"}}),r("span",{staticClass:"q-ml-sm"},[e._v(e._s(e.errMsg))])],1),r("q-card-actions",{attrs:{align:"right"}},[r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"}}),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Register",color:"primary",to:"register"}})],1)],1)],1)],1)},i=[],o=r("967e"),c=r.n(o),l=(r("7f7f"),r("96cf"),r("fa84")),u=r.n(l),p={data:function(){return{secret:"",hasError:!1,errMsg:""}},methods:{submitLogin:function(){var e=u()(c.a.mark(function e(t){return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$user.loginWithSecret(this.secret);case 3:this.secret="",this.$router.push("profile"),e.next=12;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0.name),this.hasError=!0,"NotRegistered"===e.t0.name&&(this.errMsg="User is not registered at this Organization Location");case 12:case"end":return e.stop()}},e,this,[[0,7]])}));function t(t){return e.apply(this,arguments)}return t}()}},m=p,g=r("2877"),h=Object(g["a"])(m,n,i,!1,null,null,null),d=h.exports,f={name:"LoginPage",components:{Login:d}},b=f,v=Object(g["a"])(b,a,s,!1,null,null,null);t["default"]=v.exports}}]);
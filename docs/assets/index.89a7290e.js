import{d as f,r as c,c as l,a as e,z as d,B as n,C as g,b as B,D as _,A as u,E as r,e as p,F as C,G as y,p as w,f as x,y as b}from"./index.4e3e358b.js";const t=s=>(w("data-v-2cba3e49"),s=s(),x(),s),k={class:"load"},V={class:"inner"},F={class:"center"},I={class:"head"},S={class:"inp"},z=t(()=>e("i",{class:"iconfont icon-arrow-right"},null,-1)),A=[z],E={class:"action"},N=t(()=>e("i",{class:"iconfont icon-zhongqi"},null,-1)),D=t(()=>e("div",null,"\u91CD\u65B0\u542F\u52A8",-1)),T=[N,D],U=f({__name:"index",setup(s){c(!1);const o=c("");function v(){o.value==="123456"?(_({type:"loading",message:"\u6B63\u5728\u767B\u9646"}),setTimeout(()=>{u.router.push("/home")},2e3)):_({message:"\u5BC6\u7801\u9519\u8BEF"})}return($,a)=>{const m=r("van-image"),h=r("van-field");return p(),l("div",k,[e("div",{class:"load-finish",style:B({"background-image":`url(${n(y)().bgUrl})`})},[e("div",V,[e("div",F,[e("div",I,[d(m,{height:"100%",width:"100%",src:n(C)},null,8,["src"])]),e("div",S,[d(h,{placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",type:"password",class:"password",modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=i=>o.value=i)},null,8,["modelValue"]),o.value?(p(),l("div",{key:0,class:"login",onClick:v},A)):g("",!0)])]),e("div",E,[e("div",{class:"item",onClick:a[1]||(a[1]=i=>n(u).router.replace("/"))},T)])])],4)])}}});const G=b(U,[["__scopeId","data-v-2cba3e49"]]);export{G as default};

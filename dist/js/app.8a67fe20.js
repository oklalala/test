(function(e){function t(t){for(var s,r,i=t[0],l=t[1],c=t[2],m=0,p=[];m<i.length;m++)r=i[m],a[r]&&p.push(a[r][0]),a[r]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(s=!1)}s&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var s={},a={app:0},o=[];function r(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=s,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("64a9"),a=n.n(s);a.a},"18ac":function(e,t,n){},"1ca9":function(e,t,n){},"4e93":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("0fb7"),n("450d");var s=n("f529"),a=n.n(s),o=(n("a7cc"),n("df33")),r=n.n(o),i=(n("560b"),n("dcdc")),l=n.n(i),c=(n("5466"),n("ecdf")),u=n.n(c),m=(n("38a0"),n("ad41")),p=n.n(m),d=(n("10cb"),n("f3ad")),f=n.n(d),h=(n("6611"),n("e772")),v=n.n(h),b=(n("1f1a"),n("4e4b")),y=n.n(b),_=(n("eca7"),n("3787")),g=n.n(_),w=(n("425f"),n("4105")),U=n.n(w),k=(n("1951"),n("eedf")),C=n.n(k),I=(n("8bd8"),n("4cb2")),P=n.n(I),$=(n("4ca3"),n("443e")),L=n.n($),x=(n("f4f9"),n("c2cc")),j=n.n(x),S=(n("7a0f"),n("0f6c")),E=n.n(S),O=(n("cadf"),n("551c"),n("097d"),n("2b0e")),R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("navbar"),n("router-view")],1)},N=[],M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"layout-navbar"},[n("h1",{staticClass:"layout-navbar-title"},[e._v("大地監控")]),e.isLogined?n("ul",{staticClass:"layout-navbar-menu"},[n("div",{staticClass:"layout-navbar-menu-forUser"},[n("li",[n("a",{attrs:{href:"#"},on:{click:function(t){e.toPath("UserInfo")}}},[e._v("帳號資料")])]),n("li",[n("a",{attrs:{href:"#"},on:{click:function(t){e.toPath("ProjectList")}}},[e._v("專案列表")])])]),e.roleIs("ADMIN")?n("div",{staticClass:"layout-navbar-menu-forAdmin"},[e._m(0),n("li",[n("a",{attrs:{href:"#"},on:{click:function(t){e.toPath("UserList")}}},[e._v("帳號設定")])]),e._m(1),n("li",[n("a",{attrs:{href:"#"},on:{click:function(t){e.toPath("PermissionSetup")}}},[e._v("權限設定")])])]):e._e(),n("li",[n("a",{attrs:{href:"#"},on:{click:e.logout}},[e._v("登出")])])]):e._e()])},D=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#"}},[e._v("傾度管設定")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",[n("a",{attrs:{href:"#"}},[e._v("專案設定")])])}],A={methods:{toPath:function(e,t){this.$router.push({name:e,params:t})}}},q=A,T={methods:{roleIs:function(e){return this.$store.getters.myRole===e}}},G=T,V=n("2f62"),J={name:"Navbar",mixins:[q,G],computed:{isLogined:function(){return this.$store.getters.token}},methods:{logout:function(){this.$store.dispatch("logout"),this.toPath("Entry")}}},z=J,B=n("2877"),F=Object(B["a"])(z,M,D,!1,null,null,null);F.options.__file="Navbar.vue";var H=F.exports,K={name:"app",components:{Navbar:H}},Q=K,W=(n("034f"),Object(B["a"])(Q,R,N,!1,null,null,null));W.options.__file="App.vue";var X=W.exports,Y=(n("ac6a"),n("5df3"),n("8c4f")),Z=n("8ded"),ee=n.n(Z),te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"entry"},[n("el-form",[n("el-form-item",{attrs:{label:"帳號"}},[n("el-input",{attrs:{type:"text",name:"account",placeholder:"請輸入帳號"},model:{value:e.account,callback:function(t){e.account=t},expression:"account"}})],1),n("el-form-item",{attrs:{label:"密碼"}},[n("el-input",{attrs:{type:"password",name:"password",placeholder:"請輸入密碼"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),n("el-form-item",[n("p",{staticClass:"feedback"},[e._v("\n        "+e._s(e.feedback)+"\n      ")]),n("div",{staticClass:"button-container"},[n("el-button",{attrs:{type:"primary","native-type":"submit"},on:{click:function(t){return t.preventDefault(),e.submit(t)}}},[e._v("\n          登入\n        ")])],1)])],1)],1)},ne=[],se={name:"Entry",data:function(){return{account:null,password:null,feedback:""}},methods:{submit:function(){var e=this;if(!this.account||!this.password)return this.feedback="帳號密碼不匹配";this.$store.dispatch("login",{account:this.account,password:this.password}).then(function(){e.$router.push({name:"ProjectList"})}).catch(function(t){console.log(t.message),e.feedback="帳號密碼不匹配"})}}},ae=se,oe=Object(B["a"])(ae,te,ne,!1,null,null,null);oe.options.__file="Entry.vue";var re=oe.exports,ie=function(){var e=this,t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"user-info"},[s("h1",[t._v("帳號資料")]),s("el-form",[s("section",[s("h2",[t._v("基本資料")]),s("p",[t._v("姓名："+t._s(t.me.name))]),s("p",[t._v("角色："+t._s(t.me.roleName))]),t.me.company?s("p",[t._v("公司："+t._s(t.me.company.name))]):t._e(),t.me.soItem?s("p",[t._v("傾度管 編號："+t._s(t.me.soItem.number))]):t._e()]),s("section",[s("h2",[t._v("聯絡方式")]),s("el-form-item",{attrs:{label:"電話"}},[s("el-input",{attrs:{value:t.me.phone,placeholder:"請輸入電話"},on:{change:function(t){return e.updateMe({phone:t})}}})],1),s("el-form-item",{attrs:{label:"email"}},[s("el-input",{attrs:{value:t.me.email,placeholder:"請輸入 email"},on:{change:function(t){return e.updateMe({email:t})}}})],1)],1),s("section",[s("h2",[t._v("密碼設定")]),s("el-form-item",{attrs:{label:"密碼"}},[s("el-input",{attrs:{value:t.me.password,placeholder:"請輸入密碼"},on:{change:function(t){return e.updateMe({password:t})}}})],1)],1),s("section",[s("h2",[t._v("參與專案")]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.me.projects}},[s("el-table-column",{attrs:{prop:"id",label:"案號",width:"180"}}),s("el-table-column",{attrs:{prop:"name",label:"名稱"}})],1)],1),s("div",{staticClass:"button-container"},[s("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("\n        確認\n      ")])],1)])],1)},le=[],ce={name:"UserInfo",mixins:[q],data:function(){return{}},computed:{me:function(){return this.$store.getters.me}},methods:{updateMe:function(e){this.$store.commit("updateMe",e)},submit:function(){var e=this;this.$store.dispatch("updateMe").then(function(){e.$message({message:"資料更新成功",type:"success"}),e.toPath("ProjectList")}).catch(function(t){e.$message.error("資料更新失敗")})}}},ue=ce,me=Object(B["a"])(ue,ie,le,!1,null,null,null);me.options.__file="UserInfo.vue";var pe=me.exports,de=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"projectList"},[n("el-table",{staticClass:"projectList-table",attrs:{data:e.projectList}},[n("el-table-column",{attrs:{prop:"id",label:"案號",width:"180"}}),n("el-table-column",{attrs:{prop:"name",label:"名稱"}})],1)],1)},fe=[],he={name:"ProjectList",data:function(){return{}},computed:{projectList:function(){return[]}}},ve=he,be=(n("e0fa"),Object(B["a"])(ve,de,fe,!1,null,null,null));be.options.__file="ProjectList.vue";var ye=be.exports,_e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"userList"},[n("h1",[e._v("帳號列表")]),n("div",{staticClass:"operationGroup"},[n("div",{staticClass:"operationGroup-left"},[n("el-button",{attrs:{type:"primary"},on:{click:e.deleteUsers}},[e._v("刪除")])],1),n("div",{staticClass:"operationGroup-right"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.toPath("CreateUser")}}},[n("i",{staticClass:"el-icon-plus"})])],1)]),n("el-table",{staticClass:"userList-table",attrs:{data:e.userList},on:{"selection-change":e.updateDeleteList}},[n("el-table-column",{attrs:{type:"selection",width:"180"}}),n("el-table-column",{attrs:{prop:"id",label:"編號",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticClass:"clickable",on:{click:function(n){e.toPath("EditUser",{userId:t.row.id})}}},[e._v("\n          "+e._s(t.row.id)+"\n        ")])]}}])}),n("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),n("el-table-column",{attrs:{prop:"company.name",label:"公司",width:"180"}}),n("el-table-column",{attrs:{prop:"roleName",label:"角色"}})],1)],1)},ge=[],we={name:"UserList",mixins:[q],data:function(){return{deleteList:[]}},computed:{userList:function(){return this.$store.getters.users}},methods:{deleteUsers:function(){0!==this.deleteList.length&&this.$store.dispatch("deleteUsers",this.deleteList)},updateDeleteList:function(e){this.deleteList=e.map(function(e){return e.id})}}},Ue=we,ke=Object(B["a"])(Ue,_e,ge,!1,null,null,null);ke.options.__file="UserList.vue";var Ce=ke.exports,Ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"createUser"},[n("h1",[e._v("帳號設定")]),n("h2",[e._v("基本資料")]),n("el-form",{attrs:{"label-position":"top","label-width":"80px",model:e.newUser}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"姓名"}},[n("el-input",{model:{value:e.newUser.name,callback:function(t){e.$set(e.newUser,"name",t)},expression:"newUser.name"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"角色"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇"},model:{value:e.newUser.roleName,callback:function(t){e.$set(e.newUser,"roleName",t)},expression:"newUser.roleName"}},e._l(e.roles,function(e){return n("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})}))],1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",[n("el-form-item",{attrs:{label:"帳號"}},[n("el-input",{model:{value:e.newUser.account,callback:function(t){e.$set(e.newUser,"account",t)},expression:"newUser.account"}})],1)],1)],1),n("el-form-item",{attrs:{label:"公司名稱"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:22}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇"},model:{value:e.newUser.companyId,callback:function(t){e.$set(e.newUser,"companyId",t)},expression:"newUser.companyId"}},e._l(e.companies,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),n("el-col",{attrs:{span:2}},[n("el-button",{staticStyle:{width:"100%"},on:{click:function(t){e.toPath("CompanyList")}}},[e._v("\n            維護\n          ")])],1)],1)],1),n("el-form-item",{attrs:{label:"傾度管"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇"},model:{value:e.newUser.soId,callback:function(t){e.$set(e.newUser,"soId",t)},expression:"newUser.soId"}},e._l(e.soItems,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),n("el-form-item",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-button",{staticStyle:{width:"100%"},on:{click:e.submit}},[e._v("\n            確定送出\n          ")])],1),n("el-col",{attrs:{span:12}},[n("el-button",{staticStyle:{width:"100%"},on:{click:e.cancel}},[e._v("\n            取消\n          ")])],1)],1)],1)],1)],1)},Pe=[],$e={name:"CreateUser",mixins:[q],data:function(){return{newUser:{name:"",roleName:null,companyId:null,soId:"",account:""}}},computed:{userList:function(){return this.$store.getters.users},roles:function(){return this.$store.getters.roles},companies:function(){return this.$store.getters.companies},soItems:function(){return this.$store.getters.soItems}},methods:{deleteUsers:function(){0!==this.deleteList.length&&this.$store.dispatch("deleteUsers",this.deleteList)},updateDeleteList:function(e){this.deleteList=e.map(function(e){return e.id})},reset:function(){this.newUser={name:"",roleName:null,companyId:null,soId:"",account:""}},cancel:function(){this.reset(),this.toPath("UserList")},submit:function(){var e=this;this.$store.dispatch("createUser",this.newUser).then(function(){e.reset(),e.toPath("UserList")})}}},Le=$e,xe=Object(B["a"])(Le,Ie,Pe,!1,null,null,null);xe.options.__file="CreateUser.vue";var je=xe.exports,Se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"createUser"},[n("h1",[e._v("帳號設定")]),n("h2",[e._v("基本資料")]),n("el-form",{attrs:{"label-position":"top","label-width":"80px",model:e.newUser}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"姓名"}},[n("el-input",{model:{value:e.newUser.name,callback:function(t){e.$set(e.newUser,"name",t)},expression:"newUser.name"}})],1)],1),n("el-col",{attrs:{span:12}},[n("el-form-item",{attrs:{label:"角色"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇"},model:{value:e.newUser.roleName,callback:function(t){e.$set(e.newUser,"roleName",t)},expression:"newUser.roleName"}},e._l(e.roles,function(e){return n("el-option",{key:e.name,attrs:{label:e.name,value:e.name}})}))],1)],1)],1),n("el-row",{attrs:{gutter:20}},[n("el-col",[n("el-form-item",{attrs:{label:"帳號"}},[n("el-input",{model:{value:e.newUser.account,callback:function(t){e.$set(e.newUser,"account",t)},expression:"newUser.account"}})],1)],1)],1),n("el-form-item",{attrs:{label:"公司名稱"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:22}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇"},model:{value:e.newUser.companyId,callback:function(t){e.$set(e.newUser,"companyId",t)},expression:"newUser.companyId"}},e._l(e.companies,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),n("el-col",{attrs:{span:2}},[n("el-button",{staticStyle:{width:"100%"},on:{click:function(t){e.toPath("CompanyList")}}},[e._v("\n            維護\n          ")])],1)],1)],1),n("el-form-item",{attrs:{label:"傾度管"}},[n("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"請選擇"},model:{value:e.newUser.soId,callback:function(t){e.$set(e.newUser,"soId",t)},expression:"newUser.soId"}},e._l(e.soItems,function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),n("el-form-item",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:12}},[n("el-button",{staticStyle:{width:"100%"},on:{click:e.edit}},[e._v("\n            確定送出\n          ")])],1),n("el-col",{attrs:{span:12}},[n("el-button",{staticStyle:{width:"100%"},on:{click:e.cancel}},[e._v("\n            取消\n          ")])],1)],1)],1)],1)],1)},Ee=[],Oe=(n("7f7f"),{name:"EditUser",mixins:[q],created:function(){this.$route.params.userId&&this.loadUser(this.$route.params.userId)},data:function(){return{newUser:{name:"",roleName:null,companyId:null,soId:"",account:""}}},computed:{userList:function(){return this.$store.getters.users},roles:function(){return this.$store.getters.roles},companies:function(){return this.$store.getters.companies},soItems:function(){return this.$store.getters.soItems}},methods:{deleteUsers:function(){0!==this.deleteList.length&&this.$store.dispatch("deleteUsers",this.deleteList)},updateDeleteList:function(e){this.deleteList=e.map(function(e){return e.id})},loadUser:function(e){var t=this;this.$store.dispatch("getUser",e).then(function(e){var n=e.data.data;t.newUser={name:n.name,roleName:n.roleName,companyId:n.company.id,account:n.account,soId:""}})},reset:function(){this.newUser={name:"",roleName:"",companyId:"",soId:"",account:""}},cancel:function(){this.reset(),this.toPath("UserList")},edit:function(){var e=this;this.$store.dispatch("updateUser",{userId:this.$route.params.userId,payload:this.newUser}).then(function(){e.reset(),e.toPath("UserList")})}}}),Re=Oe,Ne=Object(B["a"])(Re,Se,Ee,!1,null,null,null);Ne.options.__file="EditUser.vue";var Me=Ne.exports,De=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"companyList"},[n("div",{staticClass:"operationGroup"},[n("div",{staticClass:"operationGroup-left"},[n("el-button",{attrs:{type:"primary"},on:{click:e.openCompanyDialog}},[e._v("新增")])],1),n("div",{staticClass:"operationGroup-right"},[e.hasDeleteItems?n("el-button",{attrs:{type:"primary"},on:{click:e.deleteCompany}},[e._v("\n        刪除\n      ")]):e._e()],1)]),n("el-table",{staticClass:"companyList-table",attrs:{data:e.companyList},on:{"selection-change":e.updateDeleteList}},[n("el-table-column",{attrs:{type:"selection",width:"180"}}),n("el-table-column",{attrs:{prop:"id",label:"編號",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticClass:"clickable",on:{click:function(n){e.readAndOpenCompanyDialog(t.row.name)}}},[e._v("\n          "+e._s(t.row.id)+"\n        ")])]}}])}),n("el-table-column",{attrs:{prop:"name",label:"公司名稱"}})],1),n("div",{staticClass:"button-container"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.toPath("CreateUser")}}},[e._v("\n      離開\n    ")])],1),n("el-dialog",{attrs:{title:"新增公司",visible:e.createCompanyDialogVisible},on:{"update:visible":function(t){e.createCompanyDialogVisible=t}}},[n("el-input",{attrs:{placeholder:"請輸入公司名稱"},model:{value:e.newCompanyName,callback:function(t){e.newCompanyName=t},expression:"newCompanyName"}}),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:e.createCompany}},[e._v("\n        確認\n      ")])],1)],1)],1)},Ae=[],qe={name:"CompanyList",mixins:[q],data:function(){return{createCompanyDialogVisible:!1,deleteList:[],newCompanyName:null}},computed:{hasDeleteItems:function(){return this.deleteList.length>0},companyList:function(){return this.$store.getters.companies}},methods:{openCompanyDialog:function(){this.newCompanyName="",this.createCompanyDialogVisible=!0},readAndOpenCompanyDialog:function(e){this.newCompanyName=e,this.createCompanyDialogVisible=!0},createCompany:function(){this.$store.dispatch("createCompany",{name:this.newCompanyName}),this.createCompanyDialogVisible=!1},deleteCompany:function(){0!==this.deleteList.length&&this.$store.dispatch("deleteCompanies",this.deleteList)},updateDeleteList:function(e){this.deleteList=e.map(function(e){return e.id})}}},Te=qe,Ge=(n("ef53"),Object(B["a"])(Te,De,Ae,!1,null,null,null));Ge.options.__file="CompanyList.vue";var Ve=Ge.exports,Je=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"permission-setup"},[n("el-table",{attrs:{data:e.rolePermissions}},[n("el-table-column",{attrs:{prop:"role",label:"角色",width:"180"}}),n("el-table-column",{attrs:{prop:"permissions",label:"權限"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.permissions,function(s,a){return e.permissions?n("div",{key:a},[n("el-checkbox",{attrs:{value:s.value},on:{change:function(n){e.updateRolePermissions(s.value,t.row.role,a)}}},[e._v("\n            "+e._s(e.permissions[s.name])+"\n          ")])],1):e._e()})}}])})],1),n("div",{staticClass:"button-container"},[n("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("\n      確認送出\n    ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.toPath("ProjectList")}}},[e._v("\n      取消修改\n    ")])],1)],1)},ze=[],Be={name:"PermissionSetup",mixins:[q],data:function(){return{}},computed:{permissions:function(){return this.$store.getters.permissions},rolePermissions:function(){return this.$store.getters.rolePermissions}},methods:{updateRolePermissions:function(e,t,n){e=!e,this.$store.commit("updateRolePermissions",{role:t,permissionIndex:n,value:e})},submit:function(){var e=this;this.$store.dispatch("updateRolePermissions").then(function(){e.$message({message:"權限設定成功",type:"success"}),e.toPath("ProjectList")}).catch(function(t){e.$message.error("權限設定失敗")})}}},Fe=Be,He=(n("641f"),Object(B["a"])(Fe,Je,ze,!1,null,null,null));He.options.__file="PermissionSetup.vue";var Ke=He.exports,Qe=(n("f751"),n("bc3a")),We=n.n(Qe),Xe=function(e,t,n,s){var a={Accept:"application/json"};n&&(a["x-access-token"]=Ye.getters.token);var o={baseURL:"http://ec2-52-193-188-226.ap-northeast-1.compute.amazonaws.com:3333/v1",headers:a};return We.a.create(o)[e](t,s)};O["default"].use(V["a"]);var Ye=new V["a"].Store({state:{myId:"",token:"",myRole:"",me:{},users:[],permissions:{},roles:[],rolePermissions:[],companies:[],soItems:[]},mutations:{setToken:function(e,t){e.token=t},setMyId:function(e,t){e.myId=t},setMyRole:function(e,t){e.myRole=t},setMe:function(e,t){e.me=t},updateMe:function(e,t){e.me=Object.assign(e.me,t)},setUsers:function(e,t){e.users=t},setPermissions:function(e,t){e.permissions=t},setRoles:function(e,t){e.roles=t},setRolePermissions:function(e,t){e.rolePermissions=t},updateRolePermissions:function(e,t){var n=t.value,s=t.role,a=t.permissionIndex;e.rolePermissions=e.rolePermissions.map(function(e){return e.role===s&&(e.permissions[a].value=n),e})},setCompanies:function(e,t){e.companies=t},setSOItems:function(e,t){e.soItems=t}},getters:{token:function(e){return e.token},myId:function(e){return e.myId},myRole:function(e){return e.myRole},me:function(e){return e.me},users:function(e){return e.users},permissions:function(e){return e.permissions},roles:function(e){return e.roles},rolePermissions:function(e){return e.rolePermissions},companies:function(e){return e.companies},soItems:function(e){return e.soItems}},actions:{login:function(e,t){var n=e.commit;return Xe("post","/login",!1,t).then(function(e){n("setToken",e.data.token),n("setMyId",e.data.userId),n("setMyRole",e.data.role),ee.a.set("ground_monitor_token",{token:e.data.token,myId:e.data.userId,myRole:e.data.role})})},logout:function(e){var t=e.commit;t("setToken",""),ee.a.remove("ground_monitor_token")},getMe:function(e){var t=e.getters,n=e.commit;return Xe("get","/user/".concat(t.myId),!0).then(function(e){n("setMe",e.data.data)})},updateMe:function(e){var t=e.state;e.getters;return Xe("put","/user/self",!0,t.me)},getUser:function(e,t){return Xe("get","/user/".concat(t),!0)},updateUser:function(e,t){var n=t.userId,s=t.payload;return Xe("put","/user/".concat(n),!0,s)},getUsers:function(e){var t=e.commit;return Xe("get","/users",!0).then(function(e){t("setUsers",e.data.data)})},deleteUsers:function(e,t){var n=e.dispatch,s=t.join(",");return Xe("delete","/users/".concat(s),!0).then(function(){n("getUsers")})},createUser:function(e,t){return Xe("post","/user",!0,t)},getRoles:function(e){var t=e.commit;return Xe("get","/roles",!0).then(function(e){t("setRoles",e.data.data)})},getPermissions:function(e){var t=e.commit;return Xe("get","/permissions",!0).then(function(e){t("setPermissions",e.data.data)})},getRolePermissions:function(e){var t=e.commit;return Xe("get","/role/permissions",!0).then(function(e){t("setRolePermissions",e.data.data)})},updateRolePermissions:function(e){var t=e.state;return Xe("put","/role/permissions",!0,t.rolePermissions)},getCompanies:function(e){var t=e.commit;return Xe("get","/companies",!0).then(function(e){t("setCompanies",e.data.data)})},createCompany:function(e,t){var n=e.dispatch;return Xe("post","/company",!0,t).then(function(){n("getCompanies")})},deleteCompanies:function(e,t){var n=e.dispatch,s=t.join(",");return Xe("delete","/companies/".concat(s),!0).then(function(){n("getCompanies")})},getSOItems:function(e){var t=e.commit;return Xe("get","/so-items",!0).then(function(e){t("setSOItems",e.data.data)})}}});O["default"].use(Y["a"]);var Ze=new Y["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Entry",component:re},{path:"/user-info",name:"UserInfo",component:pe,meta:{requireAuth:!0},beforeEnter:function(e,t,n){Ye.dispatch("getMe").then(function(){n()})}},{path:"/project-list",name:"ProjectList",component:ye,meta:{requireAuth:!0}},{path:"/company-list",name:"CompanyList",component:Ve,meta:{requireAuth:!0},beforeEnter:function(e,t,n){Ye.dispatch("getCompanies").then(function(){n()})}},{path:"/user-list",name:"UserList",component:Ce,meta:{requireAuth:!0},beforeEnter:function(e,t,n){Ye.dispatch("getUsers").then(function(){n()})}},{path:"/create-user",name:"CreateUser",component:je,meta:{requireAuth:!0},beforeEnter:function(e,t,n){Promise.all([Ye.dispatch("getRoles"),Ye.dispatch("getCompanies"),Ye.dispatch("getSOItems")]).then(function(){n()})}},{path:"/edit-user/:userId",name:"EditUser",component:Me,meta:{requireAuth:!0},beforeEnter:function(e,t,n){Promise.all([Ye.dispatch("getRoles"),Ye.dispatch("getCompanies"),Ye.dispatch("getSOItems")]).then(function(){n()})}},{path:"/permisson-setup",name:"PermissionSetup",component:Ke,meta:{requireAuth:!0},beforeEnter:function(e,t,n){Promise.all([Ye.dispatch("getPermissions"),Ye.dispatch("getRolePermissions")]).then(function(){n()})}}]});Ze.beforeEach(function(e,t,n){if(e.meta.requireAuth||n(),Ye.getters.token)n();else if(ee.a.get("ground_monitor_token")){var s=ee.a.get("ground_monitor_token");Ye.commit("setToken",s.token),Ye.commit("setMyId",s.myId),Ye.commit("setMyRole",s.myRole),n()}else n({name:"Entry"})});var et=Ze,tt=n("c87b"),nt=n.n(tt),st=n("4897"),at=n.n(st);at.a.use(nt.a),O["default"].use(C.a);n("1ca9");O["default"].use(E.a),O["default"].use(j.a),O["default"].use(L.a),O["default"].use(P.a),O["default"].use(C.a),O["default"].use(U.a),O["default"].use(g.a),O["default"].use(y.a),O["default"].use(v.a),O["default"].use(f.a),O["default"].use(p.a),O["default"].use(u.a),O["default"].use(l.a),O["default"].use(r.a),O["default"].prototype.$message=a.a,O["default"].config.productionTip=!1,new O["default"]({router:et,store:Ye,render:function(e){return e(X)}}).$mount("#app")},"641f":function(e,t,n){"use strict";var s=n("6469"),a=n.n(s);a.a},6469:function(e,t,n){},"64a9":function(e,t,n){},e0fa:function(e,t,n){"use strict";var s=n("18ac"),a=n.n(s);a.a},ef53:function(e,t,n){"use strict";var s=n("4e93"),a=n.n(s);a.a}});
//# sourceMappingURL=app.8a67fe20.js.map
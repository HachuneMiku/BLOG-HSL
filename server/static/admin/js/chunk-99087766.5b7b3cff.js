(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99087766"],{"38f7":function(t,e,i){"use strict";var a=i("f4bb"),n=i.n(a);n.a},"7f05":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"articleList"},[i("Row",{attrs:{type:"flex",justify:"center",align:"middle"}},[i("Col",{attrs:{span:"20"}},[i("Table",{attrs:{loading:t.listloading,columns:t.columns,data:t.articleData,border:""}}),i("div",{staticStyle:{"margin-top":"15px"}},[i("Page",{attrs:{current:1,total:t.total,"page-size":2,"show-total":""},on:{"on-change":t.changePage}})],1)],1)],1),i("Modal",{attrs:{width:"360"},model:{value:t.delmodel,callback:function(e){t.delmodel=e},expression:"delmodel"}},[i("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[i("Icon",{attrs:{type:"ios-information-circle"}}),i("span",[t._v("删除确认？")])],1),i("div",{staticStyle:{"text-align":"center"}},[i("p",[t._v("是否继续删除？")])]),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("Button",{attrs:{type:"error",size:"large",long:"",loading:t.modal_loading},on:{click:t.delArticle}},[t._v("\n        删除\n      ")])],1)])],1)},n=[],l=(i("96cf"),i("3b8d")),o={data:function(){var t=this;return{delmodel:!1,modal_loading:!1,total:0,listloading:!1,article:{},columns:[{title:"ID",key:"id",maxWidth:50},{title:"编辑者ID",key:"aid",maxWidth:90},{title:"编辑者",key:"editor",maxWidth:80},{title:"文章标题",key:"title",tooltip:!0},{title:"文章内容",key:"content",tooltip:!0},{title:"文章路径",key:"contenturl",tooltip:!0},{title:"文章分类ID",key:"classify",maxWidth:100},{title:"创建时间",key:"cdate",tooltip:!0,maxWidth:150},{title:"修改时间",key:"udate",tooltip:!0,maxWidth:150},{title:"操作",key:"action",width:150,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.edit(i.index)}}},"编辑"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){t.del(i.index)}}},"删除")])}}],articleData:[]}},methods:{edit:function(t){this.article=this.articleData[t],console.log(this.article)},del:function(t){this.article=this.articleData[t],this.delmodel=!0},delArticle:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(){var e,i,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.article.id,i=this,i.modal_loading=!0,console.log(e),t.next=6,this.$hslApi.post("article/curd",{type:"del",id:e});case 6:a=t.sent,i.modal_loading=!1,i.delmodel=!1,"yes"==a.data.code?this.$Message.success({content:a.data.msg,onClose:function(){i.fetch(1,2)}}):this.$Message.error({content:a.data.msg,onClose:function(){i.fetch(1,2)}});case 10:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),fetch:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(e,i){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$hslApi.post("article/list",{page:e,number:i});case 2:a=t.sent,console.log(a.data),this.total=a.data.total,this.articleData=a.data.items;case 6:case"end":return t.stop()}},t,this)}));function e(e,i){return t.apply(this,arguments)}return e}(),changePage:function(t){this.fetch(t,2)}},created:function(){this.fetch(1,2)}},r=o,s=(i("38f7"),i("2877")),c=Object(s["a"])(r,a,n,!1,null,null,null);e["default"]=c.exports},f4bb:function(t,e,i){}}]);
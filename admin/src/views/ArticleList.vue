<template>
  <div class="articleList">

    <Row type="flex" justify="center" align="middle" >
      <Col span="20">
        <Table :loading="listloading" :columns="columns" :data="articleData" border>  
        </Table>

        <div style="margin-top:15px;">
          <Page :current="1" :total="total" :page-size="2" show-total @on-change="changePage"/>
        </div>
        
      </Col>
    </Row>

    <!-- 是否删除模态框 -->
    <Modal v-model="delmodel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认？</span>
      </p>
      <div style="text-align:center">
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="delArticle">
          删除
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        delmodel: false,  // 删除模态框
        modal_loading: false,  // 删除模态框按钮


        total:0,
        listloading: false,  // 表格加载框
        // 选中的一行数据
        article:{
          
        },
        // 表格的列名
        columns: [
          {
            title: 'ID',
            key: 'id',
            maxWidth: 50,
          },
          {
            title: '编辑者ID',
            key: 'aid',
            maxWidth: 90,
          },
          {
            title: '编辑者',
            key: 'editor',
            maxWidth: 80,
          },
          {
            title: '文章标题',
            key: 'title',
            tooltip: true,
            
          },
          {
            title: '文章内容',
            key: 'content',
            tooltip: true,
            
          },
          {
            title: '文章路径',
            key: 'contenturl',
            tooltip: true,
            
          },
          {
            title: '文章分类ID',
            key: 'classify',
            maxWidth: 100,
          },
          {
            title: '创建时间',
            key: 'cdate',
            tooltip: true,
            maxWidth: 150,
          },
          {
            title: '修改时间',
            key: 'udate',
            tooltip: true,
            maxWidth: 150,
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.del(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        articleData: [
          
        ]
      }
    },
    methods:{
      // 编辑一行数据
      edit (index) {
        this.article = this.articleData[index];
        console.log(this.article);
        
      },
      // 删除一行数据
      del (index) {
        this.article = this.articleData[index];
        this.delmodel = true;
      },
      async delArticle(){
        let id = this.article.id;
        let that = this;
        that.modal_loading = true;
        console.log(id);
        let res = await this.$hslApi.post('article/curd', {
          'type': 'del',
          'id': id
        });
        that.modal_loading = false;
        that.delmodel = false;
        if(res.data.code == 'yes'){
          this.$Message.success({
            content:res.data.msg,
            onClose(){
              that.fetch(1,2);
            }
          });
        }else{
          this.$Message.error({
            content: res.data.msg,
            onClose(){
              that.fetch(1,2);
            }
          });
        }

      },


      // 获取表格数据
      async fetch(page, number){
        const res = await this.$hslApi.post('article/list', {
          'page': page,
          'number': number
        });
        console.log(res.data);
        this.total = res.data.total;
        this.articleData = res.data.items;
      }, 
      changePage(index){
        this.fetch(index,2);
      },
    },
    created(){
      this.fetch(1,2);

    }
  }
</script>
<style>
  .articleList{
    height:100%;
    position:relative;
  }
  .ivu-row-flex{
    height:100%;
  }
  
</style>

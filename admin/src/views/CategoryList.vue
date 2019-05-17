<template>
  <div class="categoryList">
    
    <Row type="flex" justify="center" align="middle" >
      <Col span="20">
        <Table :loading="listloading" :columns="columns" :data="categoryData" border>  
        </Table>

        <div style="margin-top:15px;">
          <Page :current="1" :total="total" :page-size="2" show-total @on-change="changePage"/>
        </div>
        
      </Col>
    </Row>

    <Modal v-model="editmodal" title="编辑文章分类"
      @on-ok="editok"
      @on-cancel="editcancel">
      <Input v-model="category.category" placeholder="请输入文章分类名" clearable />
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        total:0,
        listloading: false,  // 表格加载框
        editmodal: false,   // 编辑框显示与否
        category:{
          
        },

        // 表格的列名
        columns: [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '分类名称',
            key: 'category'
          },
          {
            title: '创建时间',
            key: 'cdate'
          },
          {
            title: '修改时间',
            key: 'udate'
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
        categoryData: [
         
        ]
      }
    },
    methods: {
      // 编辑一行数据
      edit (index) {
        this.category = this.categoryData[index];
        this.editmodal = true;
      },
      // 删除一行数据
      del (index) {
        console.log(this.categoryData[index]);

      },
      // 编辑模态框的确认和取消按钮
      async editok () {
        console.log(this.category);
        let that = this;
        let res = await this.$hslApi.post('articletype/curd', {
          'type': 'edit',
          'id': that.category.id,
          'category': that.category.category
        })
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
      editcancel () {
        this.$Message.info('Clicked cancel');
      },
      // 获取表格数据
      async fetch(page, number){
        const res = await this.$hslApi.post('articletype/list', {
          'page': page,
          'number': number
        });
        console.log(res.data);
        this.total = res.data.total;
        this.categoryData = res.data.items;
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
  .categoryList{
    height:100%;
    position:relative;
  }
  .ivu-row-flex{
    height:100%;
  }
  .spin-icon-load{
    animation: ani-spin 1s linear infinite;
  }
  @keyframes ani-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .text-load{
    font-size: 16px;
    margin-top: 10px;
  }
</style>

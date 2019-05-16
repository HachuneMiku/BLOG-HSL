<template>
  <div class="categoryEdit">
    <Spin fix v-if="loadShow">
      <Icon type="ios-loading" size=40 class="spin-icon-load"></Icon>
      <div class="text-load">加载中</div>
    </Spin>

    <Row type="flex" justify="center" align="middle" >
      <Col span="12">
        <Card style="width:100%">
          <p slot="title">
            <Icon type="md-list-box" size=24></Icon>
            创建分类
          </p>
          <!-- 表单部分 -->
          <Form ref="formCategory" :rules="rule" :model="formCategory" label-position="top" >
            <FormItem label="分类名称" prop="category">
              <Input size="large" v-model="formCategory.category" placeholder="填写分类名称"></Input>
            </FormItem>
            
            <FormItem>
              <Button @click="handleSubmit" long type="primary">提交</Button>
              <Button @click="handleReset" long style="margin-top: 15px">取消</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        formCategory:{
          category:''
        },
        loadShow: false,
        rule:{
          category: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      handleSubmit () {
        let that = this;
        console.log(that);
        this.$refs.formCategory.validate(async (valid) => {
          if (valid) {
            that.loadShow = true;  // 显示加载框
            const res = await this.$hslApi.post('articletype/curd', {
              type: 'add',
              category: this.formCategory.category,
            });
            console.log(res);
            that.loadShow = false;

            if(res.data.code == 'yes'){
              this.$Message.success({
                content:res.data.msg,
                onClose(){
                  that.$router.push('/categories/list')
                }
              });

            }else{
              this.$Message.error({
                content: res.data.msg,
                onClose(){
                  that.formCategory.category = '';
                }
              });
            }

          } else {
            this.$Message.error('分类名称不能为空！');
          }
        })
      },
      handleReset () {
        this.$refs.formCategory.resetFields();
      },
    }
  }
</script>
<style scoped>
  .categoryEdit{
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

<template>
  <div class="articleEdit">
    <Spin fix v-if="loadShow">
      <Icon type="ios-loading" size=40 class="spin-icon-load"></Icon>
      <div class="text-load">加载中</div>
    </Spin>

    <Row type="flex" justify="center" align="middle" >
      <Col span="20">
        <Card style="width:100%">
          <p slot="title">
            <Icon type="ios-add-circle" size=24></Icon>
            新建文章
          </p>
          <!-- 表单部分 -->
          <div>
            <div class="form-item">
              <label class="form-label">文章标题</label>
              <div class="input-inline">
                <Input v-model="formArticle.title" size="large" placeholder="输入文章标题" />
              </div>
            </div>
            <div class="form-item">
              <label class="form-label">文章分类</label>
              <div class="input-inline">
                <Select v-model="formArticle.classify" size="large" placeholder="请选择文章分类">
                  <Option v-for="item in types" :value="item.id" :key="item.id">
                    {{ item.category }}
                  </Option>
                </Select>
              </div>
            </div>
            <div class="form-item">
              <label class="form-label">文章上传</label>
              <div class="input-block">
                <Upload
                  name="content"
                  type="drag"
                  :show-upload-list="false"
                  :max-size="2048"
                  action="http://localhost:3000/admin/article/upload"
                  :on-success="successUp" 
                  :on-error="errorUp"
                  :on-exceeded-size="excsize"
                >
                  <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>单击或拖动文章到此处上载</p>
                  </div>
                </Upload>
              </div>
            </div>
            <div class="form-item">
              <div class="input-block">
                <Button @click="handleSubmit" type="primary" label="large">提交</Button>
                <Button @click="handleReset" label="large" style="margin-left:20px;">取消</Button>
              </div>
            </div>

          </div>
        </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        loadShow: false,
        formArticle:{
          title:'',
          classify:'',
          content:'',
          contenturl:''
        },
        types:[]
      }
    },
    methods:{
      successUp(response, file, fileList){
        //console.log(response);
        this.formArticle.contenturl = response.tempUrl
        this.$Message.success('上传成功');
      },
      errorUp(error, file, fileList){
        console.log(error);
      },
      excsize(file, fileList){
        this.$Message.error('上传文件不得超过2MB');
      },

      async handleSubmit(){
        let that = this;
        // 这里判断不能为空

        const res = await this.$hslApi.post('article/curd', {
          type: 'add', 
          title: that.formArticle.title, 
          classify: that.formArticle.classify, 
          contenturl: that.formArticle.contenturl,
        });
        if(res.data.code == 'yes'){
          this.$Message.success({
            content: res.data.msg,
            onClose(){
              that.$router.push('/articles/list')
            }
          });
        }else{
          this.$Message.error({
            content: res.data.msg,
            onClose(){
              that.formArticle = {
                title:'',
                classify:'',
                content:'',
                contenturl:''
              }
            }
          });
        }
      },
      handleReset(){
        this.formArticle = {
          title:'',
          classify:'',
          content:'',
          contenturl:''
        }
      },

      /** 渲染下拉列表 **/
      async typeList(){
        let res = await this.$hslApi.post('articletype/allist', {});
        this.types = res.data
      }
    },
    created(){
      this.typeList();
    }
  }
</script>
<style>
  .articleEdit{
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
  .form-item{
    margin-bottom: 15px;
  }
  .form-label{
    float: left;
    display: block;
    padding: 9px 15px;
    width: 110px;
    font-weight: 400;
    line-height: 20px;
    text-align: right;
  }
  .input-inline{
    margin-left: 110px;
    min-height: 36px;
  }
  .input-block{
    margin-left: 110px;
    min-height: 36px;
  }
</style>


<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="120px" style="margin-left:150px">
      <el-form-item label="标题" style="margin-top:50px">
        <el-input v-model="form.bannerTittle" style="width:300px" />
      </el-form-item>
      <el-form-item label="图片" :label-width="formLabelWidth">
        <!-- <input type="file" @change="tirggerFile($event)"> -->
        <div class="add">
          <p v-if="!file" class="text">未选择任何文件</p>
          <!-- <input ref="photo" name="img" type="file" class="hide" accept="image/*" @change="tirggerFile($event)"> -->
          <input name="img" type="file" class="hide" accept="image/*" @change="tirggerFile($event)">
          <img v-show="file" :src="file" class="img" height="100" width="100">
        </div>
      </el-form-item>
      <el-form-item label="内容(选填)" :label-width="formLabelWidth">
        <VueEditor
          v-model="form.bannerDetail"
          style="width:850px;height:auto;"
          @image-added="handleImageAdded"
        />
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="tmpstatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <br>
      <el-button type="primary" style="margin-left:100px" @click="save">保存</el-button>
      <el-button type="default" style="margin-left:70px" @click="cancel">取消</el-button>
    </el-form>
  </div>
</template>
<script>
  import { VueEditor } from "vue2-editor";
  export default {
    components: { VueEditor },
    data() {
      const self = this
      return {
        tmpstatus: false,
        form: {
          bannerTittle : '',
          bannerDetail : '',
          status : '',
          file : ''
        },
        content: '',
        value: '',
        editorOption: {
          placeholder: '请输入院校简介',
          theme: 'snow',
          modules: {}
        },
        toolbarOptions: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{
            'header': 1
          }, {
            'header': 2
          }], // custom button values
          [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }],
          [{
            'script': 'sub'
          }, {
            'script': 'super'
          }], // superscript/subscript
          [{
            'indent': '-1'
          }, {
            'indent': '+1'
          }], // outdent/indent
          [{
            'direction': 'rtl'
          }], // text direction

          [{
            'size': ['small', false, 'large', 'huge']
          }], // custom dropdown
          [{
            'header': [1, 2, 3, 4, 5, 6, false]
          }],

          [{
            'color': []
          }, {
            'background': []
          }], // dropdown with defaults from theme
          [{
            'font': []
          }],
          [{
            'align': []
          }],
          ['link', 'image'],
          ['clean'] // remove formatting button
        ]
      }
    },
    mounted() {
      console.log(this.getProductoneParams)
      // this.getDescription()
    },
    methods: {
      tirggerFile(event) {
        console.log('event.target.files[0]', event.target.files[0])
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = e => {
          this.file = e.target.result
          this.$forceUpdate()
        }
        this.form.file = event.target.files[0]
      },
      // handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //   let formData = new FormData();
      //   formData.append("img", file);
      //   this.$axios
      //     .post("/api/product/upload", formData)
      //     .then(result => {
      //       console.log(result)
      //       let url = result.data.data.path; // Get url from response
      //       Editor.insertEmbed(cursorLocation, 'image', url);
      //       resetUploader();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
      // editDescription() {
      //   const self = this
      //   let form = new FormData()
      //   form.append('description', self.content)
        // if (self.$route.params.row.deliveryTicketId) {
        //   form.append('deliveryTicketId', self.$route.params.row.deliveryTicketId)
        //   this.$axios.post('/api/deliveryTicket/editDescription', form).then(res => {
        //     console.log(res.data)
        //     if (res.data.msg === '成功') {
        //       saveSuccess()
        //     } else {
        //       saveError()
        //     }
        //     this.$router.go(-1)
        //   })
        // } else {
        //   form.append('productId', self.$route.params.row.productId)
        //   this.$axios.post('/api/product/editDescription', form).then(res => {
        //     console.log(res.data)
        //     if (res.data.msg === '成功') {
        //       saveSuccess()
        //     } else {
        //       saveError()
        //     }
        //     this.$router.go(-1)
        //   })
        // }
      // },
      // getDescription() {
      //   const self = this
      //   let form = new FormData()
        // if (self.$route.params.row.deliveryTicketId) {
        //   form.append('deliveryTicketId', self.$route.params.row.deliveryTicketId)
        //   this.$axios.post('/api/deliveryTicket/getDescription', form).then(res => {
        //     console.log(res.data)
        //     this.content = res.data.data
        //   })
        // } else {
        //   form.append('productId', self.$route.params.row.productId)
        //   this.$axios.post('/api/product/getDescription', form).then(res => {
        //     console.log(res.data)
        //     this.content = res.data.data
        //   })
        // }
      // },
      cancel() {
        this.$router.go(-1)
      },
      save() {
        this.form.status = this.tmpstatus == true ? '1' : '2'
        let form = new FormData()
        form.append('bannerTittle', this.form.bannerTittle)
        form.append('bannerDetail', this.form.bannerDetail)
        form.append('status', this.form.status)
        form.append('file', this.form.file)
        console.log('this.form', form)
        this.$post('/api/bg/banner', form).then(res => {
            console.log(res.data)
            if(res.code == 100){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.cancel()
            }
        })
        // this.editDescription()
      }
    }
  }// 创建富文本实例
</script>

<style scoped>
.add{
  height: 100px;
  position: relative;
}
.hide{
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 1;
  opacity: 0;
}
.img {
  position: absolute;
}
.text{
  position: absolute;
  width: 100px;
  height: 100px;
}
</style>

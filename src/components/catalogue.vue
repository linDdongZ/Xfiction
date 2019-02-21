<template>
  <div>
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>目录加载中...</div>
    </Spin>
    <div class="content" v-else>
        <div class="header"><Icon type="ios-arrow-back" @click="go"/><span>章节</span><span> </span></div>
      <ul>
        <router-link tag="li" :to="'/readABook?id='+index" v-for="(item,index) in catalogue" :key="index">
            <strong>{{catalogue[index].title}}</strong><Icon type="ios-arrow-forward" />
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
  name: "catalogue",
  data() {
    return {
      catatlogueID: this.$route.query.id
    };
  },
  methods: {
    ...mapActions(['catalogueData']),
      go(){
          this.$store.commit("BOOKSHELF_DUMP");
          this.$router.go(-2);
      }
  },
  computed:{
    ...mapGetters({
            loading: 'loadingRe',
            catalogue:'catalogueRe'
          })
  },
  created() {
    // this.$nextTick(() => {
      if(this.$store.state.catalogue.length == 0){
            this.catalogueData({axios:this.axios,id:this.catatlogueID})
          }
    // })
  },
};
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    padding-top: 50px;
    .header{
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 50px;
            background: rgb(255, 77, 77);
            color: #fff;
            i{
                font-size: 20px;
            }
            span{
                font-size: 15px;
            }
        }
        ul{
            width: 100%;
            li{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid rgb(216, 216, 216);
                strong{
                    margin-left: 10px;
                }
                i{
                    margin-right: 10px;
                }
            }
        }
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>

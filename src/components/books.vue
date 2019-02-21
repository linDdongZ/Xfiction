<template>
  <div class="content" id="content">
    <!-- 头部 -->
    <div class="header">
      <Icon type="md-reorder" @click="left = true"/>
      <span class="bookrackNav">
        <span class="border_bottom">书架</span>
        <span>书单</span>
      </span>
      <Icon type="ios-search" @click="to"/>
    </div>
    <div class="bookrack">
      <!-- <transition name="signIn">
        <div class="signIn" v-if="signInShow">
          <div class="frontCover">
            <img src alt width="60" height="80">
          </div>
          <div class="bookInfo">
            <h5></h5>
            <h4>作者</h4>
            <p>介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
          </div>
          <div class="signInInfo">
            <h6>已连签</h6>
            <h4>5天</h4>
            <Button type="error" :size="buttonSize" @click="signInShowIs">签到</Button>
          </div>
        </div>
      </transition> -->
      <div class="vertical-list" v-if="list">
                <ul>
                    <router-link :to="'/bookDetails?id='+Bookshelf[index].id" tag="li"  v-for="(item,index) in Bookshelf" :key="index">
                        <div class="frontCover"><img :src="'http://statics.zhuishushenqi.com'+Bookshelf[index].cover" alt width="60" height="80"></div>
                        <div class="bookInfo">
                            <h4>{{Bookshelf[index].title}}</h4>
                            <h5>{{Bookshelf[index].author}}</h5>
                            <p>{{Bookshelf[index].longIntro}}</p>
                        </div>
                        <div class="signInInfo">
                            <span class="iconfont icon-more"></span>
                        </div>
                    </router-link>
                </ul>
      </div>
      <div class="broadwise-list" v-else>
        <Col span="6" v-for="(item,index) in Bookshelf" :key="index">
          <div class="bookInfo" @click="bookDetails(index)">
            <img :src="'http://statics.zhuishushenqi.com'+Bookshelf[index].cover" alt width="60" height="80">
            <h4>{{Bookshelf[index].title}}</h4>
          </div>
        </Col>
      </div>
    </div>
    <Drawer title="用户的ID" placement="left" width="50%" :closable="false" v-model="left">
      <p class="left-p" @click="vertical">
        <Icon type="ios-list-box"/>列表排序
      </p>
      <p class="left-p" @click="broadwise">
        <Icon type="ios-apps"/>网格排序
      </p>
      <p class="left-p">
        <Icon type="ios-folder-open"/>管理书架
      </p>
      <p class="left-p">
        <Icon type="md-add"/>导入图书
      </p>
      <p class="left-p">
        <Icon type="md-pizza"/>账户充值
      </p>
    </Drawer>
    <buttonNav></buttonNav>
  </div>
</template>
<script>
import axios from "axios";
import buttonNav from "./buttonNav";
import { mapGetters,mapState,mapActions } from "vuex";
export default {
  name: "index",
  components: {
    buttonNav
  },
  data() {
    return {
      signInShow: true,
      buttonSize: "small",
      left: false,
      list:true,
    };
  },
  methods: {
    ...mapActions(['catalogueLoading']),
    signInShowIs() {
      this.signInShow = false;
    },
    jiazai(id){
      this.catalogueLoading({axios:this.axios,id:id})
    },
    to(){
      this.$router.push({ name: "search" });
    },
    vertical(){
      this.list = true;
    },
    broadwise(){
      this.list = false;
    },
    bookDetails(index){
      console.log(this.Bookshelf[index].id);
      
      this.$router.push({name: 'bookDetails', query: { id: this.Bookshelf[index].id }})
    }
  },
  computed: {
    ...mapGetters({
            // 对象形式key当前计算属性的属性名,value是一个字符串与vuex对应的getter保持一致
            Bookshelf: 'reBookshelf'
          })
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    z-index: 11;
    background: rgb(255, 80, 80);
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .bookrackNav {
      font-size: 12px;
      .border_bottom {
        border-bottom: 1px solid rgb(255, 86, 86);
      }
      span:nth-child(1) {
        margin-right: 10px;
      }
    }
    i {
      font-size: 25px;
      margin: 0 10px;
    }
  }
  .bookrack {
    margin: 50px 0;
    width: 100%;
    .signIn {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      background: rgb(221, 221, 221);
      .frontCover {
        width: 60px;
        height: 80px;
        border: 1px solid #999;
      }
      .bookInfo {
        border-right: 1px solid #999;
        width: 54%;
        h3 {
          color: #f00;
          font-weight: 500;
          font-size: 15px;
        }
        h4 {
          margin-top: 7px;
          font-size: 13px;
          color: rgb(209, 161, 58);
        }
        p {
          margin-top: 7px;
          font-size: 12px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .signInInfo {
        height: 80px;
        h6 {
          margin-top: 5px;
          width: 100%;
          text-align: center;
          font-size: 12px;
          color: #000;
        }
        h4 {
          margin-top: 5px;
          width: 100%;
          text-align: center;
          font-size: 18px;
          color: #f00;
        }
      }
    }
    .signIn-leave {
      transform: translateY(0%);
      opacity: 1;
    }
    .signIn-leave-to {
      transform: translateY(-100%);
      opacity: 0;
    }
    .signIn-leave-active {
      transition: all 1s;
    }
    .vertical-list {
      width: 100%;
      li {
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid rgb(128, 128, 128);
        .frontCover {
          width: 60px;
          height: 80px;
          border: 1px solid #999;
        }
        .bookInfo {
          width: 60%;
          h4 {
            font-size: 15px;
          }
          h5 {
            margin-top: 7px;
            font-size: 13px;
            color: rgb(209, 161, 58);
          }
          p {
            margin-top: 7px;
            font-size: 12px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .broadwise-list {
      margin-top: 10px;
      width: 100%;
      .bookInfo {
        margin: 0 auto;
        width: 80px;
        img {
          display: block;
          margin: 0 auto;
        }
        h4 {
          text-align: center;
        }
      }
    }
  }
}
.left-p {
  font-size: 22px;
  i {
    color: #000;
    margin-right: 15px;
  }
}
</style>


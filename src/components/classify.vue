<template>
  <div>
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>分类加载中...</div>
    </Spin>
    <div class="content" v-else>
      <div class="header">
        <ul>
          <li @click="changeTab({parameter:0})">
            <p>男生向</p>
            <span v-show="tabsSlither==0"></span>
          </li>
          <li @click="changeTab({parameter:1})">
            <p>女生向</p>
            <span v-show="tabsSlither==1"></span>
          </li>
          <li @click="changeTab({parameter:2})">
            <p>出版书籍</p>
            <span v-show="tabsSlither==2"></span>
          </li>
        </ul>
      </div>
      <div class="tabs-male tabs" v-show="tabsSlither==0">
        <router-link :to="'/classifyList?class=male&id='+classify.male[index].name" class="bookClassifyBox" tag="div" v-for="(item,index) in classify.male" :key="index">
        <div class="left">
          <div v-for="(bookcovers, i) in classify.male[index].bookCover" :key="i">
            <img
              :src="'http://statics.zhuishushenqi.com'+classify.male[index].bookCover[i]"
              width="60"
              height="80"
            >
          </div>
        </div>
        <div class="right">
            <h1>{{classify.male[index].name}}</h1>
            <span>总藏书量:{{classify.male[index].bookCount}}</span>
            <span>月更新量:{{classify.male[index].monthlyCount}}</span>
        </div>
        </router-link>
        <div style="clear:both;"></div>
      </div>
      <div class="tabs-female tabs" v-show="tabsSlither==1">
        <router-link :to="'/classifyList?class=female&id='+classify.female[index].name" class="bookClassifyBox" tag="div" v-for="(item,index) in classify.female" :key="index">
        <div class="left">
          <div v-for="(bookcovers, i) in classify.female[index].bookCover" :key="i">
            <img
              :src="'http://statics.zhuishushenqi.com'+classify.female[index].bookCover[i]"
              width="60"
              height="80"
            >
          </div>
          </div>
          <div class="right">
            <h1>{{classify.female[index].name}}</h1>
            <span>总藏书量:{{classify.female[index].bookCount}}</span>
            <span>月更新量:{{classify.female[index].monthlyCount}}</span>
        </div>
        </router-link>
        <div style="clear:both;"></div>
      </div>
      <div class="tabs-press tabs" v-show="tabsSlither==2">
        <router-link :to="'/classifyList?class=press&id='+classify.press[index].name" class="bookClassifyBox" tag="div" v-for="(item,index) in classify.press" :key="index">
        <div class="left">
          <div v-for="(bookcovers, i) in classify.press[index].bookCover" :key="i">
            <img
              :src="'http://statics.zhuishushenqi.com'+classify.press[index].bookCover[i]"
              width="60"
              height="80"
            >
          </div>
          </div>
          <div class="right">
            <h1>{{classify.press[index].name}}</h1>
            <span>总藏书量:{{classify.press[index].bookCount}}</span>
            <span>月更新量:{{classify.press[index].monthlyCount}}</span>
        </div>
        </router-link>
        <div style="clear:both;"></div>
      </div>
      <buttonNav></buttonNav>
    </div>
  </div>
</template>
<script>
import buttonNav from "./buttonNav";
import axios from "axios";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "classify",
  components: {
    buttonNav
  },
  data() {
    return {
      tabsSlither: 0
    };
  },
  methods: {
    ...mapActions(["classifyData"]),
    changeTab(type) {
      this.tabsSlither = type.parameter;
    }
  },
  created() {
    if(this.classify.length == 0){
      this.classifyData(this.axios);
    }
  },
  computed: {
    ...mapGetters({ classify: "classifyRe", loading: "loadingRe" })
  }
};
</script>
<style lang="scss" scoped>
.content {
    margin-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    z-index: 11;
    background: rgb(255, 80, 80);
    color: #fff;
    ul {
      height: 50px;
      li {
        float: left;
        padding: 0 10px;
        height: 50px;
        p {
          float: left;
          display: inline-block;
          width: 100%;
          height: 49px;
          line-height: 56px;
          text-align: center;
          font-size: 14px;
        }
        span {
          float: left;
          display: block;
          width: 100%;
          height: 1px;
          background: #fff;
        }
      }
    }
  }
  .tabs {
    width: 100%;
    height: 100%;
    .bookClassifyBox {
      float: left;
      border-bottom: 1px solid #000;
      width: 100%;
      height: 100%;
      background: #fff;
      .left {
      margin-left: 5%;
      position: relative;
      float: left;
      width: 30%;
      height: 120px;
      div:nth-child(1) {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 80px;
      }
      div:nth-child(2) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-20%, -50%);
        width: 60px;
        height: 80px;
      }
      div:nth-child(3) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-80%, -50%);
        width: 60px;
        height: 80px;
      }
    }
    .right{
        margin-left: 5%;
        float: left;
        width: 60%;
        height: 100%;
        h1{
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: center;
        }
        span{
            margin-left: 10px;
            font-size: 12px;
            color: rgb(173, 173, 173);
        }
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

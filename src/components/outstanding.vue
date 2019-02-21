<template>
  <div>
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="content" v-else>
      <div class="header">
        <div class="ionc">
          <Icon type="ios-search" @click="to"/>
        </div>
        <ul>
          <li>
            <p class="con">男生</p>
          </li>
          <li>
            <p>女生</p>
          </li>
          <li>
            <p>漫画</p>
          </li>
          <li>
            <p>听书</p>
          </li>
          <li>
            <p>对话</p>
          </li>
        </ul>
      </div>
      <Carousel autoplay v-model="banner" loop>
        <CarouselItem>
          <img src="../../static/img/1.jpg" alt width="100%" height="150px">
        </CarouselItem>
        <CarouselItem>
          <img src="../../static/img/2.jpg" alt width="100%" height="150px">
        </CarouselItem>
        <CarouselItem>
          <img src="../../static/img/3.jpg" alt width="100%" height="150px">
        </CarouselItem>
      </Carousel>
      <div class="recommend">
        <h3 class="bookTitle">
          追书最热TOP100
          <span>
            更多+
            <i class="iconfont icon-arrow-right-copy"></i>
          </span>
        </h3>
        <ul class="bookVertical">
          <router-link :to="'/bookDetails?id='+books[index]._id" tag="li" v-for="(book,index) in books" :key="index">
            <div class="frontCover">
              <img :src="'http://statics.zhuishushenqi.com'+books[index].cover" alt width="60" height="80">
            </div>
            <div class="bookInfo">
              <h4>{{books[index].title}}</h4>
              <h5>{{books[index].author}}</h5>
              <p>{{books[index].shortIntro}}</p>
            </div>
          </router-link>
        </ul>
      </div>
      <buttonNav></buttonNav>
    </div>
  </div>
</template>
<script>
import buttonNav from "./buttonNav";
import axios from "axios";
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
  name: "outstanding",
  data() {
    return {
      banner: 0
    };
  },
  components: {
    buttonNav
  },
  methods: {
    ...mapActions(['outstandingData']),
    to() {
      this.$router.push({ name: "search" });
    },
  },
  created() {
    // this.$nextTick(() => {
      if(this.$store.state.outstanding.length == 0){
            this.outstandingData(this.axios)
          }
    // })
  },
  computed:{
    ...mapGetters({
            loading: 'loadingRe',
            books:'outstandingRe'
          })
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  margin: 50px 0;
  .header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background: rgb(255, 80, 80);
    ul {
      width: 80%;
      height: 100%;
      li {
        float: left;
        width: 20%;
        height: 100%;
        p {
          display: block;
          margin: 0 auto;
          height: 50px;
          width: 60%;
          text-align: center;
          font-size: 12px;
          line-height: 70px;
          color: #fff;
        }
        p.con {
          border-bottom: 2px solid #fff;
        }
      }
    }
    .ionc {
      width: 20%;
      height: 100%;
      i {
        display: block;
        margin: 25px 0px 0 0;
        text-align: center;
        font-size: 22px;
        color: #fff;
      }
    }
  }
  .demo-carousel {
    width: 100%;
    height: 250px;
  }
}
.bookTitle {
  margin: 10px 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #000;
  font-size: 20px;
  font-weight: 600;
  padding-left: 10px;
  span {
    float: right;
    font-weight: 300;
    margin-right: 10px;
    font-size: 12px;
    color: #999;
  }
}
.bookVertical {
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

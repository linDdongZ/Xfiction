<template>
  <div class="content">
    <!-- <div class="demo-spin-container" v-if="loadingRe">
                <Spin fix></Spin>
    </div>-->
    <Scroll :on-reach-top="handleReachBottom" height="100%">
      <router-link
        tag="div"
        :to="'bookFromDetails?id='+bookfromsRe[index]._id"
        dis-hover
        v-for="(item, index) in bookfromsRe"
        :key="index"
        class="box"
      >
        <div class="left">
          <h3>{{bookfromsRe[index].title}}</h3>
          <p>{{bookfromsRe[index].desc}}</p>
          <h6>
            <span>作者:{{bookfromsRe[index].author}}</span>
            <span>藏书量:{{bookfromsRe[index].bookCount}}</span>
            <span>收藏:{{bookfromsRe[index].collectorCount}}</span>
          </h6>
        </div>
        <div class="right">
          <div v-for="(bookcovers, i) in bookfromsRe[index].covers" :key="i">
            <img
              :src="'http://statics.zhuishushenqi.com'+bookfromsRe[index].covers[i]"
              width="60"
              height="80"
            >
          </div>
        </div>
      </router-link>
    </Scroll>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "newBookFrom",
  data() {
    return {
      start: 0
    };
  },
  methods: {
    ...mapActions(["bookfroms"]),
    handleReachBottom() {
      return new Promise(resolve => {
        this.start += 11;
        this.bookfroms({
          axios: this.axios,
          url: "https://novel.juhe.im/booklists?tag=科幻&start=" + this.start
        });
        resolve();
      });
    }
  },
  created() {
    this.bookfroms({
      axios: this.axios,
      url: "https://novel.juhe.im/booklists?tag=科幻&start=" + this.start
    });
  },
  computed: {
    ...mapGetters(["bookfromsRe", "loadingRe"])
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin: 50px 0;
  width: 100%;
  height: 100%;
  .box {
    margin-top: 10px;
    height: 120px;
    width: 100%;
    border-bottom: 1px solid rgb(223, 223, 223);
    .left {
      float: left;
      width: 70%;
      height: 120px;
      h3 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
      }
      p {
        padding-left: 5px;
        height: 70px;
        line-height: 23px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      h6 {
        padding-left: 5px;
        font-size: 8px;
        color: rgb(165, 165, 165);
        font-weight: 500;
        span {
          margin-right: 10px;
        }
      }
    }
    .right {
      position: relative;
      float: right;
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
  }
}
</style>

<template>
  <div>
    <div class="conBig">
      <div class="header">
        <span>排行</span>
      </div>
      <div class="Panl">
        <Collapse simple accordion @on-change="DownloadData">
          <Panel :name="index+''" v-for="(item,index) in bookRankingRe" :key="index">
            <img
              :src="'http://statics.zhuishushenqi.com'+bookRankingRe[index].cover"
              alt
              width="20"
              height="20"
              class="img"
            >
            {{bookRankingRe[index].title}}
            <div slot="content">
              <Spin fix v-if="loading">加载中...</Spin>
              <ul class="bookVertical" v-else>
                <router-link
                  :to="'/bookDetails?id='+books[index]._id"
                  tag="li"
                  v-for="(book,index) in books"
                  :key="index"
                >
                  <div class="frontCover">
                    <img
                      :src="'http://statics.zhuishushenqi.com'+books[index].cover"
                      alt
                      width="60"
                      height="80"
                    >
                  </div>
                  <div class="bookInfo">
                    <h4>{{books[index].title}}</h4>
                    <h5>{{books[index].author}}</h5>
                    <p>{{books[index].shortIntro}}</p>
                  </div>
                </router-link>
              </ul>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
    <buttonNav></buttonNav>
  </div>
</template>
<script>
import buttonNav from "./buttonNav";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "ranking",
  components: {
    buttonNav
  },
  data() {
    return {
      books: [],
      loading: false
    };
  },
  methods: {
    ...mapActions(["bookRankingData","bookRankingDetailsData"]),
    DownloadData(key) {
      if (key.length != 0) {
        this.loading = true;
        this.axios
          .get(`https://novel.juhe.im/rank/${this.bookRankingRe[key]._id}`)
          .then(res => {
            this.books = res.data.ranking.books;
            this.loading = false;
          });
      }
    }
  },
  created() {
    if (this.$store.state.bookRanking.length == 0) {
      this.bookRankingData(this.axios);
    }
  },
  computed: {
    ...mapGetters(["bookRankingRe","bookRankingDetailsRe","bookRanKeyRe"])
  }
};
</script>
<style lang="scss" scoped>
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
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: rgb(255, 77, 77);
  color: #fff;
  i {
    font-size: 20px;
  }
  span {
    font-size: 15px;
  }
}
.Panl {
  position: relative;
  width: 100%;
  margin-top: 50px;
  .img {
    position: relative;
    top: 50%;
    transform: translate(-50%, -50%);
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
}
</style>

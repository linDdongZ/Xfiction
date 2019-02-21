<template>
  <div>
    <div class="header">
      <Icon type="ios-arrow-back" @click="go"/>
      <span>评论</span>
      <span></span>
    </div>
    <div class="CommentContent">
      <div class="btn">
        <span @click="loadingCommentData({name:'book',type:0})" :class="detailsShow==true ? 'con' :''">
          <Icon type="ios-book"/>小说详情
        </span>
        <span @click="loadingCommentData({name:'short',type:0})" :class="shortShow==true ? 'con' :''">
          <Icon type="md-chatboxes"/>短评
        </span>
        <span @click="loadingCommentData({name:'long',type:0})" :class="longShow==true ? 'con' :''">
          <Icon type="ios-chatbubbles"/>长评
        </span>
      </div>
      <div class="book" v-show="detailsShow">
        <div class="cover">
          <img
            :src="'http://statics.zhuishushenqi.com'+book.details.cover"
            width="80"
            height="100"
            alt
          >
        </div>
        <h3>{{book.details.title}}</h3>
        <p>{{book.details.author}}</p>
        <p class="synopsisText">{{book.details.longIntro}}</p>
      </div>
      <div class="shortComment" v-show="shortShow">
        <div class="Comment" ref="short">
          <ul class="shortUl">
            <li v-for="(item,index) in shortComment" :key="index">
              <h2 class="title">{{shortComment[index].title}}</h2>
              <p class="longCommentContent">{{shortComment[index].content}}</p>
              <div class="commentAuthor">
                <div class="avatar">
                  <img
                    :src="'http://statics.zhuishushenqi.com'+shortComment[index].author.avatar"
                    width="40"
                    height="40"
                    alt
                  >
                </div>
                <div class="info">
                  <span class="lv">LV{{shortComment[index].author.lv}}</span>
                  <span
                    :class="shortComment[index].gender == 'female' ? 'iconfont icon-nv':'iconfont icon-nan'"
                  ></span>
                  <p class="name">{{shortComment[index].author.nickname}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="longComment" v-show="longShow">
        <div class="Comment long" ref="long">
          <ul class="longUl">
            <li v-for="(item,index) in longComment" :key="index">
              <h2 class="title">{{longComment[index].title}}</h2>
              <p class="longCommentContent">{{longComment[index].content}}</p>
              <div class="commentAuthor">
                <div class="avatar">
                  <img
                    :src="'http://statics.zhuishushenqi.com'+longComment[index].author.avatar"
                    width="40"
                    height="40"
                    alt
                  >
                </div>
                <div class="info">
                  <span class="lv">LV{{longComment[index].author.lv}}</span>
                  <span
                    :class="longComment[index].gender == 'female' ? 'iconfont icon-nv':'iconfont icon-nan'"
                  ></span>
                  <p class="name">{{longComment[index].author.nickname}}</p>
                </div>
              </div>
              <div class="thumbs-up">
                <span>
                  <Icon type="ios-thumbs-up"/>
                  {{longComment[index].helpful.yes}}
                </span>
                <span>
                  <Icon type="ios-thumbs-down"/>
                  -{{longComment[index].helpful.no}}
                </span>
                <span>{{longComment[index].helpful.total}}点赞</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "bookComment",
  data() {
    return {
      shortSortType: "lastUpdated",
      shortStart: 1,
      shortComment: [],
      longComment: [],
      longStart: 1,
      shortSort: "comment-count",
      detailsShow: true,
      shortShow: false,
      longShow: false
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    loadingCommentData(condition) {
      if (condition.name === "short") {
        this.detailsShow = false;
        this.longShow = false;
        this.shortShow = true;
        if (this.shortComment.length == 0 || condition.type == 1) {
          const msg = this.$Message.loading({
            content: "Loading...",
            duration: 0
          });
          this.axios
            .get(
              `https://novel.juhe.im/book/short-reviews?book=${
                this.book.details._id
              }&sortType=${this.shortSortType}&start=${
                this.shortStart
              }&limit=20`
            )
            .then(res => {
              if (res.data.ok) {
                this.$Message.destroy();
                this.shortComment = res.data.docs;
                this.$nextTick(() => {
                  this.$refs.short.style = 'height:'+ (window.screen.height-100) +'px';
                if (!this.shortScroll) {
                this.shortScroll = new Bscroll(this.$refs.short, {
                    scrollY:true,
                    click:true
                })
                this.shortScroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (document.body.scrollTop + document.body.clientHeight == document.body.scrollHeight) {
                      this.shortStart += 10
                    this.loadingCommentData({name:'short',type:1})
                    this.shortScroll.scrollTo(0, 0, 0)
                    }
                })
                } else {
                this.shortScroll.refresh()
                }
              })
              }
            });
        }
      } else if (condition.name === "long") {
        this.detailsShow = false;
        this.longShow = true;
        this.shortShow = false;
        if (this.longComment.length == 0 || condition.type == 1) {
          const msg = this.$Message.loading({
            content: "Loading...",
            duration: 0
          });
          this.axios
            .get(
              `https://novel.juhe.im/book/reviews?book=${
                this.book.details._id
              }&sort=${this.shortSort}&start=${this.longStart}&limit=10`
            )
            .then(res => {
              if (res.data.ok) {
                this.$Message.destroy();
                this.longComment = res.data.reviews;
                this.$nextTick(() => {
                  this.$refs.long.style = 'height:'+ (window.screen.height-100) +'px';
                if (!this.scroll) {
                this.scroll = new Bscroll(this.$refs.long, {
                    scrollY:true,
                    click:true
                })
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (document.body.scrollTop + document.body.clientHeight == document.body.scrollHeight) {
                      this.longStart += 10
                    this.loadingCommentData({name:'long',type:1})
                    this.scroll.scrollTo(0, 0, 0)
                    }
                })
                } else {
                this.scroll.refresh()
                }
            })
              }
            });
        }
      } else if (condition.name === "book") {
        this.detailsShow = true;
        this.longShow = false;
        this.shortShow = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      book: "bookDetailsRe"
    })
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
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
.CommentContent {
  margin-top: 100px;
  .btn {
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 10;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    span {
      display: inline-block;
      height: 30px;
      margin: 10px 10px 10px 0;
      background: rgb(255, 98, 98);
      color: #fff;
      border-radius: 10px;
      line-height: 30px;
      padding: 0 5px;
    }
  }
  .book {
    width: 100%;
    .cover {
      width: 80px;
      height: 100px;
      border: 1px solid #000;
      margin: 10px auto;
    }
    h3 {
      width: 100%;
      height: 20px;
      font-size: 18px;
      line-height: 20px;
      text-align: center;
    }
    p {
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: rgb(197, 197, 197);
      text-align: center;
    }
    .synopsisText {
      width: 100%;
      height: auto;
      padding: 10px;
      color: rgb(66, 66, 66);
      font-size: 13px;
    }
  }
  .Comment {
    width: 100%;
    position: relative;
    ul {
      height: auto;
      background: #f3f3f3;
      li {
        background: #fff;
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        min-height: 100px;
        .title {
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          word-wrap: break-word;
        }
        .longCommentContent {
          width: 100%;
          font-size: 13px;
          word-wrap: break-word;
        }
        .commentAuthor {
          width: 100%;
          height: 50px;
          background: #f3f3f3;
          display: flex;
          flex-direction: row;
          align-items: center;
          .avatar {
            margin-left: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #000;
            overflow: hidden;
          }
          .info {
            margin-left: 10px;
            height: 40px;
            .lv {
              font-size: 9px;
            }
            .name {
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
            }
          }
        }
        .thumbs-up {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 30px;
          span {
            margin-left: 10px;
            vertical-align: middle;
            i {
              font-size: 14px;
            }
          }
        }
      }
      .commentSkip {
        margin: 0;
        text-align: center;
        font-size: 14px;
        color: rgb(131, 210, 255);
      }
    }
  }
}
.con{
  background:#c2c2c2!important;
  color: rgb(48, 48, 48)!important;
}
</style>

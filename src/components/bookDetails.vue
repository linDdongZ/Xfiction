<template>
  <div>
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="con" v-else>
      <div class="header">
        <Icon  type="ios-arrow-back" @click="go"/>
        <!-- <router-link tag="i" to="/">xxx</router-link> -->
        <h3>{{book.details.title}}</h3>
        <Dropdown style="margin-left: 20px">
          <Icon type="md-share primary" />
          <DropdownMenu slot="list">
            <DropdownItem>分享给QQ好友</DropdownItem>
            <DropdownItem>分享到空间</DropdownItem>
            <DropdownItem>分享给微信好友</DropdownItem>
            <DropdownItem>分享到朋友圈</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="bookInfo">
        <div class="cover">
          <img :src="'http://statics.zhuishushenqi.com'+book.details.cover" width="80" height="100">
        </div>
        <h3>{{book.details.title}}</h3>
        <p>{{book.details.author}}</p>
      </div>
      <div class="heat">
        <ul>
          <li>
            <h2>{{book.details.wordCount >=10000 ? parseInt(book.details.wordCount/10000) + "W" : book.details.wordCount}}</h2>
            <p>字数</p>
          </li>
          <li>
            <h2>{{book.details.chaptersCount}}</h2>
            <p>章节</p>
          </li>
          <li>
            <h2>{{book.details.latelyFollower}}</h2>
            <p>推荐</p>
          </li>
          <li>
            <h2>{{book.details.postCount}}</h2>
            <p>月票</p>
          </li>
        </ul>
      </div>
      <div class="synopsis" @click="synopsisShow">
        <p id="synopsisText">{{book.details.longIntro}}</p>
        <span v-show="show">查看更多</span>
      </div>
      <div class="cut-off"></div>
      <router-link :to="'/origin?id='+book.details._id" tag="div" class="catalogue">
        <span>目录</span>
        <strong>
          更新至:{{book.details.lastChapter}}
          <Icon type="ios-arrow-forward"/>
        </strong>
      </router-link>
      <div class="cut-off"></div>
      <div class="author">
        <div>
          <span></span>
          <strong>{{book.details.author}}</strong>
        </div>
        <router-link :to="'/author?author='+book.details.author" tag="div">
          <strong>点击进入作者空间</strong>
          <Icon type="ios-arrow-forward"/>
        </router-link>
      </div>
      <div class="cut-off"></div>
      <div class="tags">
        <span>标签</span>
        <Tag color="cyan" v-for="(item,index) in book.details.tags" :key="index">{{book.details.tags[index]}}</Tag>
      </div>
      <div class="cut-off"></div>
      <div class="bookRecommend">
        <div class="wrapper" ref="wrapper">
          <ul class="wrapperBox">
            <li>相关推荐</li>
            <li v-for="(item,index) in book.recommend" :key="index" @click="toRecommendBook(index)"><div><img :src="'http://statics.zhuishushenqi.com'+book.recommend[index].cover" alt="" width="60" height="80"></div><p>{{book.recommend[index].title}}</p></li>
          </ul>
        </div>
      </div>
      <div class="cut-off"></div>
      <div class="banner">
        <img src="../../static/img/banner.jpg" alt width="90%" height="90%">
      </div>
      <div class="cut-off"></div>
      <div class="comment">
        <Divider>短评</Divider>
        <div class="shortComment">
          <div class="shortBox" ref="shortBox">
            <ul class="shortBoxUl">
              <li v-for="(item,index) in book.bookShortComment" :key="index">
                <div class="userInfo">
                  <div class="head">
                    <img :src="'http://statics.zhuishushenqi.com'+book.bookShortComment[index].author.avatar" alt="" width="30" height="30">
                  </div>
                    <span>{{book.bookShortComment[index].author.nickname}}</span>
                    <i>LV{{book.bookShortComment[index].author.lv}}</i>
                </div>
                <div class="ShortCommentContent">
                  <p>{{book.bookShortComment[index].content}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Divider>长评</Divider>
        <div class="longComment">
          <ul>
            <li v-for="(item,index) in book.longComment" :key="index">
              <h2 class="title">{{book.longComment[index].title}}</h2>
              <p class="longCommentContent">{{book.longComment[index].content}}</p>
              <div class="commentAuthor">
                <div class="avatar">
                  <img :src="'http://statics.zhuishushenqi.com'+book.longComment[index].author.avatar" width="40" height="40" alt="">
                </div>
                <div class="info">
                  <span class="lv">LV{{book.longComment[index].author.lv}}</span><span :class="book.longComment[index].gender == 'female' ? 'iconfont icon-nv':'iconfont icon-nan'"></span>
                  <p class="name">{{book.longComment[index].author.nickname}}</p>
                </div>
              </div>
              <div class="thumbs-up">
                <span><Icon type="ios-thumbs-up" />{{book.longComment[index].helpful.yes}}</span>
                <span><Icon type="ios-thumbs-down" />-{{book.longComment[index].helpful.no}}</span>
                <span>{{book.longComment[index].helpful.total}}点赞</span>
              </div>
            </li>
            <li class="commentSkip" @click="goComment">查看更多</li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <ul>
          <li @click="addBook">
            <div>
              <Icon type="md-add"/>加入书架
            </div>
          </li>
          <li>
            <div>
              <Icon type="md-arrow-down"/>批量订阅
            </div>
          </li>
          <li>
            <router-link :to="'/origin?id='+book.details._id" tag="div">
              <Icon type="md-desktop"/>立即阅读
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Bscroll from "better-scroll"
import {mapActions,mapState,mapGetters} from 'vuex'
export default {
  name: "bookDetails",
  data() {
    return {
      show: true,
      bookID: this.$route.query.id
    };
  },

  methods: {
    ...mapActions(['bookDetailsData']),
    toRecommendBook(index){
      this.$router.push({path:`/bookDetails?id=${this.book.recommend[index]._id}`})
      this.$router.go(0)
    },
    go() {
      this.$router.go(-1);
    },
    goComment(){
      this.$router.push({path:`/comment?id=${this.book.details._id}`})
    },
    success() {
      this.$Message.success("添加成功");
    },
    error() {
      this.$Message.error("添加失败,书架已有同样的图书");
    },
    synopsisShow() {
      if (this.show == true) {
        document.getElementById("synopsisText").style = "height:auto";
        this.show = false;
      }
    },
    addBook(){
      let books = {
        title:this.book.title,
        id:this.book.details._id,
        cover:this.book.details.cover,
        author:this.book.details.author,
        longIntro:this.book.details.longIntro,
      }
      console.log(books);
      
      for(let i = 0;i<this.$store.getters.reBookshelf.length;i++){
        if (this.$store.getters.reBookshelf[i].id == books.id) {
          this.error();
          return;
        }
      }
      this.success()
      this.$store.commit("BOOKSHELF_PUSH", books);
    }
  },
  created() {
      if(this.$store.state.bookDetails.length == 0){
            this.bookDetailsData({axios:this.axios,id:this.bookID})
          }
  },
  watch: {
    loading:function(val){
      if(!val){
      this.$nextTick(() => {
      //相关书籍横向滑动
      if(!this.scroll){
        let width = (this.book.recommend.length + 1) * 90;
        document.querySelector(".wrapperBox").style = "width:"+width+"px";
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true, // 允许点击
          scrollX:true,
          scrollY:false,
          eventPassthrough:'vertical'
        })
      }else {
          this.scroll.refresh() // 更新滚动组件
        }
      //评论横向滑动
      if(!this.shortComment){
        let width = (this.book.bookShortComment.length) * 210;
        document.querySelector(".shortBoxUl").style = "width:"+width+"px";
        this.shortComment = new Bscroll(this.$refs.shortBox, {
          click: true, // 允许点击
          scrollX:true,
          scrollY:false,
          eventPassthrough:'vertical'
        })
      }else {
          this.shortComment.refresh() // 更新滚动组件
        }
    })
      }
    }
  },
  computed:{
    ...mapGetters({
            loading: 'loadingRe',
            book:'bookDetailsRe'
          })
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'origin' || to.name == 'comment'){
      next();
    }else{
      this.$store.commit("BOOKDETAILS_DUMP");
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
.con {
  width: 100%;
  padding-bottom: 50px;
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
      font-size: 22px;
      margin-right: 5px;
    }
    i:nth-child(1) {
      margin-left: 5px;
    }
  }
  .bookInfo {
    background: #fffced;
    padding: 20px;
    margin-top: 50px;
    .cover {
      width: 80px;
      height: 100px;
      margin: 0px auto;
      background: #ff7738;
    }
    h3 {
      width: 100%;
      height: 20px;
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
  }
  .heat {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(236, 236, 236);
    li {
      float: left;
      width: 25%;
      text-align: center;
      h2 {
        margin-top: 10px;
        font-size: 14px;
      }
      p {
        font-size: 11px;
        color: rgb(182, 182, 182);
      }
    }
  }
  .tags {
    width: 100%;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    span {
      margin: 0 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .comment{
    width: 100%;
    .shortComment{
      width: 100%;
      .shortBox{
        height: 140px;
        background: #f3f3f3;
        overflow: hidden;
        ul{
          height: 140px;
          li{
            float: left;
            margin: 10px 0 0 10px;
            height: 120px;
            width: 200px;
            background: #fff;
            overflow:auto;
            .userInfo{
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 100%;
              height: 40px;
              border-bottom: 1px solid rgb(219, 219, 219);
              .head{
                width: 30px;
                height: 30px;
                border: 1px solid rgb(165, 165, 165);
                border-radius: 50%;
                overflow: hidden;
              }
              span{
                font-size: 14px;
              }
              i{
                font-size: 9px;
                padding: 2px;
                text-align: center;
                background: #ff7738;
                border-radius: 10px;
                color: #fff;
              }
            }
            .ShortCommentContent{
              padding: 5px;
            }
          }
        }
        
      }
    }
    .longComment{
      width: 100%;
      ul{
        background: #f3f3f3;
        li{
          background: #fff;
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          .title{
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            word-wrap:break-word;
          }
          .longCommentContent{
            width: 100%;
            font-size: 13px;
            word-wrap:break-word;
          }
          .commentAuthor{
            width: 100%;
            height: 50px;
            background: #f3f3f3;
            display: flex;
            flex-direction:row;
            align-items:center;
            .avatar{
              margin-left: 10px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 1px solid #000;
              overflow: hidden;
            }
            .info{
              margin-left: 10px;
              height: 40px;
              .lv{
                font-size: 9px;
              }
              .name{
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
              }
            }
          }
          .thumbs-up{
            display: flex;
            justify-content:flex-end;
            align-items:center;
            width: 100%;
            height: 30px;
            span{
              margin-left: 10px;
              vertical-align:middle;
              i{
                font-size: 14px;
              }
            }
          }
        }
        .commentSkip{
          margin:0;
          text-align: center;
          font-size: 14px;
          color: rgb(131, 210, 255);
        }
      }
    }
  }
  .synopsis {
    padding: 10px;
    background: #fff;
    p {
      height: 40px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      display: block;
      width: 100%;
      text-align: center;
      color: rgb(124, 192, 255);
      font-size: 12px;
    }
  }
  .catalogue {
    width: 100%;
    height: 50px;
    overflow: hidden;
    strong {
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      color: #c7c7c7;
      float: right;
      i {
        margin: 0 10px;
      }
    }
    span {
      float: left;
      height: 50px;
      font-weight: bold;
      line-height: 50px;
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .author {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    span {
      float: left;
      margin-left: 10px;
      width: 30px;
      height: 30px;
      border: 1px solid #000;
      border-radius: 50%;
    }
    strong {
      float: left;
      line-height: 50px;
      margin-left: 5px;
    }
    div {
      display: flex;
      align-items: center;
      float: right;
      height: 50px;
      margin-right: 10px;
    }
  }
  .bookRecommend{
      width: 100%;
      overflow: hidden;
    .wrapper {
        height: 140px;
        text-align: center;
        line-height: 100px;
        overflow: hidden;
        ul{
          height: 140px;
          li {
          float: left;
          margin: 10px 0 10px 10px;
          width: 80px;
          height: 120px;
          div{
            margin: 0 auto;
            height: 80px;
            width: 60px;
            border: 1px solid #000;
          }
          p{
            height: 20px;
            line-height: 20px;
          }
        }
      } 
    }
  }
  .banner {
    width: 100%;
    padding: 10px;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    height: 50px;
    background: #fff;
    li {
      float: left;
      width: 33.33%;
      height: 100%;
      div {
        display: block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
    li:nth-child(3) div {
      background: linear-gradient(to bottom right, rgb(255, 78, 78), #ff7738);
      color: #fff;
    }
  }
}
.cut-off {
  width: 100%;
  height: 10px;
  background: #f3f3f3;
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
  height: 100%;
  position: relative;
  border: 1px solid #eee;
}
</style>

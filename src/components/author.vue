<template>
  <div>
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>作者作品加载中...</div>
    </Spin>
    <div class="content" v-else>
      <div class="header">
        <Icon type="ios-arrow-back" @click="go"/>
        <p>{{$route.query.author}}</p>
        <Icon type="md-menu"/>
      </div>
      <div class="author">
        <Icon type="logo-snapchat"/>
        <h4>名下作品共{{books.length + 1}}部</h4>
      </div>
      <ul class="bookVertical">
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
  </div>
</template>
<script>
export default {
  name: "author",
  data() {
    return {
      authorID: this.$route.query.author,
      books: null,
      loading: true
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    }
  },
  created() {
    this.axios
      .get(`https://novel.juhe.im/author-books?author=${this.authorID}`)
      .then(res => {
        console.log(res.data);
        this.books = res.data.books;
        this.loading = false;
      });
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
.content {
  width: 100%;
  background: #eee;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background: rgb(255, 67, 67);
    font-size: 20px;
    color: rgb(255, 255, 255);
    i {
      margin: 0 10px;
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
  .author {
    margin-top: 50px;
    i {
      display: block;
      margin: 0 auto;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #000;
      font-size: 48px;
    }
    h4 {
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: rgb(0, 0, 0);
    }
  }
}
</style>

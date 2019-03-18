<template>
  <div class="content">
    <div class="header">
      <Icon type="ios-search"/>
      <AutoComplete
        v-model="text"
        :data="searchData"
        @on-search="handleSearch"
        placeholder="请输入搜索内容"
        @on-blur="search"
        style="width:200px"></AutoComplete>
      <span @click="go">取消</span>
    </div>
    <ul class="bookVertical" v-show="showVertical==false">
        <router-link :to="'/bookDetails?id='+textData[index]._id" tag="li" v-for="(book,index) in textData" :key="index">
        <div class="frontCover">
          <img :src="'http://statics.zhuishushenqi.com'+textData[index].cover" alt width="60" height="80">
        </div>
        <div class="bookInfo">
          <h4>{{textData[index].title}}</h4>
          <h5>{{textData[index].author}}</h5>
          <p>{{textData[index].shortIntro}}</p>
        </div>
        </router-link>
    </ul>
    <div class="bookHot" v-show="showVertical">
      <Divider>历史热门小说</Divider>
      <div class="hotTab">
        <Tag color="volcano" v-for="(item,index) in hotBook.hotWords" :key="index" @click.native="tabSearch(hotBook.hotWords[index])">{{hotBook.hotWords[index]}}</Tag>
      </div>
      <Divider>最新热门小说</Divider>
      <div class="hotTab">
        <Tag color="green"  v-for="(item,index) in hotBook.newHotWords" @click.native="tabSearch(hotBook.newHotWords[index].word)" :key="index">{{hotBook.newHotWords[index].word}}</Tag>
      </div>
      <Divider>搜索热词</Divider>
      <div class="hotTab">
        <Tag color="red" v-for="(item,index) in hot" @click.native="tabSearch(hot[index].word)" :key="index">{{hot[index].word}}</Tag>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      text: "",
      textData:[],
      searchData:[],
      loading:false,
      showVertical:true,
      hot:[],
      hotBook:[]
    };
  },
  methods: {
    go() {
      if(this.textData.length != 0){
        this.showVertical = true
        this.textData = []
      }else{
        this.$router.go(-1);
      }
    },
    tabSearch(val){
      this.text = val;
      this.search()
    },
    search() {
      if(this.text.replace(/[\s|\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,"")!=""){
        const msg = this.$Message.loading({
                    content: 'Loading...',
                    duration: 0
                });
        this.axios
        .get(`https://novel.juhe.im/search?keyword=${this.text}`)
        .then(res => {
          this.textData =  res.data.books
          this.$Message.destroy()
          this.showVertical = false
    })
      }
    },
    handleSearch(){
      this.axios
        .get(`https://novel.juhe.im/auto-complete?query=${this.text}`)
        .then(res => {
          this.searchData =  res.data.keywords
    })
    }
  },
  created() {
    this.axios
        .get(`https://novel.juhe.im/search-hotwords`)
        .then(res => {
          this.hot =  res.data.searchHotWords
    })
    this.axios
        .get(`https://novel.juhe.im/hot-books`)
        .then(res => {
          this.hotBook =  res.data
    })
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 50px;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    z-index: 100;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background: rgb(255, 95, 95);
    i {
      margin-left: 10px;
      color: #fff;
      font-size: 26px;
    }
    span {
      margin-right: 10px;
      color: #fff;
      font-size: 16px;
    }
  }
  .bookVertical {
    margin-top: 50px;
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
  .bookHot{
    width: 100%;
    z-index: 1;
    .hotTab{
      padding: 10px;
    }
  }
}
.demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 100%;
        position: relative;
        border: 1px solid #eee;
    }
</style>

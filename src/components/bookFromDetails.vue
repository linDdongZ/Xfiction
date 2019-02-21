<template>
    <div>
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
            <div>书单详情加载中...</div>
        </Spin>
        <div class="content" v-else>
            <div class="header">
            <Icon  type="ios-arrow-back" @click="go"/>
            <!-- <router-link tag="i" to="/">xxx</router-link> -->
            <h3>书单详情</h3>
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
            <div class="bookFormInfo">
                <h3>{{bookFrom.title}}</h3>
                <!-- <div class="tags">
                    <span class="tag" v-for="(item,index) in bookFrom.tags" :key="index">{{bookFrom.tags[index]}}</span>
                </div> -->
                <div class="synopsis" @click="synopsisShow">
                    <p id="synopsisText">{{bookFrom.desc}}</p>
                    <span v-show="show"><Icon type="ios-arrow-down" /></span>
                </div>
                <div class="bookFromAuthor">
                    <div class="avatar"><img :src="'http://statics.zhuishushenqi.com'+bookFrom.author.avatar" alt="" width="50" height="50"></div>
                    <div class="info">
                        <p class="name">{{bookFrom.author.nickname}}<span>LV{{bookFrom.author.lv}}</span></p>
                        <p class="time">创建于{{bookFrom.created}}</p>
                    </div>
                </div>
            </div>
            <ul class="bookVertical">
                <router-link :to="'/bookDetails?id='+bookFrom.books[index].book._id" tag="li" v-for="(item,index) in bookFrom.books" :key="index">
                    <div class="bookInfo">
                        <div class="frontCover">
                            <img :src="'http://statics.zhuishushenqi.com'+bookFrom.books[index].book.cover" width="60" height="80">
                        </div>
                        <div class="info">
                            <h4>{{bookFrom.books[index].book.title}}</h4>
                            <h5>{{bookFrom.books[index].book.author}}</h5>
                            <p>{{bookFrom.books[index].book.cat}}</p>
                        </div>
                    </div>
                    <div class="comment">
                        <p><span>评论:{{bookFrom.books[index].comment}}</span></p>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions,mapGetters,mapState} from 'vuex'
export default {
    name:'bookFromDetails',
    data(){
        return{
            show: true,
        }
    },
    methods: {
        ...mapActions(['bookfromsDetails']),
        go() {
            this.$router.go(-1);
        },
        synopsisShow() {
            if (this.show == true) {
                document.getElementById("synopsisText").style = "height:auto";
                this.show = false;
            }
        },

    },
    created() {
        this.bookfromsDetails({axios:this.axios,id:this.$route.query.id})
    },
    computed: {
        ...mapGetters({loading:'loadingRe',bookFrom:'bookFromDetailsRe'})
    },
}
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    background: rgb(231, 231, 231);
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
  .bookFormInfo{
      margin-top: 50px;
      width: 100%;
      padding: 10px;
      background: rgb(255, 255, 255);
      h3{
          font-size: 14px;
          font-weight: bold;
          width: 100%;
      }
      .tags{
        width: 100%;
        line-height: 20px;
        .tag{
            margin-right: 3px;
            height: 10px;
            background: rgb(228, 255, 193);
            border: 1px solid rgb(74, 255, 68);
            color: rgb(82, 82, 82);
        }
      }
      .synopsis {
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
    .bookFromAuthor{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 70px;
        .avatar{
            margin-left: 10px;
            width: 50px;
            height: 50px;
            border: 1px solid #000;
            border-radius: 50%;
            overflow: hidden;
        }
        .info{
            margin-left: 10px;
            .name{
                span{
                    margin-left: 3px;
                    font-size: 8px;
                    background: rgb(255, 99, 99);
                    color: #fff;
                    padding: 2px;
                    border-radius: 10px;
                }
            }
            .time{
                font-size: 9px;
                color: rgb(219, 219, 219);
            }
        }
    }
  }
  .bookVertical{
        margin-top: 5px;
        width: 100%;
        li{
            margin-top: 5px;
            width: 100%;
            padding: 10px;
            background: #fff;
            .bookInfo{
                width: 100%;
                height: 90px;
                .frontCover{
                    float: left;
                    width: 60px;
                    height: 80px;
                    border: 1px solid #000;
                    margin-top: 5px;
                }
                .info{
                    float: left;
                    margin: 5px 0 0 10px;
                    width: 70%;
                    h4 {
                        font-size: 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    h5 {
                        margin-top: 7px;
                        font-size: 13px;
                        color: rgb(209, 161, 58);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
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
            .comment{
                width: 100%;
                min-height:30px;
                padding: 5px;
                span{
                    font-size: 14px;
                    font-weight: bold;
                }
            }
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

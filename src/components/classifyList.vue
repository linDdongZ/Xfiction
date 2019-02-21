<template>
    <div>
        <div class="content">
            <div class="header">
            <Icon  type="ios-arrow-back" @click="go"/>
            <!-- <router-link tag="i" to="/">xxx</router-link> -->
            <h3>{{$route.query.id}}</h3>
            <Dropdown style="margin-left: 20px">
            <Icon type="md-funnel" />
            <DropdownMenu slot="list">
                <DropdownItem @click.native="sort(1)">按时间</DropdownItem>
                <DropdownItem @click.native="sort(0)">按人气</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            </div>
            <div class="bookList">
                <div class="webpak" ref="webpak">
                    <ul class="bookVertical">
                        <router-link :to="'/bookDetails?id='+Data[index]._id" tag="li" v-for="(book,index) in Data" :key="index">
                        <div class="frontCover">
                        <img :src="'http://statics.zhuishushenqi.com'+Data[index].cover" alt width="60" height="80">
                        </div>
                        <div class="bookInfo">
                        <h4>{{Data[index].title}}</h4>
                        <h5>{{Data[index].author}}</h5>
                        <p>{{Data[index].shortIntro}}</p>
                        </div>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Bscroll from "better-scroll";
import axios from "axios";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    namae:'classifyList',
    data(){
        return{
            start:0,
            sortType:'hot'
        }
    },
    methods: {
        ...mapActions(['classifyDetails']),
        go() {
            this.$router.go(-1);
        },
        sort(val){
            val == 0 ? this.sortType = 'hot' : this.sortType = 'new'
            this.downloadData()
        },
        downloadData(){
            this.classifyDetails({axios:this.axios,type:this.sortType,major:this.$route.query.id,minor:'',start:this.start,gender:this.$route.query.class})
        }
    },
    created() {
        if(this.Data.length ==0){
            this.downloadData()
        }
    },
    computed: {
        ...mapGetters({ Data: "classifyDetailsRe", loading: "loadingRe" })
    },
    watch: {
        Data:function(val){
            if(val.length !=0){
                this.$nextTick(() => {
                if (!this.scroll) {
                this.$refs.webpak.style = 'height:'+ (window.screen.height-50) +'px';
                this.scroll = new Bscroll(this.$refs.webpak, {
                    scrollY:true,
                    click:true
                })
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (document.body.scrollTop + document.body.clientHeight == document.body.scrollHeight) {
                    this.start += 20
                    this.downloadData()
                    this.scroll.scrollTo(0, 0, 0)
                    }else if(pos.y > 50){
                    this.start - 20 > 0 ? this.start -=20 : this.start == 0
                    this.downloadData()
                    this.scroll.scrollTo(0, 0, 0)
                    }
                })
                } else {
                this.scroll.refresh()
                }
            })
            }
        },
        loading:function(val){
            if(val){
                const msg = this.$Message.loading({
                    content: "Loading...",
                    duration: 0
                });
            }else{
                this.$Message.destroy();
            }
        }
    },
    beforeRouteLeave (to, from, next) {
    if(to.name == 'bookDetails'){
      next();
    }else{
      this.$store.commit("CLASSIFYDETAILS_DATA_DEL");
      next();
    }
  }
}
</script>
<style lang="scss" scoped>
    .content{
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
            h3{
                font-size: 14px;
            }
            i {
            font-size: 22px;
            margin-right: 5px;
            }
            i:nth-child(1) {
            margin-left: 5px;
            }
        }
        .bookList{
            .webpak{
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
            }
        }
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>

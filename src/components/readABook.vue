<template>
    <div class="bigBox"  ref="scollElement">
        <Drawer title="目录" :closable="false" v-model="drawerShow" width="50%">
        <p v-for="(item,index) in catalogueLink" @click="previousChapter({index:index,type:0})" :key="index" :style=" catalogue == index ? 'background:rgb(206, 206, 206);font-size:16px;' : 'font-size:16px;'">{{catalogueLink[index].title}}</p>
        </Drawer>
        <div class="bookContent">
            <div class="header" v-show="show">
                <Icon type="ios-arrow-back" @click="go"/> <i  @click="drawerShow = true">目录<Icon type="md-menu"/></i>
            </div>
            <Scroll :on-reach-edge="handleReachEdge" :height="Txtheight">
                    <div dis-hover class="text" ref="bookwep">
                        <div class="bookwep" ref="bookBg">
                            <h1>{{catalogueLink[catalogue].title}}</h1>
                            <p v-html="text" class="textContent" ref="text"></p>
                        </div>
                    </div>
            </Scroll>
            <div class="main" @click="mainShow"></div>
            <div class="footer" v-show="show">
                <div class="fontSize">
                    <span v-for="(item,index) in fontSize" @click="fontSizeBtn(index)" :class="index == sizeNum ? 'ative' : ''" :key="index" :style="'font-size:'+fontSize[index]">A+</span>
                </div>
                <div class="link">
                    <span @click="previousChapter({index:-1,type:1})">上一章</span>
                    <div class="paper">
                        <ul>
                            <li v-for="(item,index) in bg" @click="bgBtn(index)" :class="index == bgNum ? 'ative' : ''" :key="index" :style="'background: url('+ bg[index] +')'"></li>
                        </ul>
                    </div>
                    <span @click="previousChapter({index:1,type:1})">下一章</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters,mapState,mapActions } from "vuex";
import BScroll from 'better-scroll';
export default {
    name:'readABook',
    data(){
        return{
            text:'',
            show:false,
            drawerShow:false,
            bgNum:0,
            Txtheight:window.screen.height,
            loading:false,
            sizeNum:0,
            colorFFF:false,
            catalogue:this.$route.query.id,
            fontSize:['14px','15px','16px','17px','18px','19px','20px'],
            bg:['../../static/img/bookBg_niupi.jpg','../../static/img/bookBg_sha.jpg','../../static/img/bookBg_yang.jpg','../../static/img/bookBg_jiu.jpg']
        }
    },
    created(){
        this.addData()
    },
    computed: {
        ...mapGetters({catalogueLink:'catalogueRe'})
    },
    methods: {
        mainShow(){
            this.show==true ? this.show=false : this.show=true
        },
        handleReachEdge (dir) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        if (dir > 0) {
                            this.previousChapter({index:-1,type:1})
                        } else {
                            this.previousChapter({index:1,type:1})
                        }
                        resolve();
                    }, 2000);
                });
            },
        addData(){
            this.loading = true;
            this.axios
            .get(`https://novel.juhe.im/chapters/${encodeURIComponent(this.catalogueLink[this.catalogue].link)}`)
            .then(res => {
                this.text += res.data.chapter.body.replace(/\n/g,"<br/>")
                this.loading = false;
            });
        },
        go(){
            this.$router.go(-1);
        },
        bgBtn(index){
            this.bgNum = index;
            this.$refs.bookBg.style = "background:url("+ this.bg[index] +")"
            this.$refs.scollElement.style = "background:url("+ this.bg[index] +")"
        },
        fontSizeBtn(index){
            this.sizeNum = index
            this.$refs.text.style = "font-size:"+ this.fontSize[index]
        },
        previousChapter(val){
            if(val.type == 1){
                this.catalogue = parseInt(this.catalogue) + val.index
                this.catalogue < 0 ? this.catalogue = 0 : this.catalogue = this.catalogue;
            }else{
                this.catalogue = val.index
                this.catalogue < 0 ? this.catalogue = 0 : this.catalogue = this.catalogue;
            }
            this.addData()
            window.scrollTo(0,0);
        }

    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
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
    .bigBox{
        background:url(../../static/img/bookBg_niupi.jpg);
        color: rgb(139, 139, 139);
        .bookContent{
            width: 100%;
            .main{
                position: fixed;
                width: 60%;
                height: 200px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                background: #fff;
            }
            .header{
                position: fixed;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                z-index: 11;
                height: 50px;
                background: rgb(61, 61, 61);
                color: #fff;
                i{
                    font-size: 16px;
                    margin: 0 10px;
                }
            }
            .text{
                .bookwep{
                    background:url(../../static/img/bookBg_niupi.jpg);
                    h1{
                        text-align: center;
                    }
                    .textContent{
                        font-size: 14px;
                    }
                }
            }
            .footer{
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 80px;
                z-index: 11;
                background: rgb(61, 61, 61);
                color: #fff;
                .fontSize{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 30px;
                    span{
                        border-radius: 50%;
                        margin-left: 10px;
                    }
                    .ative{
                            border: 2px solid rgb(255, 201, 51);
                    }
                }
                .link{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                        margin: 0 10px;
                    }
                    .paper{
                        height: 30px;
                        li{
                            float: left;
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            border: 1px solid rgb(190, 190, 190);
                            margin: 0 5px;
                        }
                        .ative{
                            border: 2px solid rgb(255, 201, 51);
                        }
                    }
                }
            }
        }
    }
</style>

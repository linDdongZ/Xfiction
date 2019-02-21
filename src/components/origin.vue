<template>
    <div>
        <div class="content">
            <div class="header"><Icon type="ios-arrow-back" @click="go"/><span>书源</span><span> </span></div>
            <Alert type="error">
            X小说提示
            <template slot="desc">部分书源资源有错,章节显示有问题可以换书源</template>
            </Alert>
            <ul>
                <router-link :to="'/catalogue?id='+origin[index]._id" tag="li" v-for="(itme,index) in origin" :key="index">
                    <span>{{origin[index].name}}</span>
                    <strong>{{origin[index].lastChapter}}</strong>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'origin',
    data(){
        return{
            bookID:this.$route.query.id,
            origin:null
        }
    },
    created() {
        this.axios
        .get(`https://novel.juhe.im/book-sources?view=summary&book=${this.bookID}`)
        .then(res => {
          this.origin =  res.data
          this.loading=false
    })
    },
    methods: {
        go(){
            this.$router.go(-1);
        }
    },
}
</script>
<style lang="scss" scoped>
    .content{
        width: 100%;
        padding-top: 50px;
        .header{
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
            i{
                font-size: 20px;
            }
            span{
                font-size: 15px;
            }
        }
        ul{
            width: 100%;
            li{
                width: 100%;
                height: 50px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgb(214, 214, 214);
                span{
                    margin-left: 10px;
                }
                strong{
                    margin-right: 20px;
                }
            }
        }
    }
</style>

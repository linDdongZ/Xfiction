<template>
    <div class="header">
        <div class="ionc">
          <Icon type="ios-search" @click="to"/>
        </div>
        <ul>
            <router-link tag="li" to="/bookFrom/hot">
                <p>周热门</p>
            </router-link>
            <router-link tag="li" to="/bookFrom/newBookFrom">
                <p>新书单</p>
            </router-link> 
            <router-link tag="li" to="/bookFrom/collect">
                <p>收藏榜</p>
            </router-link>
            <router-link tag="li" to="/bookFrom/dushi">
                <p>都市</p>
            </router-link>
            <router-link tag="li" to="/bookFrom/science">
                <p>科幻</p>
            </router-link>
        </ul>
      </div>
</template>
<script>
export default {
    name:'bookFromHeader',
    methods: {
        to() {
      this.$router.push({ name: "search" });
    },
    },
}
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 11;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background: rgb(255, 80, 80);
    ul {
      width: 80%;
      height: 100%;
      list-style: none;
      li {
        float: left;
        width: 20%;
        height: 100%;
        p {
          display: block;
          margin: 0 auto;
          height: 50px;
          width: 60%;
          text-align: center;
          font-size: 12px;
          line-height: 70px;
          color: #fff;
        }
      }
    }
    .ionc {
      width: 20%;
      height: 100%;
      i {
        display: block;
        margin: 25px 0px 0 0;
        text-align: center;
        font-size: 22px;
        color: #fff;
      }
    }
  }
  .active p{
      border-bottom: 2px solid #fff;
  }
</style>


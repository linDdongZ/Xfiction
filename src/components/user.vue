<template>
  <div class="content">
    <div class="user">
      <div class="headSculptureBox">
        <div class="headSculpture">
          <img src="../../static/img/boy.png" alt width="60" height="60">
        </div>
      </div>
      <div class="userInfo">
        <p>登录/注册</p>
        <div class="loginSelect">
          <span class="iconfont icon-weixin"></span>
          <span class="iconfont icon-QQ"></span>
          <span class="iconfont icon-shouji"></span>
          <span class="iconfont icon-more"></span>
        </div>
      </div>
    </div>
    <ul>
      <li></li>
    </ul>
    <bottomnav></bottomnav>
  </div>
</template>
<script>
import bottomnav from "./bottomNav";
export default {
  components: {
    bottomnav
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  .user {
    width: 100%;
    height: 120px;
    background: linear-gradient(
      to top,
      rgb(255, 138, 138),
      rgba(255, 217, 217, 0.253)
    );
    .headSculptureBox {
      float: left;
      width: 30%;
      height: 120px;
      .headSculpture {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 30px auto;
      }
    }
    .userInfo {
      width: 70%;
      height: 120px;
      float: right;
      p {
        margin-top: 30px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        color: rgb(138, 138, 138);
      }
      .loginSelect {
        height: 50px;
        border-top: 1px solid #000;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        span {
          display: inline-block;
          margin-top: 10px;
        }
        .icon-weixin {
          color: rgb(0, 204, 102);
          font-size: 30px;
        }
        .icon-QQ {
          color: rgb(80, 185, 255);
          font-size: 28px;
        }
        .icon-shouji {
          color: rgb(212, 94, 193);
          font-size: 30px;
        }
        .icon-more {
          color: rgb(0, 0, 0);
          font-size: 30px;
        }
      }
    }
  }
  ul{
    background: rgb(255, 138, 138);
    height: 600px;
    width: 100%;
  }
}
</style>

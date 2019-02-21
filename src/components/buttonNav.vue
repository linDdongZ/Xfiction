<template>
      <div class="bottomNav">
      
          <router-link tag="span" to="/books">
          <Icon type="md-book" />
          <p>书架</p>
          </router-link>
     
      
          <router-link tag="span" to="/">
          <Icon type="ios-bulb" />
          <p>精选</p>
          </router-link>
     
      
          <router-link tag="span" to="/classify">
          <Icon type="md-reorder" />
          <p>分类</p>
          </router-link>
     
      
          <router-link tag="span" to="/ranking">
          <Icon type="md-list" />
          <p>排行</p>
          </router-link>
     
      
          <router-link tag="span" to="/bookFrom/hot">
          <Icon type="md-school" />
          <p>书单</p>
          </router-link>
     
      </div>
</template>
<script>
export default {
    name:'bottomNav'
}
</script>
<style lang="scss" scoped>
    .bottomNav{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 11;
    width: 100%;
    height: 50px;
    background: rgb(255, 255, 255);
      span{
        display: inline-block;
        float: left;
        width: 20%;
      height: 100%;
      color: rgb(0, 0, 0);
        i{
          margin-top: 10px;
          display: block;
          font-size: 22px;
          text-align: center;
        }
        p{
          width: 100%;
          font-size: 12px;
          text-align: center;
        }
    }
  }
  .active {
  color: #f00 !important;
  }
</style>

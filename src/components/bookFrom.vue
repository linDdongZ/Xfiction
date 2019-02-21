<template>
    <div>
        <bookheader></bookheader>
        <router-view />
        <buttonNav></buttonNav>
    </div>
</template>
<script>
import buttonNav from "./buttonNav";
import { mapActions, mapState, mapGetters } from "vuex";
import bookFromHeader from './bookFromHeader'
export default {
    name: "bookFrom",
  components: {
    buttonNav,
    'bookheader':bookFromHeader
  },
}
</script>
<style lang="scss" scoped>

.content{
    width: 100%;
}
</style>

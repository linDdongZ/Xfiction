import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
    catalogue: [],
    bookshelf:[],
    bookDetails:[],
    loading:false,
    outstanding:[],
    bookRanking:[],
    bookRankingDetails:[],
    rankingKey:1,
    bookfroms:[],
    bookFromDetails:[],
    classify:[],
    classifyDetails:[]
}
// 只要modules不具名 当commit/dispatch同名mutation或action时,所有同名方法会一起执行
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
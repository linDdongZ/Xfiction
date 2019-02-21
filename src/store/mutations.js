import * as types from './mutation-types'
export default {
      [types.OUTSTANDING_DATA](state, book){
            state.outstanding = book
      },
      [types.LOADING](state, bo){
            state.loading = bo
      },
      [types.BOOKSHELF_PUSH](state,book){
            state.bookshelf.push(book)
      },
      [types.CATATLOGUE](state,chapters){
            state.catalogue = chapters
      },
      [types.BOOKSHELF_DUMP](state){
            state.catalogue = []
      },
      [types.BOOKDETAILS_DUMP](state){
            state.bookDetails = []
      },
      [types.BOOKDETAILS_PUSH](state, book){
            state.bookDetails = book
      },
      [types.RANKING](state, ranking){
            state.bookRanking = ranking
      },
      [types.RANKING_DETAILS](state, rankingDetails){
            state.bookRankingDetails = rankingDetails
      },
      [types.RANKING_KEY](state, key){
            state.rankingKey = key
      },
      [types.BOOKFROM](state, bookfrom){
            state.bookfroms = bookfrom
      },
      [types.BOOKFROMDETAILS_DATA](state, bookFrom){
            state.bookFromDetails = bookFrom
      },
      [types.CLASSIFY_DATA](state, classifyData){
            state.classify = classifyData
      },
      [types.CLASSIFYDETAILS_DATA](state, book){
            state.classifyDetails = book
      },
      [types.CLASSIFYDETAILS_DATA_DEL](state){
            state.classifyDetails = []
      },
}
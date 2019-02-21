import * as types from './mutation-types'
export default {
  outstandingData ({commit}, axios) {
    commit(types.LOADING,true)
    axios
      .get(`https://novel.juhe.im/rank/54d42d92321052167dfb75e3`)
      .then(res => {
        commit(types.OUTSTANDING_DATA, res.data.ranking.books);
        commit(types.LOADING, false);
      });
    },
    catalogueData({commit},{axios,id}){
    commit(types.LOADING,true)
    axios
      .get(`https://novel.juhe.im/book-chapters/${id}`)
      .then(res => {
        console.log(res)
        commit(types.CATATLOGUE, res.data.chapters)
        commit(types.LOADING,false)
      })
  },
  bookDetailsData({commit},{axios,id}) {
    commit(types.LOADING,true)
    axios
      .all([
        axios.get(`https://novel.juhe.im/book-info/${id}`),
        axios.get(`https://novel.juhe.im/recommend/${id}`),
        axios.get(`https://novel.juhe.im/book/short-reviews?book=${id}&start=1&limit=5`),
        axios.get(`https://novel.juhe.im/book/reviews?start=1&limit=5&sort=comment-count&book=${id}`)
      ])
      .then(axios.spread(function (bookdetails, bookrecommend,bookShortComment,longComment) {
        console.log(longComment.data.reviews)
        commit(types.BOOKDETAILS_PUSH, {
          details:bookdetails.data,
          recommend:bookrecommend.data.books,
          bookShortComment:bookShortComment.data.docs,
          longComment:longComment.data.reviews
        })
        commit(types.LOADING,false)
      }));
  },
  bookRankingData({commit},axios) {
    commit(types.LOADING,true)
    axios
      .get(`https://novel.juhe.im/rank-category`)
      .then(res => {
        console.log(res.data);
        commit(types.RANKING, res.data.male)
        commit(types.LOADING,false)
      });
  },
  bookRankingDetailsData({commit},{axios,id}) {
    commit(types.LOADING,true)
    axios
      .get(`https://novel.juhe.im/rank/${id}`)
      .then(res => {
        commit(types.RANKING, res.data.ranking.books)
        commit(types.LOADING,false)
      });
  },
  bookfroms({commit},{axios,url}) {
      axios
      .get(url)
      .then(res => {
        console.log(res.data);
        commit(types.BOOKFROM, res.data.bookLists)
      });
  },
  bookfromsDetails({commit},{axios,id}) {
    commit(types.LOADING,true)
      axios
      .get(`https://novel.juhe.im/booklists/${id}`)
      .then(res => {
        console.log(res.data.bookList);
        commit(types.BOOKFROMDETAILS_DATA, res.data.bookList)
        commit(types.LOADING,false)
      });
  },
  classifyData({commit},axios) {
    commit(types.LOADING,true)
      axios
      .get(`https://novel.juhe.im/categories`)
      .then(res => {
        console.log(res.data);
        commit(types.CLASSIFY_DATA, res.data)
        commit(types.LOADING,false)
      });
  },
  classifyDetails({commit},{axios,gender,major,start,minor,type}) {
    commit(types.LOADING,true)
      axios
      .get(`https://novel.juhe.im/category-info?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
      .then(res => {
        console.log(res.data);
        commit(types.CLASSIFYDETAILS_DATA, res.data.books)
        commit(types.LOADING,false)
      });
  },
}
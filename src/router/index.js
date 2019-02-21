import Vue from 'vue'
import Router from 'vue-router'
import books from '../components/books'
import ranking from '../components/ranking'
import outstanding from '../components/outstanding'
import search from '../components/search'
import bookDetails from '../components/bookDetails'
import author from '../components/author'
import origin from '../components/origin'
import catalogue from '../components/catalogue'
import readABook from '../components/readABook'
import bookFrom from '../components/bookFrom'
import hot from '../components/From/hot'
import newBookFrom from '../components/From/newBookFrom'
import dushi from '../components/From/dushi'
import collect from '../components/From/collect'
import science from '../components/From/science'
import bookFromDetails from '../components/bookFromDetails'
import bookComment from '../components/bookComment'
import classify from '../components/classify'
import classifyList from '../components/classifyList'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/books',
      name: 'books',
      component: books
    },
    {
      path: '/classifyList',
      name: 'classifyList',
      component: classifyList
    },
    {
      path: '/comment',
      name: 'comment',
      component: bookComment
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/bookFrom/bookFromDetails',
      name: 'bookFromDetails',
      component: bookFromDetails
    },
    {
      path: '/bookFrom',
      name: 'bookFrom',
      component: bookFrom,
      children:[
        {
          path: '/bookFrom/science',
          name: 'science',
          component: science
        },
        {
          path: '/bookFrom/collect',
          name: 'collect',
          component: collect
        },
        {
          path: '/bookFrom/hot',
          name: 'hot',
          component: hot
        },
        {
          path: '/bookFrom/dushi',
          name: 'dushi',
          component: dushi
        },
        {
          path: '/bookFrom/newBookFrom',
          name: 'newBookFrom',
          component: newBookFrom
        },
      ]
    },
    {
      path: '/readABook',
      name: 'readABook',
      component: readABook
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: catalogue
    },
    {
      path: '/origin',
      name: 'origin',
      component: origin
    },
    {
      path: '/author',
      name: 'author',
      component: author
    },
    {
      path: '/',
      name: 'outstanding',
      component: outstanding
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/bookDetails',
      name: 'bookDetails',
      component: bookDetails
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
  ]
})

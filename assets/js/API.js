
// $.ajaxPrefilter()  可以在ajax  get post 之前截取
// 开发环境服务器
let baseUrl = 'http://api-breakingnews-web.itheima.net'
// 测试环境服务器
// let baseUrl = 'http://api-breakingnews-web.itheima.net'
// 生产环境服务器
// let baseUrl = 'http://api-breakingnews-web.itheima.net'

$.ajaxPrefilter(function (origin) {
    console.log(origin);
    origin.url = baseUrl + origin.url
})
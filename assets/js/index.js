$(function () {

    getUserinfo();

    let layer = layui.layer
    // 点击退出  退出到登录界面
    $('#loginout').on('click', function () {
        // console.log(1);
        layer.confirm('是否要退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 销毁token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    })


});


// 设置一个全局函数
// 获取用户基本信息
// function getUserinfo() {
//     $.ajax({
//         type: 'get',
//         url: "/my/userinfo",
//         // data: '',
//         success: function (res) {
//             console.log(res);
//             get(res)
//         }
//     })
// }

// 封装一个渲染函数
// function get(res) {
//     if (res.status != 0) {
//         return layer.msg(res.message)
//     }
//     // 渲染头像
//     let name = res.data.unickname || res.data.username;
//     $('.welcome').html('欢迎' + name);
//     let url = res.data.user_pic
//     if (url == null) {
//         $('.layui-nav-img').hide();
//         $('.text-avatar').html(res.data.username[0].toUpperCase())
//     } else {
//         $('.text-avatar').hide();
//         $('.layui-nav-img').attr('src', url)
//     }

// }

// 获取用户基本信息  渲染到页面  更新头像

function getUserinfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // data: '',
        success: function (res) {
            // console.log(res);
            let data = res.data
            let name = data.nickname || data.username
            $('.welcome').html('欢迎' + name);
            let url = data.user_pic
            if (url == null) {
                $('.layui-nav-img').hide();
                $('.text-avatar').html(data.username[0].toUpperCase())
            } else {
                $('.text-avatar').hide();
                $('.layui-nav-img').attr('src', url)
            }
        }
    })
}

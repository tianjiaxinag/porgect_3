// 入口函数
$(function () {
    // 点击去注册跳转到注册页面
    $('#log_box').on('click', () => {
        // console.log(1);
        $('.login_box').hide();
        $('.login_age').show();
    });
    // 点击去登录跳转到去登录页面
    $('#log_age').on('click', () => {
        // console.log(1);
        $('.login_age').hide();
        $('.login_box').show();
    });

    // 登录注册页面
    // 判定注册两个密码相同
    // console.log(layui.form);
    let form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repword: function (value, index) {
            // 代表这个input的输入值
            // console.log(value);
            // 获取第一次输入密码的input的输入值
            // console.log($('.login_age input[name = password]').val());
            let val = $('.login_age input[name = password]').val();
            // 两个输入值做比较
            if (value != val) {
                return "两次输入密码不一样请重新输入"
            }
        }
    });
    // 请求注册
    let layer = layui.layer
    $('#form_log').on('submit', (e) => {
        // 阻止默认事件
        e.preventDefault();
        // console.log(1);
        let val = $('.login_age input[name=username]').val();
        let val1 = $('.login_age input[name=password]').val();
        // console.log(val, val1);
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: val,
                password: val1
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('恭喜你注册成功', { icon: 6 });
                // 跳转到登录页面
                $('#log_age').click();
                // 清空表单内容
                $('#form_log')[0].reset();
            }
        })
    });

    // 请求登录
    $('#form_login').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // console.log(1)
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            // data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                // 跳转页面
                location.href = 'index.html'
                // 把res.token保存到本地  到时候验证用户用
                localStorage.setItem('token', res.token);
            }
        })
    });
})
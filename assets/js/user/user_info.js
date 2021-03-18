// 入口函数
$(function () {
    let form = layui.form
    let layer = layui.layer
    // 判断用户修改用户名长度
    // let val = $('name=nickname').val().trim();
    form.verify({
        nickname: function (value, item) {
            if (value.length < 2 || value.length > 8) {
                return '用户昵称需要在2到8位之间'
            }
        }
    })

    initUserBifo()
    // 获取用户信息
    function initUserBifo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // data: '',
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.meccage)
                }
                // 渲染到页面
                form.val("formuserbifo", res.data);
            }
        })
    }
    // 重置按钮
    $('#onreset').on('click', function (e) {
        // 
        e.preventDefault();

        initUserBifo();
        // console.log(1);
    })
    // 修改用户信息
    $('form').on('submit', function (e) {
        e.preventDefault();
        // console.log(1);
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你用户数据修改成功');
                // 调用
                window.parent.getUserinfo()
            }
        })
    });

})
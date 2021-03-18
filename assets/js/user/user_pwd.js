// 入口函数
$(function () {
    let layer = layui.layer
    let form = layui.form
    // 判断新密码不能和原密码相同
    // let val = $('[name=oldPwd]').val().trim();
    // let val1 = $('[name=newPwd]').val().trim();
    // if (val == val1) {
    //     return layer.msg('新密码不能和原密码相同')
    // };
    // let val2 = $('[name=rwPwd]').val().trim()
    // if (val1 != val2) {
    //     return layer.msg('确认密码和新密码不一致请重新输入')
    // }
    // console.log(val, val1, vla2);
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        username: function (value, item) { //value：表单的值、item：表单的DOM对
            let val = $('[name=oldPwd]').val().trim();
            if (value == val) {
                return '新密码不能和原密码相同'
            }
        },
        word: function (value, item) { //value：表单的值、item：表单的DOM对
            let val = $('[name=newPwd]').val().trim();
            if (value != val) {
                return '确认密码和新密码不一致请重新输入'
            }
        }
    });
    // 修改密码
    $('form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你修改密码成功');

            }
        })
    })


})
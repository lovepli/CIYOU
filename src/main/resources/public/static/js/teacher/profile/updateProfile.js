/**
 * Created by c on 2018/2/19.
 */
$(function () {

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        //得到当前激活的Tab标签页
        var tartgetStr = e.target.toString();
        if(tartgetStr.lastIndexOf("#profile") != -1){
            //清除验证状态
            $("#dict-form-profile").data("bootstrapValidator").resetForm();
            //清空数据
            $('#dict-form-profile')[0].reset();
            $.ajax({
                type: 'POST',
                url: 'getTeacherByTid',
                cache: false,
                dataType:'json',
                data: {
                    tid: $.trim($("#tid").val())
                },
                success: function (data) {
                    $("#name").val(data.entity.name);
                    if(data.entity.subject != null){
                        $("#subject").val(data.entity.subject.subjectId);
                    }else{
                        $("#subject").val(0);
                    }
                    $(":radio[name='sex'][value='" + data.entity.sex + "']").attr("checked", "checked");
                    $("#phone").val(data.entity.mobile);
                    $("#email").val(data.entity.email);
                }
            });
        }else if(tartgetStr.lastIndexOf("#password") != -1){
            //清除验证状态
            $("#dict-form-password").data("bootstrapValidator").resetForm();
            //清空数据
            $('#dict-form-password')[0].reset();
        }

    });
    // 通过名称选取标签页
    $('#myTab a[href="#profile"]').tab('show');




    $('#profileButton').click(function () {
        $("#dict-form-profile").bootstrapValidator('validate');//提交验证
        if ($("#dict-form-profile").data('bootstrapValidator').isValid()) {//获取验证结果，如果成功，执行下面代码
            $.ajax({
                type: 'POST',
                url: 'updateProfile',
                cache: false,
                dataType: 'json',
                data: {
                    tid: $.trim($("#tid").val()),
                    name: $.trim($("#name").val()),
                    sex: $("input[name='sex']:checked").val(),
                    mobile: $.trim($("#phone").val()),
                    email: $.trim($("#email").val()),
                    subjectId: $.trim($("#subject").val())
                },
                success: function (data) {
                    if(data.isSuccess){
                        showInfo(data.message);
                    }else{
                        showInfo1(data.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    showInfo("抱歉系统繁忙..");
                }
            });
        }
    });

    $('#modal_info').on('hide.bs.modal',function() {//提示模糊框隐藏时候触发
        location.reload();  	//刷新当前页面
    });


});


function showInfo(msg) {
    $("#div_info").text(msg);
    $("#modal_info").modal('show');
}


function showInfo1(msg) {
    $("#div_info1").text(msg);
    $("#modal_info1").modal('show');
}



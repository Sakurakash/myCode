$(function () {
    // 0.监听内容的时时输入
    $("body").delegate(".comment","propertychange input", function () {
        // 判断是否输入了内容
        if($(this).val().length > 0){
            // 让按钮可用
            $(".send").prop("disabled", false);
        }else{
            // 让按钮不可用
            $(".send").prop("disabled", true);
        }
    });
    // 1.监听发布按钮的点击
    $(".send").click(function () {
        // 拿到用户输入的内容
        let $text = $(".comment").val();
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=add&content=" + $text,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });
        // 根据内容创建节点
        let $weibo = createEle($text);
        // 插入微博
        $(".messageList").prepend($weibo);
    });

    // 2.监听顶点击
    $("body").delegate(".infoTop", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    // 3.监听踩点击
    $("body").delegate(".infoDown", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    // 4.监听删除点击
    $("body").delegate(".infoDel", "click", function () {
        $(this).parents(".info").remove();
    });

    // 创建节点方法
    function createEle(text) {
        return $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">" + text + "</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">" + formatDate() + "</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javascript:;\" class='infoTop'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDown'>0</a>\n" +
            "                    <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>");
    }

    // 生成时间方法
    function formatDate() {
        let date = new Date();
        // 2018-4-3 21:30:23
        let arr = [date.getFullYear() + "-",
            date.getMonth() + 1 + "-",
            date.getDate() + " ",
            date.getHours() + ":",
            date.getMinutes() + ":",
            date.getSeconds()];
        return arr.join("");

    }
});
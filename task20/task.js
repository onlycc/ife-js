/**
 * Created by unicorn on 2016/5/11.
 * 任务链接：http://ife.baidu.com/task/detail?taskId=20
 任务描述
 基于任务18进行升级
 将新元素输入框从input改为textarea
 允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
 增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识
 */
    window.onload = function () {

        var doc = document;
        var input = doc.getElementById('textArea');
        var search = doc.getElementById('searchInput');
        var result = doc.getElementById('result');
        var content = {
            arr : [],
            segment : /[,\uff0c\u3001、\r\n\s]+/,
            split : function (str){//字符串分割
                if(str.length > 0){
                    return  str.split(this.segment);
                } else {
                    alert('请输入内容进行！');
                }
            }
        };
        function render(str) {
            //map: 创建一个新的数组使用调用此数组中的每个元素上所提供的函数的结果
            result.innerHTML = content.arr.map( function(d) {
                if (str != null && str.length > 0) {
                    d = d.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
                }
                //replace 查找替换，g:替换所有的子串
                return '<div>' + d + '</div>';
            }).join('');
        }
        function init () {
            doc.getElementById('insert').onclick = function (){ //点击插入
                var myStr = input.value.trim();
                content.arr = content.split(myStr);

                for(var i = 0, len = content.arr.length; i < len; i++){
                    console.log(content.arr[i]);
                }
            };
            doc.getElementById('search').onclick = function (){ //查询
                var str = search.value.trim();
                render(str);
            };
        }
        init();
    };
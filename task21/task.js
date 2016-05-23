/**
 * Created by unicorn on 2016/5/11.
 * 任务链接：http://ife.baidu.com/task/detail?taskId=21
 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
 如示例图上方，实现一个tag输入框
 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
 Tag不能有重复的，遇到重复输入的Tag，自动忽视。
 每个Tag请做trim处理
 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
 如示例图下方，实现一个兴趣爱好输入的功能
 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
 爱好不能重复，所以在下方呈现前，需要做一个去重
 每个爱好内容需要做trim处理
 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉
 */
    window.onload = function () {

        var doc = document;
        var tagInput = doc.getElementById('tag_input');
        var tagShow = doc.getElementById('tag_show');

        var hobbyInput = doc.getElementById('hobby_input');
        var hobbyShow = doc.getElementById('hobby_show');
        var insert = doc.getElementById('insert');


        var hobby = {
            limitNum : 10,
            segment : /[,，、\uff0c\u3001\r\n\s]+/,
            split : function (str){ //字符串分割
                if(str.length > 0){
                    return  str.split(this.segment);
                } else {
                    alert('请输入内容进行！');
                }
            },
            render : function(str) {
                hobbyShow.innerHTML = str.map(function (d) {
                    if (str.length > 0) {
                        return "<li class='label'>" + d + "</li>";
                    }
                }).join('');
            },
            unique: function (str){
                var len = str.length;
                var ret = [];
                for (var i = 0; i < len; i++){
                    var item = str[i];
                    if (ret.indexOf(item) === -1){
                        ret.push(item);
                    }
                }
                return ret;
            },
            limit : function (str) {
                var len = str.length;
                if (len < this.limitNum){
                    return str;
                } else {
                    for(var shorten = len - this.limitNum; shorten >= 0; shorten--) {
                        str.shift();
                    }
                    return str;
                }
            }
        };

        var tag = {
            limitNum : 10,
            arr : [], //存储累积的值
            rex : /^[a-zA-Z\d\u4e00-\u9fa5]+/, //匹配中文数字英文
            validate : function (str){
                return this.rex.test(str);
            },
            limit : function () {
                var len = this.arr.length;
                if (len < this.limitNum){
                    return true;
                } else {
                    for(var shorten = len - this.limitNum; shorten >= 0; shorten--)
                    {
                        this.arr.shift();
                    }
                    return false;
                }
            },
            putData: function (str) {
                if (this.contain(this.arr, str)){
                    alert('已经包含字符'+ str);
                } else {
                    this.limit();
                    this.arr.push(str);
                }
                tagInput.value = ''; //清空输入框的值
            },

            getData : function (str, e){
                if ( e.keyCode === 188 ) { //逗号,删除最后的逗号
                    str = str.substring(0, str.length-1); //去除最后一位
                    this.putData(str);
                }else if (e.keyCode === 13 || e.keyCode === 32) {
                    this.putData(str);
                }
                return str;

            },
            contain : function(str, obj) {
                var i = str.length;
                while (i--) {
                    if (str[i] === obj) {
                        return true;
                    }
                }
                return false;
            },
            renderData : function (){
                tagShow.innerHTML = this.arr.map(function (data) {
                    return "<li class='label'>" + data + "</li>";
                }).join('');

            },
            delTag : function(ele){
                var str = ele.textContent = ele.textContent.replace(/删除：/, '');
                var pos = this.arr.indexOf(str); //查找是否存在 找到删除位置
                this.arr.splice(pos, 1);
                this.renderData();
            }

        };


        function addDelEvent(e){

            tagShow.onmouseover = function(event) {
                var eve = event || window.event;
                var target = eve.target;
                if(target.tagName.toUpperCase() ==='LI'){
                    eve.target.textContent = '删除：' + eve.target.textContent;
                    eve.target.classList.toggle('del');
                }
             };

            tagShow.onmouseout = function(event) {
                 var eve = event || window.event;
                var target = eve.target;
                if(target.tagName.toUpperCase()==='LI') {
                    eve.target.textContent = eve.target.textContent.replace(/删除：/, '');
                    eve.target.classList.toggle('del');
                }
             };

            tagShow.onclick = function (event) { //点击删除
                var eve = event || window.event;
                var target = eve.target;
                if(eve.target.tagName.toUpperCase() ==='LI') {
                    tag.delTag(target);
                }

            }
        }
        

        

        function tagEvent() {
            doc.getElementById('tag_input').onkeyup = function (event) {
                var e = event || window.event;
                var myTag = tagInput.value;
                if ( !tag.validate(myTag) ){
                    alert('请输入合法中英文或数字，以逗号或空格结尾！');
                } else {
                    myTag = tag.getData(myTag, e); //获取输入
                    tag.renderData(); //显示标签
                }
            };
            addDelEvent(event);
        }

        function hobbyEvent() {
            //输入兴趣爱好
            doc.getElementById('insert').onclick = function (){
                var myStr = hobbyInput.value.trim();
                myStr = hobby.split(myStr);
                myStr = hobby.unique(myStr); //去重
                myStr = hobby.limit(myStr);  //限制输入个数
                hobby.render(myStr); //显示兴趣

                for(var i = 0, len = myStr.length; i < len; i++){
                    console.log(myStr[i]);
                }
            };
        }

        function  init (){
            hobbyEvent();
            tagEvent();

        }
        init();
    };
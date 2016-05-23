/**
 * Created by unicorn on 2016/5/11.
 * 任务链接：http://ife.baidu.com/task/detail?taskId=18
 模拟一个队列，队列的每个元素是一个数字，初始队列为空
 有一个input输入框，以及4个操作按钮
 点击"左侧入"，将input中输入的数字从左侧插入队列中；
 点击"右侧入"，将input中输入的数字从右侧插入队列中；
 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
 点击队列中任何一个元素，则该元素会被从队列中删除
 */

    window.onload = function () {
        var doc = document;
        var input = doc.getElementById('number_input');
        var wrapper = doc.getElementById('wrapper');
        var queue = {
            arr : [],
            leftInput : function (num){
                this.arr.unshift(num);
                this.render();
            },
            rightInput : function (num){
                this.arr.push(num);
                this.render();
            },
            leftOutput : function (){
                if( !this.isEmpty()){
                    alert(this.arr.shift());
                    this.render();
                } else {
                    alert("队列已空！");
                }
            },
            rightOutput : function (){
                if( !this.isEmpty()){
                    alert(this.arr.pop());
                    this.render();
                } else {
                    alert("队列已空！");
                }
            },
            isEmpty : function (){
                return (this.arr.length === 0);
            },
            render : function () {
                wrapper.innerHTML = this.arr.map(function(data){
                   return "<div class='number-item'>" + data + "</div>";
                }).join('');
            }
        };

        function validate (str) {
            var reg = new RegExp("^[0-9]*$"); //是否是整数
            return reg.test(str);
        }

        function init () {
            doc.getElementById('left_in').onclick = function (){
                var val = input.value;
                if ( !validate (val)){
                    alert('请输入合法整数！');
                } else {
                   queue.leftInput(val);
                }
            };
            doc.getElementById('right_in').onclick = function (){
                var val = input.value;
                if ( !validate (val)){
                    alert('请输入合法整数！');
                } else {
                    queue.rightInput(val);
                }
            };
            doc.getElementById('left_out').onclick = function (){
               queue.leftOutput();
            };
            doc.getElementById('right_out').onclick =  function (){
                queue.rightOutput();
            };
        }
        init();
    };
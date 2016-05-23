/**  还没实现可视化显示！！！！
 * Created by unicorn on 2016/5/11.
 * 任务链接：http://ife.baidu.com/task/detail?taskId=19
 基于任务18
 限制输入的数字在10-100
 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
 队列展现方式变化如图，直接用高度表示数字大小
 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来
 */
window.onload = function () {
    var doc = document;
    var a = [2,45,67,12,89,34,53,1,23];
    var input = doc.getElementById('number_input');
    var wrapper = doc.getElementById('wrapper');
    var queue = {
        arr : [],
        leftInput : function (num){
            if (this.arr.length <= 60){
                this.arr.unshift(num);
                this.render();
            } else {
             alert('超出队列限制60！');
            }
        },
        rightInput : function (num){
            if (this.arr.length <= 60){
                this.arr.push(num);
                this.render();
            } else {
                alert('超出队列限制60！');
            }
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
                return  "<div class='number-item' style='height:" + (data * 4) + "px;"+"'>"+data+"</div>";
            }).join('');
        }
    };

    function validate (str) {
        var reg = new RegExp("^[0-9]*$"); //是否是整数
        return reg.test(str);
    }
    function outRange (str) { //是否超出范围
        return (str <= 100 && str >= 10);
    }
    function init () {
        doc.getElementById('left_in').onclick = function () {
            var val = input.value;
            if ( !validate(val) ) {
                alert('请输入整数！');
            }else {
                if ( outRange(val) ) {
                    queue.leftInput(val);

                } else {
                    alert('请输入10-100内整数！');
                }
            }
        };

        doc.getElementById('right_in').onclick = function () {
            var val = input.value;
            if ( !validate(val) ) {
                alert('请输入整数！');
            }else {
                if ( outRange(val) ) {
                    queue.rightInput(val);
                } else {
                    alert('请输入10-100内整数！');
                }
            }
        };
        doc.getElementById('left_out').onclick = function () {
            queue.leftOutput();
        };
        doc.getElementById('right_out').onclick = function () {
            queue.rightOutput();
        };

        doc.getElementById('bubble_sort').onclick = function (){
            //bubbleSort (); //冒泡排序
            quickSort(a); //快速排序
            for (var i = 0; i< 8; i++) {
                console.log(a[i]);
            }
        };
    }
    init();

    function swap (a,b){
        var tmp;
        tmp = a;
        a = b;
        b = tmp;
    }
    function renderSort (){ //动态显示排序过程

    }
    //冒泡排序
    function bubbleSort (){
        var len = queue.arr.length;
        for (var i = 0; i< len; i++){
            for (var j = i+1;  j < len; j++){
                if (queue.arr[i] > queue.arr[j]){ //从小到大排序
                    swap(queue.arr[i], queue.arr[j]);
                   // renderSort();
                }
            }
        }
        for (var i = 0; i< len; i++) {
           console.log(queue.arr[i]);
        }
    }
    //快速排序法
    function quickSort(array){
        function sort(low, high){
            var first = low;
            var last = high -1;
            var flag = array[first];

            if ( low !== high) {

                while(first < last){

                    for(; first < last; last--){
                        if (array[last] < flag) {
                            array[first] = array[last];　
                            first = first + 1;
                            break;
                        }
                    }
                    for( ; first < last; first++){
                        if (array[first] > flag){
                            array[last] = array[first];
                            last = last - 1;
                            break;
                        }
                    }
                }
                array[first] = flag;
                sort(0, first);
                sort(first + 1, high);
            }
        }
        sort(0, array.length);
        return array;
    }


};


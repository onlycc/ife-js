/**
 * Created by only on 16/5/17.
 * http://ife.baidu.com/task/detail?taskId=23
 基于任务22，参考示例图，将二叉树变成了多叉树，并且每一个节点中带有内容
 提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
 当前被遍历到的节点做一个特殊显示（比如不同的颜色）
 每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
 增加一个输入框及一个“查询”按钮，点击按钮时，开始在树中
 以动画形式查找节点内容和输入框中内容一致的节点，找到后
 以特殊样式显示该节点，找不到的话给出找不到的提示。查询过
 程中的展示过程和遍历过程保持一致
 */

var btnGroup = document.getElementsByTagName('button');
var dfs = document.getElementById('dfs');
var bfs = document.getElementById('bfs');
var search = document.getElementById('search');

var treeRoot = document.getElementsByClassName('root')[0];
var treeList = [];
var timer = null;
var speed = 600;

window.onload = function () {
    dfs.onclick = function () {
        reset();
        Tree.DFS(treeRoot);
        render();
    };
    bfs.onclick = function () {
        reset();
        Tree.BFS(treeRoot);
        render();
    };


};

function reset() { //样式初始化
    treeList = [];
    clearInterval(timer);
    document.body.classList.remove('bg-color');
    document.body.classList.remove('found');
}

function render() { //渲染
    var i = 0;
    var len = treeList.length;
    var searchText = search.value.trim();

    if (searchText === treeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "")){
        treeList[i].classList.add('found');
        alert('找到'+searchText);
        clearInterval(timer);
    } else {
        treeList[i].classList.add('bg-color');
    }


    timer = setInterval(function (argument) {
        i++;
        if (i < len) {
            treeList[i-1].classList.remove('bg-color');
            if (searchText === treeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "")){

                treeList[i].classList.add('found');
                clearInterval(timer);
                alert('找到'+searchText);
            } else {
                treeList[i].classList.add('bg-color');
            }

        } else {
            treeList[len-1].classList.remove('bg-color');
            clearInterval(timer);
        }
    },speed);
}

var Tree = {
    DFS : function (t) { //多叉树 深度优先遍历
        if(t){
            treeList.push(t);
            var len = t.children.length;
            for(var i = 0; i < len; i++){
                this.DFS(t.children[i]);
            }
        }

    },
    BFS : function (t) { //多叉树 层次遍历,广度优先遍历
        var cache = []; //暂时存储
        var cur = t;
        treeList.push(t);
        while(cur){
            var len = cur.children.length;
            for(var i = 0; i < len; i++){
                cache.push(cur.children[i]);
                treeList.push(cur.children[i]);
            }

            cur = cache.shift();//将第一个节点去除作为下一层的开始
        }

    }
};




























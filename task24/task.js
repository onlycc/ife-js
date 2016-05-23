/**
 * Created by only on 16/5/17.
 * http://ife.baidu.com/task/detail?taskId=24
 基于任务23，添加节点的选择、增加与删除的功能
 点击某个节点元素，则该节点元素呈现一个特殊被选中的样式
 增加一个删除按钮，当选中某个节点元素后，点击删除按钮，则将该节点及其所有子节点删除掉
 增加一个输入框及一个“添加”按钮当选中某个节点元素后，点击增加按钮，
 则在该节点下增加一个子节点，
 节点内容为输入框中内容，插入在其子节点的最后一个位置
 */

var dfs = document.getElementById('dfs');
var bfs = document.getElementById('bfs');
var del = document.getElementById('del');
var add = document.getElementById('add');


var search = document.getElementById('search');

var treeRoot = document.getElementsByClassName('root')[0];
var treeList = [];
var timer = null;
var speed = 600;

var selectNode;

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

    treeRoot.onclick = function (event) { //点击删除
        var eve = event || window.event;
        var target = eve.target;
        if(eve.target.tagName.toUpperCase() ==='DIV') {
            eve.target.style.backgroundColor = 'pink';
            selectNode = eve.target;
            eve.stopPropagation();
        }
    };
    del.onclick = function () {  //删除选择的节点及其子节点
        if(selectNode){
            var parent = selectNode.parentNode;
            parent.removeChild(selectNode);

        } else {
            alert('请选择要删除的节点!');
        }
    };
    add.onclick = function () {  //在选中的节点后添加新的节点
        var searchText = search.value.trim();
        
        if(!searchText){
            alert('请输入要添加的内容!');
        } else if(!selectNode) {
            alert('请选择要添加的节点!');
        } else {
            var parent = selectNode;
            var newNode = document.createElement('div');
            parent.appendChild(newNode);
            newNode.classList.add('child');
            newNode.innerHTML = searchText;
            selectNode.style.backgroundColor = '';
        }
    }

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



























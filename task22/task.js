/**
 * Created by only on 16/5/17.
 * http://ife.baidu.com/task/detail?taskId=22
 * 参考示例图，在页面中展现一颗二叉树的结构
 提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
 二叉树的遍历算法和方式自定，前序中序后序皆可，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
 当前被遍历到的节点做一个特殊显示（比如不同的颜色）
 每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
 */

var btnGroup = document.getElementsByTagName('button'),
    preBtn = btnGroup[0];
    inBtn = btnGroup[1];
    postBtn = btnGroup[2];
var treeRoot = document.getElementsByClassName('root')[0],
    treeList = [];
var timer = null;
var speed = 600;
window.onload = function () {
    preBtn.onclick = function () {
        reset();
        BinaryTree.preOrder(treeRoot);
        render();
    };
    inBtn.onclick = function () {
        reset();
        BinaryTree.inOrder(treeRoot);
        render();
    };
    postBtn.onclick = function () {
        reset();
        BinaryTree.postOrder(treeRoot);
        render();
    }

};
function reset() { //样式初始化
    treeList = [];
    clearInterval(timer);
    document.body.classList.remove('bg-color');
}

function render() { //渲染
    var i = 0,
        len = treeList.length;

    treeList[i].classList.add('bg-color');

    timer = setInterval(function (argument) {
        i++;
        if (i < len) {
            treeList[i-1].classList.remove('bg-color');
            treeList[i].classList.add('bg-color');
        } else {
            clearInterval(timer);
            treeList[len-1].classList.remove('bg-color');
        }
    },speed);
}

var BinaryTree = {
    preOrder : function (t) { //先序遍历
        if(!(t === null)){
            treeList.push(t);
            this.preOrder(t.firstElementChild);
            this.preOrder(t.lastElementChild);
        }

    },
    inOrder : function (t) { //中序遍历
        if(!(t === null)){
            this.inOrder(t.firstElementChild);
            treeList.push(t);
            this.inOrder(t.lastElementChild);
        }
    },
    postOrder : function (t) { //后序遍历
        if(!(t === null)){
            this.postOrder(t.firstElementChild);
            this.postOrder(t.lastElementChild);
            treeList.push(t);
        }
    }
};



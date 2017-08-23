

var cFlow_Layout = document.getElementById('cascades-flow-layout');
var boxArray = cFlow_Layout.getElementsByClassName('box');

var oneBoxWidth = boxArray[0].offsetWidth;
var cols = Math.floor(document.documentElement.clientWidth/oneBoxWidth);
var cFlow_Layout_Width = cols * oneBoxWidth - 15;
var clientH = document.documentElement.clientHeight || document.body.clientHeight;//浏览器可视高度

cFlow_Layout.style.cssText = 'width:' + cFlow_Layout_Width + 'px';



BuildUi();

window.onload = function () {
	BoxToCascadesFlow();

	window.onscroll = function() {
		if(LoadDataOrNot()){
			BuildUi();
			BoxToCascadesFlow();
		}
	}

}


function LoadDataOrNot() {//判断是否加载数据

	var	lastBox	= boxArray[boxArray.length - 1];

	var lastBoxTop = lastBox.offsetTop;
	var lastBoxH = lastBox.offsetHeight;
	var h = lastBoxTop + Math.floor(lastBoxH / 2);//最后一个盒子中线距离浏览器顶部的距离

	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;//滚动条滚动的距离
	var scrollh = clientH + scrollH;

	return (scrollh > h) ? true : false;
}

function BuildUi() {//将数据写入页面

	var data = GetData();
	var parentNode = cFlow_Layout.firstElementChild;

	for(var i = 0; i < data.pictures.length; i++){
		
		var box = document.createElement('div');
		var pic = document.createElement('div');
		var image = document.createElement('img'); 

		parentNode.appendChild(box);
		box.appendChild(pic);
		pic.appendChild(image);

		box.className = 'box';
		pic.className = 'pic';
		image.src = 'images/' + data.pictures[i].src;
	}

}



function BoxToCascadesFlow() {//实现瀑布流布局
	var heightArray = [];
	for(var i = 0; i < boxArray.length; i++){

		if(i < cols){
			heightArray.push(boxArray[i].offsetHeight);
			/*heightArray[i] = boxArray[i].offsetHeight;*/
		}
		else{
			var minHeight = Math.min.apply(null,heightArray);
			var index = heightArray.indexOf(minHeight);
			boxArray[i].style.position = 'absolute';
			boxArray[i].style.top = minHeight + 'px';
			boxArray[i].style.left = boxArray[index].offsetLeft + 'px';

			heightArray[index] = minHeight + boxArray[i].offsetHeight;
		}
	}			
}
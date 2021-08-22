// ======================== 一些工具方法 ======================== 

export default {
	// 删除数组某个元素
	arrayDelete: function(arr, item){
		var index = arr.indexOf(item);
		if (index > -1) {
			arr.splice(index, 1);
		}
	},
	
	//执行一个函数, 解决layer拉伸或者最大化的时候，iframe高度不能自适应的问题
	solveLayerBug: function(index) {
		var selected = '#layui-layer' + index;
		var height = $(selected).height();
		var title_height = $(selected).find('.layui-layer-title').height();
		$(selected).find('iframe').css('height', (height - title_height) + 'px');
		// var selected = '#layui-layer' + index;
		// var height = $(selected).height();
		// var title_height = $(selected).find('.layui-layer-title').height();
		// $(selected).find('iframe').css('height', (height - title_height) + 'px');
	},
	
	// 全屏 
	fullScreen: function(){
		if(document.documentElement.RequestFullScreen){
			document.documentElement.RequestFullScreen();
		}
		//兼容火狐
		if(document.documentElement.mozRequestFullScreen){
			document.documentElement.mozRequestFullScreen();
		}
		//兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
		if(document.documentElement.webkitRequestFullScreen){
			document.documentElement.webkitRequestFullScreen();
		}
		//兼容IE,只能写msRequestFullscreen
		if(document.documentElement.msRequestFullscreen){
			document.documentElement.msRequestFullscreen();
		}
	},
	
	// 退出全屏
	fullScreenNormal: function() {
		if(document.exitFullScreen){
			document.exitFullscreen()
		}
		//     		//兼容火狐
		//     		console.log(document.mozExitFullScreen)
		if(document.mozCancelFullScreen){
			document.mozCancelFullScreen()
		}
		//     		//兼容谷歌等
		if(document.webkitExitFullscreen){
			document.webkitExitFullscreen()
		}
		//     		//兼容IE
		if(document.msExitFullscreen){
			document.msExitFullscreen()
		}
	},	
}








////////////////////////////////////////
//　SCRIPT
////////////////////////////////////////
$(function(){
	$('body').append('<a href="javascript:void(0);" id="fixedTop">▲</a>');
	var fixedTop = $('#fixedTop');
	fixedTop.on('click',function(){
		$('html,body').animate({scrollTop:'0'},500);
	});
	$(window).on('load scroll resize',function(){
		var showTop = 100;
		if($(window).scrollTop() >= showTop){
			fixedTop.fadeIn('slow');
		} else if($(window).scrollTop() < showTop){
			fixedTop.fadeOut('slow');
		}
	});
});

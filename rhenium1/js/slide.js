$(document).ready(function()
{
	var totWidth=0;
	var positions = new Array();
	
	$('.slide').each(function(i){
		positions[i]= totWidth;
		var that = this;

		//var width = $(this).clientWidth;
		var width = 750;

		totWidth += width;
		if(!$(this).width())
		{
			alert("Please, fill in width & height for all your images!");
			return false;
		}
		
	});
	
	$('#slides').width(totWidth + 100);

	$('#menu ul li a').click(function(e,keepScroll){
			$('li.menuItem').removeClass('act').addClass('inact');
			$(this).parent().removeClass('inact');
			$(this).parent().addClass('act');
			
			var pos = $(this).parent().prevAll('.menuItem').length;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},400);
			e.preventDefault();
	});
	
	$('#menu ul li.menuItem:eq(1)').addClass('act').siblings().addClass('inact');
});
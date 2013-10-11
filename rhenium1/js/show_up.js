var calender_select;
var today = new Date();

$(document).ready(function()
{
	$("#menu").click(function(){
		show_menu();
	});
	
	window.onmousewheel = function(event)
	{
		var scrollLow = 0;
		var total_height = 0
		$(".user_timeline_items").children(".divide").each(
		function(i)
		{
		total_height += $(this).height();
		});
	
		var scrollTop_now = $(".user_weibo").scrollTop() + 100;
		
		$(".user_timeline_items").children(".divide").each(
		function(i)
		{
			scrollUp = scrollLow + $(this).height();
			
			if(scrollTop_now >= scrollLow && scrollTop_now < scrollUp)
			{
				$(".mouth").css("border-left", "6px solid #b0d4de");
				var select_mouth = ".mouth" + ":eq(" + i +")";
				$(select_mouth).css("border-left", "6px solid rgba(0, 68, 204, 0.81)");
				
				$(".year_number").css("background", "rgba(0, 0, 0, 0.2)");
				$(select_mouth).parent().children("a:first").css("background", "rgba(255, 102, 0, 0.7)");
				
				return false;
			}
			else
			{
				if(scrollUp < total_height)
				{
					scrollLow += $(this).height();
					scrollUp += $(this).height();
				}
				else
				{
					return false;
				}
			}
		});
	};

	css_no_slect = $(".inner_options").children("a:first");
	word_over(css_no_slect);
	word_out(css_no_slect.siblings().not(".calender"));

	var word_color = 0;

	$(".inner_options").children("a").click(function(){
		var present_selector = $(this)[0];
		var selector = $(".inner_options").children(".select");
		word_over($(this));

		if (present_selector != selector[0])
		{
			word_out($(this).siblings().not(".calender").not(".select"));
		}
		word_color = 1;
	});

	$(".inner_options").children("a").mouseenter(function(){
		//console.log("enter over" + $(this).css("color"));
		if ($(this).css("background-color") != "rgb(255, 255, 255)")
		{
			word_color = 1;
		}

		else{
			word_over($(this));			
		}

	});

	$(".inner_options").children("a").mouseleave(function(){
		if (word_color == 0) {
			word_out($(this));
		}
		else
		{
			word_color = 0;
		}
	})

	$(".icon_calender").click(function(e){
		var coordinate = $(this).offset();
		var top = coordinate.top + $(this).height() +10;
		var left = coordinate.left;
		var calender = $(".div_calender");
		calender.css("top", top);
		calender.css("left", left);
		calender_select = $(this).next();
		$(".cal_year").val(today.getFullYear());
		$(".cal_month").val(today.getMonth() + 1);
		$(".cal_day").val(today.getDate());

		var value = today.getFullYear() + "/";
		var v_month = parseInt(today.getMonth()) + 1;
		if(v_month < 10) value = value + "0" + v_month + "/";
		else value = value +  v_month + "/";
		value = value + today.getDate();
		calender_select.val(value);

		if(calender.css("display") == "none") calender.toggle();
		return false;
	});

	$(".close").click(function(){
		$(this).parent().parent().toggle();
	});

	$(".cal_up, .cal_down").click(function(){
		var row = $(this).parent().prevAll().length;
		var col = $(this).prevAll().length;
		
		add_or_sub(row, col);
	});

	$(".cal_year, .cal_month, .cal_day").click(function(){
		var pre_mousewheel = $(this);
		console.log($(this));
		console.log($(this)[0]);
		$(this)[0].onmousewheel = function(event)
		{
			if($(".div_calender").css("display") != "none")
			{
				var row;
				if (parseInt(event.wheelDelta) > 0) row = 0;
				else row = 2;

				var class_name = pre_mousewheel[0].className;

				if(class_name == "cal_year") col = 0;
				else if(class_name == "cal_month") col = 2;
				else if(class_name == "cal_day") col = 4;

				add_or_sub(row, col);
				return false;
			}
			else return true;
		}
	});

	$("#main").click(function(event){
		if($(".div_calender").css("display") == "none") return true;
		else{
			$(".div_calender").toggle();
		}
	})
});

function word_over(selector)
{
	selector.css("color","white");
	selector.css("background","#039");
}

function word_out(selector)
{
	selector.css("color","#669");
	selector.css("background","white");
}

function show_menu()
{		
	var display = $(".slide_up").css("display");
	if(display == "none") $(".menu_items").slideDown();
	else $(".menu_items").slideUp();
	
	$(".slide_down").toggle();
	$(".slide_up").toggle();
}

function show_number()
{
	$(".timeline_item").each(function(i){
		$(this).children(".mod").children(".number").text(i+1);
					
		$(this).mouseover(function(){
			$(this).children(".mod").children(".number").toggle();
		});
		
		$(this).mouseout(function(){
			$(this).children(".mod").children(".number").toggle();
		});
	});
}

function cal_add_sub(selector, limit, option)
{
	var value = parseInt(selector.val());
	var new_value;

	if(value != "")
	{
		if(limit == 0)
		{
			if(value == today.getFullYear()) 
			{
				if (option == 1) return;
				else new_value = value - 1;
			}

			else{
				if(option == 1) new_value = value + 1;
				else new_value = value - 1;
			} 
		}

		else
		{
			if(limit == 12)
			{
				if($(".cal_year").val() == today.getFullYear())
				{
					limit = parseInt(today.getMonth() + 1);
				}
			}

			else
			{
				if(($(".cal_year").val() == today.getFullYear()) && ($(".cal_month").val() == parseInt(today.getMonth() + 1)))
					limit = parseInt(today.getDate());
			}

			if(option == 1)	new_value = (value + 1) % (limit + 1);
			else new_value = (value - 1) % (limit + 1);
		}

		if(new_value == 0)
		{
			if(option == 1) new_value = 1;
			else new_value = limit;
		} 
		
		selector.val(new_value);
		if(($(".cal_year").val() == today.getFullYear()) && ($(".cal_month").val() == (parseInt(today.getMonth()) + 1)) && (parseInt($(".cal_day").val()) > parseInt(today.getDate())))
		{
			$(".cal_day").val(today.getDate());
		}
	}
	else alert("年月日不能为空！");

	update_time();
}

function add_or_sub(row, col)
{
	if(row == 0 && col == 0) cal_add_sub($(".cal_year"), 0, 1);	/*年*/
	else if(row == 2 && col == 0) cal_add_sub($(".cal_year"), 0, 0)	/*年*/
	else if(row == 0 && col == 2) cal_add_sub($(".cal_month"), 12, 1);	/*月*/
	else if(row == 2 && col == 2) cal_add_sub($(".cal_month"), 12, 0);	/*月*/
	/*日*/
	else if (col == 4)
	{
		var day = new Date($(".cal_year").val() , $(".cal_month").val(), 0);

		if(row == 0) cal_add_sub($(".cal_day"), day.getDate(), 1);

		else if(row == 2) cal_add_sub($(".cal_day"), day.getDate(), 0);
	}
}

function update_time()
{
	var value = $(".cal_year").val() + "/";
	var v_month = parseInt($(".cal_month").val());

	if(v_month < 10) value = value + "0" + v_month;
	else value = value + v_month;

	var v_day = parseInt($(".cal_day").val());
	if(v_day < 10) value = value + "/0" + v_day;
	else value = value + "/" + v_day;

	calender_select.val(value);
}

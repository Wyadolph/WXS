var page_place_timeline = 1;
var no_more = 1;
var big_tag = "";
var small_tag = "";
var small_tag_count = 0;
var feature = 0;
/*feature 0,无筛选；1，仅文字；2，仅图片*/
var time = 0;

function update_timeline()
{
	start_time = $(".start_time").val();
	end_time = $(".end_time").val();

	$.getJSON("../php/update_ajax.php",
	{
		oauth_token: oauth_token,
		user_id: user_id,
		page: page_place_timeline,
		feature:feature,
		time:time,
		start_time: start_time,
		end_time:end_time
	},
	function (data)
	{
		$(".loadingAnimation").remove()
		console.log(data);
		
		if(data.weibo_items.length != 0)
		{
			$.each(data.weibo_items,
			function(i, item)
			{
				var new_big_tag = item.big_tag;

				if(big_tag != new_big_tag)
				{
					big_tag = new_big_tag;
					var add_tag = "<div class='big_tag " + big_tag +"'><a class='big_tag_number'>"+ big_tag +"</a></div>";
					$(".navigator:eq(1)").append(add_tag);
				}

				var new_small_tag = item.small_tag;
				
				if(small_tag != new_small_tag)
				{
					small_tag = new_small_tag;
					small_tag_count = 1;
					var add_tag = "<div class='small_tag " + new_small_tag +"'><p class='small_tag_number'>"+ "<a href='#" + "divide_" + new_big_tag +"_" + new_small_tag + "'>" + new_small_tag + "</a>" +"</p><p class='small_tag_count'>" + small_tag_count + "条</p></div>";
					$(".navigator:eq(1)").children("." + new_big_tag).append(add_tag);
					var add_divide = "<div class='divide'><div id='divide_"+ big_tag + "_" + small_tag +"'><p class='divide_head'>" + big_tag + " " + small_tag + "</p></div></div>";
					$(".timeline_items:eq(1)").append(add_divide);
				}
				else
				{
					small_tag_count++;
					var change = small_tag_count +"条";
					$(".navigator:eq(1)").children("." + new_big_tag).children("."+ new_small_tag).children(".small_tag_count").text(change);
				}
				
				var find_time = "divide_"+ big_tag + "_" + small_tag;
				$(".timeline_items:eq(1)").children(".divide:last").children("#"+ find_time).append(item.html);
			});
		}
		
		console.log(page_place_timeline);

		page_place_timeline++;
		
		$(".see_more").text("更多");
		
		if((page_place_timeline - 1) * 20 >= data.total_number) 
		{
			$(".see_more").text("没有更多了o(╯□╰)o");
			no_more = 0;
		}

		if(data.weibo_items.length == 0 && no_more == 1)
			click_update();

		if(no_more == 0 && $(".timeline_items").text() == "") $(".timeline_items").append("<p class='nomore'>←_← 没有符合条件的微博 o(╯□╰)o 试试其他功能吧 →_→</p>")

		show_number();	
		
		var clicked = 0;
		$(".small_tag_number").click(
		function()
		{
			clicked = 1;
			$(".small_tag").css("border-left", "6px solid #b0d4de");
			$(this).parent().css("border-left", "6px solid rgba(0, 68, 204, 0.81)");
			
			$(".big_tag_number").css("background", "rgba(0, 0, 0, 0.2)");
			$(this).parent().parent().children("a:first").css("background", "rgba(255, 102, 0, 0.7)");
		});
		
		var big_tag_colored;
		
		$(".big_tag_number").mouseenter(function()
		{
			big_tag_colored = $(this).css("background-color");
		
			if(big_tag_colored == "rgba(0, 0, 0, 0.2)")
			{
				$(this).css("background", "rgba(255, 102, 0, 0.7)");
			}
		});
		
		$(".big_tag_number").mouseleave(function()
		{
				if(big_tag_colored == "rgba(0, 0, 0, 0.2)")
				{
					$(this).css("background", "rgba(0, 0, 0, 0.2)");
				}
		});
		
		var small_tag_colored;
		
		$(".small_tag").mouseenter(function()
		{
			small_tag_colored = $(this).css("border-left-color");
			
			if(small_tag_colored == "rgb(176, 212, 222)")
			{
				$(this).css("border-left-color", "rgba(0, 68, 204, 0.81)");
			}
		});
		
		$(".small_tag").mouseleave(function(){
			if(small_tag_colored == "rgb(176, 212, 222)")
			{
				if(clicked == 0)	
					$(this).css("border-left-color", "#b0d4de");				
				else 
					clicked = 0;
			}
		});		
	});
}

$(document).ready(function ()
{
	$(".timeline").prepend("<img src='../images/loadingAnimation.gif' class='loadingAnimation'/>");
	update_timeline();

	$(".see_more, .no_select, .words_only, .photos_only").click(function(){
		var name = $(this)[0].className;
		if(name == "no_select" || name == "words_only" || name == "photos_only")
		{
			clean_weibo();
			if(name == "no_select") feature = 0;
			else if(name == "words_only") feature = 1;
			else if(name == "photos_only") feature = 2;
		}
		click_update();
		});


	$(".select").click(function(){
		if($(this).text() == "时间筛选")
		{
			start_time = $(".start_time").val();
			end_time = $(".end_time").val();

			if(start_time == "" || end_time == ""){
				if(start_time == "" && end_time == "") alert("请选择起始和截止时间！");
				else if(start_time == "") alert("请选择起始时间！");
				else if(end_time == "") alert("请选择截止时间！");

				word_out($(this));
				return;			
			}
			else{
				if(end_time < start_time) 
				{
					alert("截止时间不能小于起始时间！");
					word_out($(this));
					return;
				}
			}

			clean_weibo();
			$(this).text("点击取消");
			time = 1;
			click_update();	
		}
		else{
			clean_weibo();
			$(this).text("时间筛选");
			time = 0;
			word_out($(this));
		}
	})
});

function clean_weibo()
{
	$(".timeline_items").empty();
	$(".navigator").empty();

	page_place_timeline = 1;
	$(".see_more").text("更多");
	no_more = 1;
	big_tag = "";
	small_tag = "";
}

function click_update(){
	if(no_more == 1)
	{
		$(".timeline").prepend("<img src='../images/loadingAnimation.gif' class='loadingAnimation'/>");
		$(".see_more").text("稍等哦亲。。。");
		
		update_timeline();
	}
	else alert("没有更多了哦！");
}

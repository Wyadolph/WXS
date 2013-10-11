<?php
function show_weibo($timeline, $feature, $time, $start_time, $end_time, $oauth_token)
{
	if(is_array($timeline))
	{
		if($timeline)
		{
			$items_tmp = array();
			$items = array();

			foreach($timeline['statuses'] as $timeline_item)
			{
				if($feature == 1)
				{
					if($timeline_item['thumbnail_pic'])
						continue;
				}

				else if($feature == 2)
				{
					if(!($timeline_item['thumbnail_pic']))
						continue;
				}

				$year = substr($timeline_item['created_at'], 26, 4);
				$month = change_month(substr($timeline_item['created_at'], 4, 3));
				$day = substr($timeline_item['created_at'], 8, 2);
				$hour = substr($timeline_item['created_at'], 11, 2);
				$minute = substr($timeline_item['created_at'], 14, 2);

				if($time == 1)
				{
					if(strlen($month) == 1)
						$time_select = $year ."/0" . $month. "/" .$day;
					else
						$time_select = $year ."/" . $month. "/" .$day;

					if($start_time > $time_select || $end_time < $time_select)
					{
						continue;
					}	
				}
				
				$item = "";
				$item .=  "<div class='timeline_item'>";
				$item .=  "<div class='mod'>";
					$item .=  "<div class = 'head'>";
						$item .=  "<a href='http://weibo.com/". $timeline_item['user']['id'] ."' target='_blank' title='". $timeline_item['user']['screen_name']."'><img src='".$timeline_item['user']['profile_image_url']."' title='".$timeline_item['user']['screen_name']."' target='_blank'> </a>";
					$item .=  "</div>";
						$item .=  "<div class='number'></div>";
					$item .=  "<div class = 'body'>";
						$item .=  "<p class='text'>";
							$item .=  "<a  class='name' href='http://weibo.com/". $timeline_item['user']['id'] ."' target='_blank' title=''".$timeline_item['user']['screen_name']."'> ".$timeline_item['user']['screen_name']."</a>";
							$item .=  " : " ;
							$item .=  "<a>".$timeline_item['text']."</a>";
						$item .=  "</p>";
						$item .=  "<div class='attachments'>";
						if($timeline_item['thumbnail_pic'])
						{
						$item .=  "<a href='".$timeline_item['original_pic']."' target='_blank'><img class='image' src='".$timeline_item['thumbnail_pic']."title='点击查看大图'></a>";
						}
						$item .=  "</div>";
						$item .=  "<div class='actions'>";
							$item .=  "<p>";
							$big_tag = substr($timeline_item['created_at'],26 ,5);
							$small_tag = $month ."月";
								$item .=  "<span title='". $timeline_item['created_at']."'><a class='date ".$date_tmp ."'>";
								$item .= test_time($year, $month, $day, $hour, $minute) . "</a></span><span class='source'> 来自:".$timeline_item['source']."</span>";
								$item .= "<span class='comment'><a class='comment_a' href='". "http://api.weibo.com/2/statuses/go?uid=".$timeline_item['user']['id']."&access_token=".$auth_token . "&id=".$timeline_item['id']."' target='_blank'>评论(".$timeline_item['comments_count'].")</a>";
								$item .=  "<a class='lucky'><img src='./image/lucky.jpg'>缘分</a></span>";
							$item .=  "</p>";
						$item .=  "</div>";
						$item .=  "<div class='others'></div>";
					$item .=  "</div>";
				$item .=  "</div>";
			$item .=  "</div>";
			$items_tmp = array('html' => $item, 'big_tag' => $big_tag, 'small_tag' => $small_tag);
			array_push($items, $items_tmp);
			}
			$json = array('weibo_items' => $items, 'total_number' => $timeline['total_number']);
			echo json_encode($json);
		}
		else echo  "no more!";
	}
	else  echo "show_weibo error!";
}

function test_time($year, $month, $day, $hour, $minute)
{
	if(strlen($month) == 1) 
		$time_test = $year."/0".$month."/".$day;
	else $time_test = $year ."/" . $month ."/".$day;

	$before_before_time = date("Y/m/d", mktime(0, 0, 0, date("m"),date("d") - 2,date("Y")));
	$before_time = date("Y/m/d", mktime(0, 0, 0, date("m"),date("d") - 1,date("Y")));
	$present_time = date("Y/m/d", mktime(0, 0, 0, date("m"),date("d"),date("Y")));

	if($time_test == $present_time) return "今天 ";
	else if($time_test == $before_time) return "昨天 ";
	else if($time_test == $before_before_time) return "前天 ";
	else return $year ."年". $month ."月". $day ."日" ." " . $hour . "时". $minute ."分";
}

function change_month($month)
{
	if($month == "Jan") return "1";
	else if($month == "Feb") return "2";
	else if($month == "Mar") return "3";
	else if($month == "Apr") return "4";
	else if($month == "May") return "5";
	else if($month == "Jun") return "6";
	else if($month == "Jul") return "7";
	else if($month == "Aug") return "8";
	else if($month == "Sep") return "9";
	else if($month == "Oct") return "10";
	else if($month == "Nov") return "11";
	else if($month == "Dec") return "12";
}
?>
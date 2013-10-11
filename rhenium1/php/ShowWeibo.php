<?php
global $status_item;
global $count;
function  GetWeibo($ms)
{
		$count = 0;
		if( is_array( $ms['statuses'] ) )
		{
			foreach( $ms['statuses'] as $item )
			{

				if(is_array( $item['geo']))
				{		
				$ori_img = $item['original_pic'];
				$coordinates=$item['geo']['coordinates'];
				$time = $item['created_at'];
				$zhuye ="http://weibo.com/".$item['user']['id'];
				$yonghuming =$item['user']['name'];
				$touxiangsrc = $item['user']['profile_image_url'];
				$text = addcslashes($item['text'], '"');;

				$status_item['text'][$count] = $text;
				$status_item['ori_img'][$count] = $ori_img;
				$status_item['time'][$count] = $time;
				$status_item['zhuye'][$count] =$zhuye;
				$status_item['yonghuming'][$count] =$yonghuming;
				$status_item['touxiangsrc'][$count] = $touxiangsrc;
				$status_item['lat'][$count] = $coordinates[0];
				$status_item['lng'][$count] = $coordinates[1];
				$count++;

				}
			}		
		}

	return $status_item;
}
	
function  ShowWeibo($items)
{
	echo "<div class=\"stream-items\" 
style=\"overflow:scroll;
	 height:250px;
	 width:750px;
	 cursor:default; 
	 margin: 10px 0 0; 
	 display: block; 
	 color:#444\">";
	 
	 $length = sizeof($items['zhuye']);
	 for ($count =0;  $count < $length;$count++) 
	{
			$s = "";
			$s1 = "";
			$s2 = "";
			$s3 = "";
			$s4 = "";
			$s5 = "";
			$s6 = "";
			
				$s1 = "<div class=\"status-item\" 
				style=\"color: #333;
				margin-bottom: 20px;
				padding: 0;
				display: 
				block;\">";

					$s2 = "
						<div class = \"mod\" style=\"margin: 0;
							padding-bottom: 12px;
							position: relative;
							width: auto;
							padding: 0;
							display: block;
							content: ' 0020';
							display: block;
							clear: both;\">
							<div class=\"head\" style=\"float: left;
								margin: 3px 15px 0 0;
								width: 48px;
								height: 48px;
								padding: 0;
								display: block;\">
										<a href=\"".$items['zhuye'][$count]."\" 
										target=\"_blank\"
										title=\"". $items['yonghuming'][$count] ."\" 
										style=\"color: #128C66;
										text-decoration: none\">
										<img title=\"". $items['yonghuming'][$count] ."\" 
										width=\"50\" 
										height=\"50\" 
										src=\"" . $items['touxiangsrc'][$count] ."\" 
										target=\"_blank\"
										style=\"display: block;
										border: 0;
										width: 50px;height: 50px;\">
										</a>
							</div>
							<div class=\"body\" style=\"border-bottom: 1px solid #EEE;
								overflow: hidden;
								padding-bottom: 14px;
								zoom: 1;margin: 0;
								padding: 0;
								display: block;\">
									<p class=\"text\"
										style=\"margin: 0 0 5px 0;
										word-wrap: break-word;
										margin-right:20px;
										display: block;\">
										<a href=\"" . $items['zhuye'][$count]. "\"
										target=\"_blank\"
											style=\"word-wrap: break-word;
											color: #26A2DA;
											cursor: auto;
											text-decoration:none\">
											". $items['yonghuming'][$count] ."</a>
											:
										<a style=\"word-wrap: break-word;
											cursor: auto;
											font-style: normal;
											font-weight: normal;
											font-size: 15px;
											line-height: 22px;
											color: #444;\">";
											
										
										$s3 = $items['text'][$count] ;
										$s4 = "</a>
									</p>
									<div  class=\"attachments\"
										style=\"padding-left: 24px;
										overflow: hidden;
										zoom: 1;margin: 0;
										padding: 0;
										display: block;\">";
										
										
												if($items['ori_img'][$count])
												{
												$s5 =	"<a href=\"". $items['ori_img'][$count] ."\" target=\"_blank\">
												<img class=\"bigcursor\" 
													src=\"".$items['ori_img'][$count]. "\" style=\"width: 60px; height: 60px;\">
													</a>";
												
												}
									
									
									
									$s6 =	"</div>
									<div class=\"actions\"
									style=\"padding-left: 24px;
									margin: 5px 0;
									color: #AAA;
									padding: 0;
									display: block;\">
										<p style=\"padding: 3px 0 0;
											font-size: 12px;
											color: #999;
											cursor: default;
											margin: 0;
											display: block;\">
											<span style=\"float: right;
												display: inline;
												font-size: 12px;
												color: #999;
												cursor: default;
												margin-right:20px;
												line-height: 22px;\">	
													<a 
													href=\"#\"
													class=\"YiDong\"
													style=\"text-decoration:none;\"
													onclick=\"SendFrom(".$items['lat'][$count] .",". $items['lng'][$count].")\">
													缘分轨迹</a>
											</span>
											<a class=\"date\" shape=\"margin: 0 10px 0 0;
												word-wrap: break-word;
												color: #8EBED0;
												text-decoration: none;
												cursor: auto;\">" . $items['time'][$count]. "</a> 
										</p>
									</div>
									<div class=\"others\">
									
									</div>
							</div>
						</div>
					</div>
				";
				
			
				$s = $s1 . $s2 . $s3 . $s4 . $s5 . $s6;		
				echo $s;
	 }
	 echo "</div>";
}

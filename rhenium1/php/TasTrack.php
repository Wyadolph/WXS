<?php
function FriendsTrack($friends)
{
if (is_array($friends))
{

echo "
	   <h2 id ='h2'>
        我关注的人
            &nbsp;·&nbsp;·&nbsp;·
            <span class='pl'>&nbsp;(
                    <a >全部".$friends['total_number']."</a>&nbsp;
                ) </span>
    </h2>";
	
	
		echo "
		<dl class='obu'>
		<dt>
			<a href='"."http://weibo.com/".$_SESSION['user']['id']."' target='_blank' class='nbg'>
			<img src='".$_SESSION['user']['profile_image_url']."' target='_blank'  class='m_sub_img' alt='".$_SESSION['user']['name']."'>
			</a>
		</dt>
		<dd>
			<a  onclick=\"TasTrack(".$_SESSION['user']['id'].");openShutManager(this,'box4',false,'TA的轨迹','展开时间轴');openShutManager(this,'box5',false,'展开时间轴','TA的轨迹')\">".$_SESSION['user']['name']."</a>
		</dd>
		</dl>
		";
				echo "<br clear='all'>";
								
	$count = 0;
	for($i = 0; $i < $friends['total_number']; $i++)
	{
	echo "
		<dl class='obu'>
		<dt>
			<a href='"."http://weibo.com/".$friends['users'][$i]['id']."' target='_blank' class='nbg'>
			<img src='".$friends['users'][$i]['profile_image_url']."' target='_blank'  class='m_sub_img' alt='".$friends['users'][$i]['name']."'>
			</a>
		</dt>
		<dd>
			<a  onclick=\"TasTrack(".$friends['users'][$i]['id'].");openShutManager(this,'box4',false,'TA的轨迹','展开时间轴');openShutManager(this,'box5',false,'展开时间轴','TA的轨迹')\">".$friends['users'][$i]['name']."</a>
		</dd>
		</dl>
		";
			if ($count == 8)
			{
			echo "
								<br clear='all'>
								";
			}					
			$count = ($count + 1) % 9;
	}
}
}
?>
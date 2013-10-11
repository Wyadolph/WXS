<?php
session_start();

include_once( './php/config.php' );
include_once( './php/saetv2.ex.class.php' );
//include_once('./php/saemysql.class.php');
include_once( './php/AuthOrNot.php' );
include_once( './php/ChromePhp.php' );
include_once('./php/ShowWeibo.php');
//include_once('./php/navigation.php');
include_once('./php/style.php');
include_once('./php/SendWeibo.php');
//include_once('./php/SendFrom.php');
//include_once('./php/LuckOfTrack.php');
include_once('./php/API.php');
//include_once('./php/Thread.php');
include_once('./php/DB.php');
include_once('./php/TasTrack.php');


$c = AuthOrNot();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>授权后的页面</title>
<script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>
<script type="text/javascript" src="./js/googlemap.js"></script>
<link rel="stylesheet" type="text/css" href="./css/Slide.css">
<link rel="stylesheet" type="text/css" href="./css/PopBox.css">
<link rel="stylesheet" type="text/css" href="./css/style.css">
<link rel="stylesheet" type="text/css" href="./css/friends.css">
<link type="text/css" rel="stylesheet" href="./css/calendar.css" >
<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript" src="./js/script.js"></script>
<script type="text/javascript" src="./js/jquery-1.4.4.js"></script>
<script type="text/javascript" src="./js/jquery.dialog.js"></script>
<script type="text/javascript" src="./js/PopBox.js"></script>
<script type="text/javascript" src="./js/LuckOfTrack.js"></script>
<script type="text/javascript" src="./js/jquery.MaxInput.js"></script>
<script type="text/javascript" src="./js/OpenShut.js"></script>
<script type="text/javascript" src="./js/API.js"></script>
<script type="text/javascript" src="./js/TasTrack.js"></script>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="./js/calendar.js" ></script>  
<script type="text/javascript" src="./js/calendar-zh.js" ></script>
<script type="text/javascript" src="./js/calendar-setup.js"></script>

<script type="text/javascript">
<?php
$user = user();
$_SESSION['user'] = $user['statuses'][0]['user'];
$_SESSION['user_id'] = $user['statuses'][0]['user']['id'];
$user_id = $_SESSION['user_id'];
$ms = place_user_timeline($user_id);
$_SESSION['items'] = GetWeibo($ms);
$friends = friendship_friends($user_id);
$_SESSION['friends'] = $friends;

$s = json_encode($_SESSION['items']['text']);
$ori_img = json_encode($_SESSION['items']['ori_img']);
$time = json_encode($_SESSION['items']['time']);
$zhuye = json_encode($_SESSION['items']['zhuye']);
$yonghuming = json_encode($_SESSION['items']['yonghuming']);
$touxiangsrc = json_encode($_SESSION['items']['touxiangsrc']);
$lat = json_encode($_SESSION['items']['lat']);
$lng = json_encode($_SESSION['items']['lng']);



/*数据库操作*/

$SqlCount = sizeof($_SESSION['items']['text']);
for ($i = 0; $i < $SqlCount; $i++)
{
	
	InserIntoDB(
	addslashes($_SESSION['items']['text'][$i]), $_SESSION['items']['ori_img'][$i],
	$_SESSION['items']['time'][$i], $_SESSION['items']['zhuye'][$i],
	$_SESSION['items']['yonghuming'][$i], $_SESSION['items']['touxiangsrc'][$i],
	$_SESSION['items']['lat'][$i], $_SESSION['items']['lng'][$i]);
}

/*用户*/
echo "var s = " .$s.";\n";
echo "var ori_img = " .$ori_img.";\n";
echo "var time = " .$time.";\n";
echo "var zhuye = " .$zhuye.";\n";
echo "var yonghuming = " .$yonghuming.";\n";
echo "var touxiangsrc = " .$touxiangsrc.";\n";
echo "var lat = " .$lat.";\n";
echo "var lng = " .$lng.";\n";
echo "var access_token = '" .$_SESSION['oauth2']['oauth_token']."';\n";
echo "var  friends = " .json_encode($_SESSION['friends']['users']).";\n";
?>

function SendFrom(lat, lng)
{
	nearby_timeline(lat, lng, access_token);
}


</script>
</style>
</head>
<body  onload="initialize(s, ori_img,time,zhuye,yonghuming,touxiangsrc,lat, lng);animateCircle()">
<body>

  <div id="gallery">
	
    <div id="slides" style="margin-left: -760px;height:600px;overflow:hidden;">
		<div class="slide" style="width:760px;height:600px;float:left;" name="#a">
		<div id="LuckOfTrack" style="width: 750px; height: 250px;">
		</div>
		<div id = "YuanFen">
		</div>
		</div>
	<div class="slide" style="width:760px;left:0px;position: relative;top:0px;" name="#b">
			<div id="map_canvas" style="width: 750px; height: 250px;"></div>
			
			    
				<div id="Send" style="height:188px margin-top=10px">
			<?php
			SendWeibo($c);
			//SendFrom();
			 ?>	</div>
<div id="buttons" style="margin-top:10px">
<button onclick="openShutManager(this,'box4',false,'TA的轨迹','展开时间轴');openShutManager(this,'box5',false,'展开时间轴','TA的轨迹')">TA的轨迹</button>
<div id="time" style="position: relative;top: -25px;left: 150px;">
从：<input type="text" id="StartTime" name="StartTime" 
onclick="return showCalendar('StartTime', 'y.mm.dd');"  style="width:120px"/>
到：<input type="text" id="EndTime" name="EndTime" 
onclick="return showCalendar('EndTime', 'y.mm.dd');"  style="width:120px"/>
<div id="TimeSelect" style="position: relative;top: -25px;left: 330px;">
<button onclick="getTime(<?php echo $_SESSION['user_id']?>)">时间筛选</button>
</div>
</div>
<button onclick="SendMap()" style="position: relative;top: -115px;left: 350px;">当前地图</button>
			<div id="box4" style="position: relative;top: -60px;">
			<?php	ShowWeibo($_SESSION['items']);?>
			</div>
</div>
		<div id ="box5" style="display:none;height:250px;overflow:scroll;position: relative;top: -80px;">
		<?php 
		FriendsTrack($_SESSION['friends']);?>
		</div>    
    </div>
    <div id="menu" style="float:right;z-index:999;position: absolute;left: 720px;top: 540px;">
		<ul>
			<li class="fbar inact" style="list-style:none">&nbsp;</li>
			<li class="menuItem inact act" style="display:none"><a href="">1</a></li>
			<li class="menuItem inact" style="list-style:none"><a href="" style="text-decoration:none">
			<img src="./image/home.png"/ title="首页"></a></li>
		</ul>
    </div>
	
</div>

</body>
</html>

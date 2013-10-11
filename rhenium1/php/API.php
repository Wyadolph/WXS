<?php

function user_timeline()
{
	$getjson = 'https://api.weibo.com/2/statuses/user_timeline.json?page=1&count=100&feature=1&access_token='.$_SESSION['oauth2']['oauth_token'];
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL,$getjson);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
	$content = curl_exec($ch); 
	$weibo = json_decode($content, true);
	return $weibo;
}

function user()
{
	$getjson = 'https://api.weibo.com/2/statuses/user_timeline.json?count=1&feature=1&access_token='.$_SESSION['oauth2']['oauth_token'];
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL,$getjson);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
	$content = curl_exec($ch); 
	$weibo = json_decode($content, true);
	return $weibo;
}

function place_user_timeline($uid)
{
	$getjson = 'https://api.weibo.com/2/place/user_timeline.json?count=50&uid='.$uid.'&access_token='.$_SESSION['oauth2']['oauth_token'];
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL,$getjson);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
	$content = curl_exec($ch); 
	$weibo = json_decode($content, true);
	return $weibo;
}

function nearby_timeline($lat, $lng)
{
	$getjson = "https://api.weibo.com/2/place/nearby_timeline.json?lat=".$lat."&long=". $lng."&access_token=".$_SESSION['oauth2']['oauth_token'];
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL,$getjson);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
	$content = curl_exec($ch); 
	$weibo = json_decode($content, true);
	return $weibo;
}

function friendship_friends($uid)
{
	$getjson = 'https://api.weibo.com/2/friendships/friends.json?count=200&uid='.$uid.'&access_token='.$_SESSION['oauth2']['oauth_token'];
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL,$getjson);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
	$content = curl_exec($ch); 
	$weibo = json_decode($content, true);
	return $weibo;
}

?>
<?php
/*
	api文档
	http://open.weibo.com/wiki/API%E6%96%87%E6%A1%A3_V2
*/
class sina_api
{
	public $access_token;
	public $user_id;
	public $api_url = 'https://api.weibo.com/2/';
	
	function user_timeline($uid = NULL, $count = 100, $page = NULL, $feature = 1, $trim_user = 1)
	{
	/*
		uid				false	int64	需要查询的用户ID。
		screen_name	false	string	需要查询的用户昵称。
		since_id			false	int64	若指定此参数，则返回ID比since_id大的微博（即比since_id时间晚的微博），默认为0。
		max_id			false	int64	若指定此参数，则返回ID小于或等于max_id的微博，默认为0。
		count			false	int	单页返回的记录条数，最大不超过100，默认为20。
		page			false	int	返回结果的页码，默认为1。
		base_app		false	int	是否只获取当前应用的数据。0为否（所有数据），1为是（仅当前应用），默认为0。
		feature			false	int	过滤类型ID，0：全部、1：原创、2：图片、3：视频、4：音乐，默认为0。
		trim_user		false	int	返回值中user字段开关，0：返回完整user字段、1：user字段仅返回user_id，默认为0。
	*/
	
		$getjson = $this->api_url . 'statuses/user_timeline.json?';
		if($uid != NULL) $getjson = $getjson .  '&uid=' . $uid;
		$getjson =$getjson .  '&count=' . $count;
		if($page != NULL) $getjson =$getjson .  '&page=' . $page;
		$getjson =$getjson .  '&feature' . $feature;
		$getjson =$getjson .  '&trim_user=' . $trim_user;
		$getjson =$getjson .  '&access_token=' . $this->access_token;
		
		$ch = curl_init();  
		curl_setopt($ch, CURLOPT_URL,$getjson);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		$content = curl_exec($ch); 
		$return = json_decode($content, true);
		return $return;
	}



	function place_user_timeline($uid = NULL, $count = 20, $page = NULL)
	{
	/*
		uid			true	int64	需要查询的用户ID。
		since_id		false	int64	若指定此参数，则返回ID比since_id大的微博（即比since_id时间晚的微博），默认为0。
		max_id		false	int64	若指定此参数，则返回ID小于或等于max_id的微博，默认为0。
		count		false	int	单页返回的记录条数，最大为50，默认为20。
		page		false	int	返回结果的页码，默认为1。
		base_app	false	int	是否只获取当前应用的数据。0为否（所有数据），1为是（仅当前应用），默认为0。
	*/
	
		$getjson = $this->api_url . 'place/user_timeline.json?';
		if($uid != NULL) $getjson = $getjson .  '&uid=' . $uid;
		$getjson =$getjson .  '&count=' . $count;
		if($page != NULL) $getjson =$getjson .  '&page=' . $page;
		$getjson =$getjson .  '&access_token=' . $this->access_token;
		
		$ch = curl_init();  
		curl_setopt($ch, CURLOPT_URL,$getjson);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		$content = curl_exec($ch); 
		$return = json_decode($content, true);
		return $return;
	}

	function place_nearby_timeline($lat = NULL, $long = NULL, $count = 50, $range = 2000, $sort = 0)
	{
	/*
		lat			true	float	纬度。有效范围：-90.0到+90.0，+表示北纬。
		long			true	float	经度。有效范围：-180.0到+180.0，+表示东经。
		range		false	int	搜索范围，单位米，默认2000米，最大11132米。
		starttime	false	int	开始时间，Unix时间戳。
		endtime	false	int	结束时间，Unix时间戳。
		sort			false	int	排序方式。默认为0，按时间排序；为1时按与中心点距离进行排序。
		count		false	int	单页返回的记录条数，最大为50，默认为20。
		page		false	int	返回结果的页码，默认为1。
		base_app	false	int	是否只获取当前应用的数据。0为否（所有数据），1为是（仅当前应用），默认为0。
		offset		false	int	传入的经纬度是否是纠偏过，0：没纠偏、1：纠偏过，默认为0。
	*/
	
		$getjson = $this->api_url . 'place/nearby_timeline.json?';
		if($lat != NULL) $getjson = $getjson .  '&lat=' . $lat;
		if($long != NULL) $getjson = $getjson .  '&long=' . $long;
		if($range != 2000) $getjson =$getjson .  '&range=' . $range;
		if($sort != 0) $getjson = $getjson .  '&sort=' . $sort;
		$getjson = $getjson .  '&count=' . $count;
		$getjson =$getjson .  '&access_token=' . $this->access_token;
		
		$ch = curl_init();  
		curl_setopt($ch, CURLOPT_URL,$getjson);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		$content = curl_exec($ch); 
		$return = json_decode($content, true);
		return $return;
	}
	
	function friendships_friends_ids($uid = NULL, $count = 5000)
	{
	/*
	uid				false	int64	需要查询的用户UID。
	screen_name	false	string	需要查询的用户昵称。
	count			false	int	单页返回的记录条数，默认为500，最大不超过5000。
	cursor			false	int	返回结果的游标，下一页用返回值里的next_cursor，上一页用previous_cursor，默认为0。
	*/
		
		$getjson = $this->api_url . 'friendships/friends/ids.json?';
		if($uid != NULL) $getjson = $getjson .  '&uid=' . $uid;
	    $getjson = $getjson .  '&count=' . $count;
		$getjson =$getjson .  '&access_token=' . $this->access_token;
		
		$ch = curl_init();  
		curl_setopt($ch, CURLOPT_URL,$getjson);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		$content = curl_exec($ch); 
		$return = json_decode($content, true);
		return $return;
	}
	
	function place_friends_timeline($count = 50, $type = 0)
	{
	/*
	count	false	int	单页返回的记录条数，最大为50，默认为20。
	page	false	int	返回结果的页码，默认为1。
	type		false	int	关系过滤，0：仅返回关注的，1：返回好友的，默认为0。
	*/
		
		$getjson = $this->api_url . 'place/friends_timeline.json?';
	    $getjson = $getjson .  '&count=' . $count;
		$getjson =$getjson .  '&access_token=' . $this->access_token;
		
		$ch = curl_init();  
		curl_setopt($ch, CURLOPT_URL,$getjson);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);  
		$content = curl_exec($ch); 
		$return = json_decode($content, true);
		return $return;
	}
	
}
?>
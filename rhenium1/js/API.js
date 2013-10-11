var obj;
var nearby = new Array();
nearby[0] = new Array();
nearby[1] = new Array();
nearby[2] = new Array();
nearby[3] = new Array();
nearby[4] = new Array();
nearby[5] = new Array();
nearby[6] = new Array();
nearby[7] = new Array();	
function ClearNearby()
{
	var i = 0;
	for (i = 0; i< 8; i++)
	{
		nearby[i].splice(0);
	}
}
function nearby_timeline(lat, lng, access_token)
{
	ClearNearby();
  $.getJSON("https://api.weibo.com/2/place/nearby_timeline.json?callback=?",
  {
    lat:lat,
	long:lng,
	access_token:access_token
  },
  function (data) {
  
  var stmp = data.data;
    var json = stmp.substring(stmp.indexOf("{"), stmp.length-1);
	obj = eval('(' + json + ')');
	//console.log(obj.statuses);
	if(obj.statuses != null)
	{
    $.each(obj.statuses, function(i, statuse){
	nearby[0][i] = statuse.text;
	nearby[1][i] = statuse.original_pic;
	nearby[2][i] = statuse.created_at;
	nearby[3][i] = "http://weibo.com/" +statuse.user.id;
	nearby[4][i] = statuse.user.name;
	nearby[5][i] = statuse.user.profile_image_url;
	if(statuse.geo)
	{
	nearby[6][i] = statuse.geo.coordinates[0];
    nearby[7][i] = statuse.geo.coordinates[1];
	}
	});
	
	LuckMap(nearby[0], nearby[1], nearby[2], nearby[3], nearby[4], nearby[5], nearby[6],  nearby[7]);
	LuckOfTrackStream(nearby[0], nearby[1], nearby[2], nearby[3], nearby[4], nearby[5], nearby[6],  nearby[7]);
	}
	else alert("数据有误！");
  });

}

function TasTrack(id)
{
	ClearNearby();
  $.getJSON("https://api.weibo.com/2/place/user_timeline.json?callback=?",
  {
    uid:id,
	count:50,
	access_token:access_token
  },
  function (data) {
  if(data.data.statuses != null)
  {
    $.each(data.data.statuses, function(i, statuse){
	nearby[0][i] = statuse.text;
	nearby[1][i] = statuse.original_pic;
	nearby[2][i] = statuse.created_at;
	if(statuse.user.id)
	{
	nearby[3][i] = "http://weibo.com/" +statuse.user.id;
	}
	nearby[4][i] = statuse.user.name;
	nearby[5][i] = statuse.user.profile_image_url;
	
	if(statuse.geo)
	{
	nearby[6][i] = statuse.geo.coordinates[0];
    nearby[7][i] = statuse.geo.coordinates[1];
	i++;
	}
	});

	document.getElementById("TimeSelect").innerHTML 
	= '<button onclick="getTime('+id+')">时间筛选</button>'
	initialize(nearby[0], nearby[1], nearby[2], nearby[3], nearby[4], nearby[5], nearby[6],  nearby[7]);
	TasTrackStream(nearby[0], nearby[1], nearby[2], nearby[3], nearby[4], nearby[5], nearby[6],  nearby[7]);
	}
	else
	{
	alert("没有该用户的位置信息！");
	}
  });
}

function getTime(uid)
{
	var start = document.getElementById("StartTime").value;
	var end = document.getElementById("EndTime").value;
	
	if(start != null &&  end != null)
	{
			ClearNearby();
  $.getJSON("https://api.weibo.com/2/place/user_timeline.json?callback=?",
  {
    uid:uid,
	count:50,
	access_token:access_token
  },
  function (data) {
  if(data.data.statuses != null)
  {
  var count = 0;
    $.each(data.data.statuses, function(i, statuse){
	if(MakeTime(statuse.created_at, start, end) == 1)
	{
		nearby[0][count] = statuse.text;
		nearby[1][count] = statuse.original_pic;
		nearby[2][count] = statuse.created_at;
		if(statuse.user.id)
		{
		nearby[3][count] = "http://weibo.com/" +statuse.user.id;
		}
		nearby[4][count] = statuse.user.name;
		nearby[5][count] = statuse.user.profile_image_url;
		
		if(statuse.geo)
		{
		nearby[6][count] = statuse.geo.coordinates[0];
		nearby[7][count] = statuse.geo.coordinates[1];
		count++;
		}
	}
	});

	document.getElementById("TimeSelect").innerHTML 
	= '<button onclick="getTime('+uid+')">时间筛选</button>'
	initialize(nearby[0], nearby[1], nearby[2], nearby[3], nearby[4], nearby[5], nearby[6],  nearby[7]);
	TasTrackStream(nearby[0], nearby[1], nearby[2], nearby[3], nearby[4], nearby[5], nearby[6],  nearby[7]);
	}
	else
	{
	alert("没有该用户的位置信息！");
	}
  });
	}
	else {alert("请先输入日期！");}
	
}

function MakeTime(t, start, end)
{
	var mouth = t.substring(4,7);
	var day = t.substring(8,10);
	var year = t.substring(26);
	console.log(mouth);
	if(mouth == 'Jan') mouth = '01';
	else if(mouth == 'Feb') mouth = '02';
	else if(mouth == 'Mar') mouth = '03';
	else if(mouth == 'Apr') mouth = '04';
	else if(mouth == 'May') mouth = '05';
	else if(mouth == 'Jun') mouth = '06';
	else if(mouth == 'Jul') mouth = '07';
	else if(mouth == 'Aug') mouth = '08';
	else if(mouth == 'Sep') mouth = '09';
	else if(mouth == 'Oct') mouth = '10';
	else if(mouth == 'Nov') mouth = '11';
	else if(mouth == 'Dec') mouth = '12';
	console.log(mouth);
	stmp = year + '.' + mouth + '.' + day;
	console.log(stmp);
	if(stmp > start && stmp < end)
	return 1;
	else return 0;
}

function SendMap()
{
$.get('http://tp1.sinaimg.cn/2098407280/50/39997978938/1?callback?',
function(data){
console.log(data);
document.write(data);
alert(data);
});
}
function stream(s, ori_img,time,zhuye,yonghuming,touxiangsrc,lat, lng,i)
{
tmp = '<div class="status-item" '+
				'style="color: #333;'+
				'margin-bottom: 20px;'+
				'padding: 0;'+
				'display: '+
				'block;">'
				
			+'<div class = "mod" style="margin: 0;'+
							'padding-bottom: 12px;'+
							'position: relative;'+
							'width: auto;'+
							'padding: 0;'+
							'display: block;'+
							'content: "0020";'+
							'display: block;'+
							'clear: both;">'+
							'<div class="head" style="float: left;'+
								'margin: 3px 15px 0 0;'+
								'width: 48px;'+
								'height: 48px;'+
								'padding: 0;'+
								'display: block;">'+
										'<a href="'+zhuye+ '"'+
										'target="_blank"'+
										'title="'+yonghuming +'" '+
										'style="color: #128C66;'+
										'text-decoration: none">'+
										'<img title="'+yonghuming +'" '+
										'width="50" '+
										'height="50" '+
										'src="'+touxiangsrc +'" '+
										'target="_blank"'+
										'style="display: block;'+
										'border: 0;'+
									 'width: 50px;height: 50px;">'+
										'</a>'+
							'</div>'+
							'<div class="body" style="border-bottom: 1px solid #EEE;'+
								'overflow: hidden;'+
								'padding-bottom: 14px;'+
								'zoom: 1;margin: 0;'+
								'padding: 0;'+
								'display: block;">'+
									'<p class="text"'+
										'style="margin: 0 0 5px 0;'+
									 'word-wrap: break-word;'+
										'margin-right:20px;'+
										'display: block;">'+
										'<a href="'+ zhuye+'"'+
										'target="_blank"'+
											'style="word-wrap: break-word;'+
											'color: #26A2DA;'+
											'cursor: auto;'+
											'text-decoration:none">'+
											yonghuming +'</a>'+
											':'+
										'<a style="word-wrap: break-word;'+
											'cursor: auto;'+
											'font-style: normal;'+
											'font-weight: normal;'+
											'font-size: 15px;'+
											'line-height: 22px;'+
											'color: #444;">'
								+s
								+		'<div  class="attachments"'+
										'style="padding-left: 24px;'+
										'overflow: hidden;'+
										'zoom: 1;margin: 0;'+
										'padding: 0;'+
										'display: block;">';
								if(ori_img)
								{
								tmp+=		'<a href="'+ori_img+'" target="_blank">'+
								
												'<img class="bigcursor" '+
													'src="'+ori_img+'" style="width: 60px; height: 60px;">'+
													'</a>';
								}
								tmp+='</div>'+
									'<div class="actions"'+
									'style="padding-left: 24px;'+
									'margin: 5px 0;'+
									'color: #AAA;'+
									'padding: 0;'+
									'display: block;">'+
										'<p style="padding: 3px 0 0;'+
											'font-size: 12px;'+
											'color: #999;'+
											'cursor: default;'+
										   'margin: 0;'+
											'display: block;">'+
											'<span style="float: right;'+
												'display: inline;'+
												'font-size: 12px;'+
												'color: #999;'+
												'cursor: default;'+
											'margin-right:20px;'+
												'line-height: 22px;">	'+
											'</span>'+
											'<a class="date" shape="margin: 0 10px 0 0;'+
												'word-wrap: break-word;'+
												'color: #8EBED0;'+
												'text-decoration: none;'+
												'cursor: auto;">'+time+'</a> '+
										'</p>'+
									'</div>'+
									'<div class="others">'+
									'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
					return tmp;
}

var line = new Array();

function initialize(s, ori_img,time,zhuye,yonghuming,touxiangsrc,lat, lng)
{
	if(s)
	{
        var myLatlng = new google.maps.LatLng(lat[0], lng[0]);
        var mapOptions = {
          zoom: 4,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

	var addMapper = function(element,index){
		google.maps.event.addListener(element, 'click', function() {
		infowindow[index].open(map,element);
		});
	}

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		
		var count = lat.length;
		var infowindow = new Array();
		var marker =new Array();
		var ContentString = new Array();
		var i;
		var lineCoordinates = new Array();
		for(i = 0; i < count; i++)
		{
			if(s[i])
			{
				var loc = lat[i] + ',' + lng[i];
				
				ContentString[i] = stream(s[i], ori_img[i],time[i],zhuye[i],yonghuming[i],touxiangsrc[i],lat[i], lng[i], i);
				
				var newLatlng = new google.maps.LatLng(lat[i], lng[i]);

					infowindow[i] = new google.maps.InfoWindow({
					content: ContentString[i],
					maxWidth: 500
				});

				marker[i] = new google.maps.Marker({
					position: newLatlng,
					map: map,
					title: loc,
					index:i
				});
				addMapper (marker[i],i);
			}
			
		  var lineSymbol = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          strokeColor: '#393'
        };
			
			if(i > 0)
			{
				    lineCoordinates[i-1] = [
					new google.maps.LatLng(lat[i], lng[i]),
					new google.maps.LatLng(lat[i-1], lng[i-1])
				];
				
				  line[i-1] = new google.maps.Polyline({
				  path: lineCoordinates[i-1],
				  icons: [{
					icon: lineSymbol,
					offset: '100%'
				  }],
				  map: map
				});
			}
		}
	}
	else
	{
		alert("您没有位置信息或新浪服务器未响应！");
	}
}

function animateCircle() {
  var count = 0;
  offsetId = window.setInterval(function() {
	count = (count + 1) % 200;

	var i;
	for(i = 0; i< line.length; i++)
	{
	var icons = line[i].get('icons');
	icons[0].offset = (count / 2) + '%';
	line[i].set('icons', icons);
	}
}, 20);	  
}

function LuckMap(s, ori_img,time,zhuye,yonghuming,touxiangsrc,lat, lng)
{
        var myLatlng = new google.maps.LatLng(lat[0], lng[0]);
        var mapOptions = {
          zoom: 4,
          center: myLatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

	var addMapper = function(element,index){
		google.maps.event.addListener(element, 'click', function() {
		infowindow[index].open(map_2,element);
		});
	}

        var map_2 = new google.maps.Map(document.getElementById('LuckOfTrack'), mapOptions);
		
		var count = lat.length;
		var infowindow = new Array();
		var marker =new Array();
		var ContentString = new Array();
		var i;
		for(i = 0; i < count; i++)
		{
			if(s[i])
			{
				var loc = lat[i] + ',' + lng[i];
				
				ContentString[i] = stream(s[i], ori_img[i],time[i],zhuye[i],yonghuming[i],touxiangsrc[i],lat[i], lng[i], i);
				
				var newLatlng = new google.maps.LatLng(lat[i], lng[i]);

					infowindow[i] = new google.maps.InfoWindow({
					content: ContentString[i],
					maxWidth: 500
				});


				marker[i] = new google.maps.Marker({
					position: newLatlng,
					map: map_2,
					title: loc,
					index:i
				});
				addMapper (marker[i],i);
			}
		}
}


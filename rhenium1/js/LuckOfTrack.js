function LuckOfTrack(s, ori_img,time,zhuye,yonghuming,touxiangsrc,lat, lng)
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
													/*'<a'+
													' href=\"#\"'+
													'class=\"YiDong\"'+
													'style=\"text-decoration:none;\"'+
													'onclick="SendFrom('+lat+','+lng+')">'+
													'缘分</a>'+
													*/
											'</span>'+
											'<a class="date" style="margin: 0 10px 0 0;'+
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

function LuckOfTrackStream(s_2, ori_img_2, time_2, zhuye_2, yonghuming_2, touxiangsrc_2, lat_2,  lng_2)
{
	var stream='<div class="stream-items" '+
'style="overflow:scroll;'+
	 'height:330px;'+
	'width:750px;'+
	 'cursor:default; '+
	 'margin: 20px 0 0; '+
	 'display: block; '+
	 'color:#444">';
	for(x in s_2)
	{
		stream += LuckOfTrack(s_2[x], ori_img_2[x], time_2[x], zhuye_2[x], yonghuming_2[x], touxiangsrc_2[x], lat_2[x],  lng_2);
	}
	
	stream += '</div>';
	
	document.getElementById('YuanFen').innerHTML = stream;
}

function TasTrackStream(s_2, ori_img_2, time_2, zhuye_2, yonghuming_2, touxiangsrc_2, lat_2,  lng_2)
{
	var stream='<div class="stream-items" '+
'style="overflow:scroll;'+
	 'height:330px;'+
	'width:750px;'+
	 'cursor:default; '+
	 'margin: 20px 0 0; '+
	 'display: block; '+
	 'color:#444">';
	for(x in s_2)
	{
		stream += LuckOfTrack(s_2[x], ori_img_2[x], time_2[x], zhuye_2[x], yonghuming_2[x], touxiangsrc_2[x], lat_2[x],  lng_2[x]);
	}
	
	stream += '</div>';
	
	document.getElementById('box4').innerHTML = stream;
}
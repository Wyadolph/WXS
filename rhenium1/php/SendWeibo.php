<?php

function SendWeibo($c)
{
echo "<a style=\"font-size:10px;color:#999\">发布微博</a>
<form action=\"index.php\" method=\"post\"
enctype=\"multipart/form-data\">

<input type=\"text\" name=\"send_text\" id=\"fabuyixiaba\"/><br /> 
<label for=\"file\" style=\"font-size: 12px;color: #999;\">选择图片或当前地图:</label>
<input type=\"file\" name=\"file\" id=\"file\" /> 
<input type=\"submit\" name=\"submit\" value=\"发布\" id=\"submit\" onclick=\"PopBox()\"/>
</form>
";

		if( isset($_REQUEST['send_text']) )
	{
	
		if( isset($_FILES["file"]["type"]) )
	{
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/PNG")
|| ($_FILES["file"]["type"] == "image/pjpeg"))
&& ($_FILES["file"]["size"] < 20000000))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Error: " . $_FILES["file"]["error"] . "<br />";
    }
  else
    {
	/*
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Stored in: " . $_FILES["file"]["tmp_name"];
	*/
		echo "<div id=\"SendResult\" style=\"display:none\">";
		echo "<p>";
		print_r ($c->upload($_REQUEST['send_text'] ,$_FILES["file"]["tmp_name"]));
		echo "</p>";
		echo "</div>";
    }
  }
else
  {
	$c->update( $_REQUEST['send_text']);
  }
}
}
}
?>
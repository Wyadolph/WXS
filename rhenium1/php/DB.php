<?php
//使用方法
/**
 * Sae Mysql Class
 *
 * <code>
 * <?php
 * $mysql = new SaeMysql();
 *
 * $sql = "SELECT * FROM `user` LIMIT 10";
 * $data = $mysql->getData( $sql );
 * $name = strip_tags( $_REQUEST['name'] );
 * $age = intval( $_REQUEST['age'] );
 * $sql = "INSERT  INTO `user` ( `name` , `age` , `regtime` ) VALUES ( '"  . $mysql->escape( $name ) . "' , '" . intval( $age ) . "' , NOW() ) ";
 * $mysql->runSql( $sql );
 * if( $mysql->errno() != 0 )
 * {
 *     die( "Error:" . $mysql->errmsg() );
 * }
 * 
 * $mysql->closeDb();
 * ?>
 * </code>
 *
 * @package sae
 * @author EasyChen
 * 
 */ 


function InserIntoDB($text, $ori_img, $time, $zhuye, $yonghuming, $touxiangsrc, $lat, $lng)
{
	$mysql = new SaeMysql();

	$sql = "SELECT * FROM `user_timeline` WHERE  `yonghuming` = '". $yonghuming ."' AND `time` = '". $time ."'";
	$data = $mysql->getData($sql);

	if(is_array($data) != 1)
	{		
		$sql = "INSERT INTO `app_lengyeyoulan`.`user_timeline` (`text`, `ori_img`, `time`, `zhuye`, `yonghuming`, `touxiangsrc`, `lat`, `lng`)
		VALUES ('".$text."', '".$ori_img."', '".$time."', '".$zhuye."', '".$yonghuming."', '".$touxiangsrc."', '".$lat."', '".$lng."');";
		
		$mysql->runSql( $sql );

		if( $mysql->errno() != 0 )
		{
			die( "Error:" . $mysql->errmsg() );
		}
	
	$mysql->closeDb();
	}
}

?>

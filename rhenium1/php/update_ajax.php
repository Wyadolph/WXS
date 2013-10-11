<?php
include_once('sina_api.php');
include_once('show_weibo.php');

$api = new sina_api();
$api->access_token = $_GET['oauth_token'];
$api->user_id = $_GET['user_id'];

show_weibo($api->place_user_timeline($_GET['user_id'], 20, $_GET['page']), $_GET['feature'], $_GET['time'], $_GET['start_time'], $_GET['end_time'], $_GET['oauth_token']);
?>
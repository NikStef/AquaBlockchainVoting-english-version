<?php
  session_start();
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
</head>
<?php
	session_unset();
	header('Location: index.php');
?>

</html>

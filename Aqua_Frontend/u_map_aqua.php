<!DOCTYPE html>
<?php
  session_start();
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<style>

body {
  font-family: "Lato", sans-serif;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 0; 
  top: 0;
  left: 0;
  background-color: #FFFFFF;
  padding-top: 60px; 
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none; 
  font-size: 25px;
  color: #818181;
  display: block; 
}

.sidenav a:hover {
  color: #5da6f0;
}
.sidenav b{
  padding: 8px 8px 8px 32px;
  text-decoration: none; //u,b,-
  font-size: 18px;
  color: #000000;
  display: block;  
}

gen{
  font-weight: bold;
  font-size: 18px;
}

b{
  font-size: 18px;
}


</style>
</head>
<body>
<div id="mySidenav" class="sidenav">
  <a href="u_index.php" ><img id="logo" src="img/AquaLogo.png"style="width:220px; height:100px;"></a>
  <b>Welcome,<addresid id="addresid"></addresid></b>
  <gen><a href="results.php" id="gen"></a></gen>
  <a href="vote_voting.php">Vote</a>
  <a href="init_voting.php">Election Settings</a>
  <a href="restart.php">Disconnect</a>
</div>

</body>
<script src = "./u_map_aqua.js" type="module"></script>
</html>
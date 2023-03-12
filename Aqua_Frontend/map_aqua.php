<!DOCTYPE html>
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
  position: fixed; //positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled
  z-index: 0; //overlaping-higher index on top
  top: 0;
  left: 0;
  background-color: #FFFFFF;
  padding-top: 60px; //xoros apo pano
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none; //u,b,-
  font-size: 25px;
  color: #818181;
  display: block; // ana block 
}

.sidenav a:hover {
  color: #5da6f0;
}


</style>
</head>
<body>
<div id="mySidenav" class="sidenav">
  <a href="index.php"><img src="img/AquaLogo.png"style="width:220px; height:100px;"></a>
  <a href="connectMetamask.php">Connect</a>
  <a href="about.php">About</a>
</div>

</body>
</html> 
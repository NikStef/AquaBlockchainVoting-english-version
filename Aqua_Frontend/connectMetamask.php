<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<style>
body {font-family: Arial, Helvetica, sans-serif;}

button {
    
	width: 10%;
	margin-left: 600px;  
  	margin-top: 150px;
	background-color: blue;
	color: white;
	padding: 10px 21px;
	border: none;
	cursor: pointer;
	
}
button:hover {
  opacity: 0.9;
}
h3{
  text-align: center;
  color: red;
  margin-left: 60px;
 }

</style>
</head>
<body>
<?php include 'map_aqua.php';?>

<button  id="connectButton">Connect with Metamask</button>
<h3 id="error_code"></h3>
</body>
<script src = "./connectMetamask.js" type="module"></script>
</html>
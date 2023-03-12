<!DOCTYPE html>
<html>
<head>
<style>
 body {font-family: Arial, Helvetica, sans-serif;}

 h1{
  text-align: center;
  color: red;
 }

.votefunctions{
  margin-top:30px;
  margin-left: 200px;
  margin-bottom: 30px;  
}

.title{
  margin-left: 150px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 15px;
  display: inline-block;
}

input[type=text]{
  margin-left: 150px;
  width: 50%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box; 
}

button {
	width: 10%;
	margin-left: 50px;  
	color: white;
	padding: 10px 21px;
	border: none;
	cursor: pointer;
	
}

fieldset {
    border: none;
}
.votelistcandidates{
  margin-left: 350px;
  background-image: url("img/paper-texture.jpg");
  max-width: 50%;
  opacity: 99%;
}

button[type=button1]{
  background-color: #EA8A15;
}

button:hover {
  opacity: 0.8;
}

li{
  font-weight: bold;
  font-size: large;
  line-height: 2.5;
}

h2{
  text-align: center;
  font-size: 200%;
}

</style>

</head>
<body>
<?php include 'u_map_aqua.php';?>

 <fieldset id="vote-only">
    <div class="votelistcandidates" style="overflow-x:hidden;"> 
    <h2>Aqua Elections</h2>
      <ul id="list" >
      </ul> 
    </div>
    <div class="votefunctions">
      <div class=title>Please fill in all the fields with the ids of the candidates you want to approve.
      </br>If you do not wish to approve one or more candidates, enter 0 at the appropriate fields.</div>

      <input type="text" id="_id1" placeholder="Id of the first candidate."/>
      <input type="text" id="_id2" placeholder="Id of the second candidate."/>
      <input type="text" id="_id3" placeholder="Id of the third candidate."/>
      <button type="button1" id="votes">Vote</button>
    </div>
  </fieldset>
  <h1 id=error_code></h1>

   
</body>
<script src = "./vote-voting.js" type="module"></script>
</html>
<!DOCTYPE html>
<html>
<head>
<style>
 body {font-family: Arial, Helvetica, sans-serif;}

 .democlass { text-align : left; }
 
h2{
    font-weight: bold;
    margin-left: 350px;
}

.eee{
  text-align : left;
  font-weight: bold;
  font-size: 15px;
  background: #eee;
}

table {
  text-align: center;
  margin-left: 350px;
  margin-bottom: 60px;
  border-collapse: collapse;
}
 
thead tr {
    font-weight: bold;
    font-size: 15px;
    background: #eee;
}



td, th{
    border: 1px solid #777;
}

canvas{
  margin-left: 350px;
}

.wrap {
  display: flex;
}
.secondtable{
  align-self: start;
}

</style>

</head>
<body>
<?php include 'u_map_aqua.php';?>
<h2>The winning committee</h2>
<table class="styled-table">
<thead>
<tr>
<td>Name:</td>
<td>Candidate Id:</td>
</tr>
</thead>
<tbody>
<tr>
    <td colspan=2><img height="100" src="./img/Metal-gold-blue-icon.png" width="100"></td>
  </tr>
  <tr>
    <td id="win1name" class="democlass"></td>
    <td id="win1"></td>
  </tr>
  <tr>
    <td id="win2name" class="democlass"></td>
    <td id="win2"></td>
  </tr>
  <tr>
    <td id="win3name" class="democlass"></td>
    <td id="win3"></td>
  </tr>
</tbody>
</table>

<h2>Elections Results</h2>


<div class="wrap">
<section class="firsttable">
<table class="styled-table" id="poll">
<thead>
  <tr>
    <td>Candidate Name</td>
    <td>AV-score</td>
  </tr>
  </thead>
</table>
</section>


<section class="secondtable">
<table id="informations">
    <tr><td class="eee">Register Voters:</td> <td id="VotLen"></td> </tr>
    <tr><td class="eee">Ballots:</td> <td id="VotVot"></td></tr>
    <tr><td class="eee">Sum of AV-score:</td><td id="UniqueApprovals"></td></tr>
    <tr><td class="eee">Num of Incomplete Preferences:</td><td id="Approvalsofzero"></td></tr>
</table>
</section>

</div>


<canvas id="myChart" style="width:100%;max-width:600px"></canvas>

</body>
<script src = "results.js" type="module"></script>
</html>

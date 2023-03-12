<!DOCTYPE html>
<html>
<head>
<style>
body  {
  background-image: url("img/wtc1.png");
  background-repeat:no-repeat;
  background-attachment: fixed;
  background-position: center;  
}

 body {font-family: Arial, Helvetica, sans-serif;}


 h1{
  text-align: center;
  color: red;
 }
 
.setfunctions{
  margin-top:30px;
  margin-left: 200px;
  margin-bottom: 30px;  
}

.viewfunctions{
  margin-top:5px;
  margin-left: 200px;
  margin-bottom: 5px;  
}
.changestatefunctions{
  margin-top:5px;
  margin-left: 200px;
  margin-bottom: 5px;  
}
.title{
  margin-left: 150px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
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

button[type=button1]{
  background-color: #EA8A15;
}
button[type=button2]{
  background-color: #1562EA;
}
button[type=button3]{
  background-color: #B70EDD;
}
button:hover {
  opacity: 0.8;
}


</style>

</head>
<body>
<?php include 'u_map_aqua.php';?>

<fieldset id="set-only">
    <div class="setfunctions">
      <div class=title>Registration Functions</div>
      <input type="text" id="_nameCandidate" placeholder="Candidate Name"/>
      <input type="text" id="_addressCandidate" placeholder="Candidate Address e.g. 0x0000000000000000000000000000000000000000"/>
      <button type="button1" id="setCandidateButton">Set Candidate</button>
    </div>
    <div class="setfunctions">
      <input type="text" id="_addressVoter" placeholder="Voter Address e.g. 0x0000000000000000000000000000000000000000""/>
      <button type="button1" id="setVoterButton">Set Voter</button>  
		</div>
    </fieldset>

    <fieldset id="view-only">
      <div class="viewfunctions">
        <div class=title>Read-only Functions</div>
        <input type = "text" name ="candidatelengthresult" id = "candidatelengthresult" placeholder="The number of candidates is... "  onkeydown="return false;">
        <button type="button2" id="CandidateLength">CandidateLength</button>
      </div>
      <div class="viewfunctions">
        <input type = "text" name ="voterlengthresult" id = "voterlengthresult" placeholder="The number of voters is... "  onkeydown="return false;">
        <button type="button2" id="VoterLength">VoterLength</button> 
      </div>
      <div class="viewfunctions">
        <input type = "text" name ="periodResult" id = "periodResult" placeholder="Election Period is... "  onkeydown="return false;">
        <button type="button2" id="period">Period</button> 
      </div>
    </fieldset>
    
    <fieldset id="change-only">
    <div class="changestatefunctions">
      <div class=title>State Change Functions</div>
      <input type = "text" name ="changeperiod" id = "changeperiod" placeholder="Change Election Period"  onkeydown="return false;">
      <button type="button3" id="ChangePeriod">Next Period</button>
    </div>
    <div class="changestatefunctions">
      <input type = "text" name ="winnersresult" id = "winnersresult" placeholder="The winning committee... "  onkeydown="return false;">
      <button type="button3" id="Winner">Results</button> 
		</div>
    </fieldset>
    <h1 id=error_code></h1>


   
</body>
<script src = "./init-voting.js" type="module"></script>
</html>
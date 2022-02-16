//Declaration of MyVar
var MyVar;
//The function will be triggered on clicking the submit button
function OnSubmit(){
  validateForm();
  MyVar = setInterval(validateForm,5000);
}

//This Function will run when the submit button is clicked.
function validateForm(){

  //initialising the day and dates variable
  var pin = document.getElementById('pin').value;
  var date = document.getElementById('date').value;
  var month = document.getElementById('month').value;
  if (date.length == 1){
    date = "0" + date;
  }
  if (month.length == 1){
    month = "0" + month;
  }
  var year = document.getElementById('year').value;
  var FinalDate = date + "-" + month + "-" + year;

  //Assigning the request URL to a variable
  var RequestUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+ pin +"&date=" + FinalDate;

  //Sending XMLHttpRequest(AJAX)
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", RequestUrl, true);
  xhttp.send();

  //Recieving the response and making use of it
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('loading').innerHTML="Finding availabe slots.........";

      //Assigning the parsed response to a variable
      var data = JSON.parse(this.responseText);

      //Variable for No of centers for a particular pincode
      var NoCenters = data.centers.length;

      //Looping through centers
      for(var a = 0; a < NoCenters; a++){

        //Initialising No. of sessions per Centre
        var NoSessions = data.centers[a].sessions.length;

        //looping through the sessions available for a particular center
        for(var b = 0; b < NoSessions; b++){

          //Checking if a particular session is available
          if(data.centers[a].sessions[b].available_capacity != 0){
            console.log("Hurry there is a slot available");
            //var audio = new Audio('FadedGuitar.mp3');
            //audio.play();
            console.log(data);
          }

        }
      }

    }else {
      document.getElementById('loading').innerHTML="";
    }
  };



}
function onStop() {
  clearInterval(MyVar);
  document.getElementById('loading').innerHTML="";
}

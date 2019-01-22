var signUpForm = document.getElementById("sign-up-form");
var logInForm = document.getElementById("log-in-form");
var loginButton = document.getElementById("log-in-button");
var signUpButton = document.getElementById("sign-up-button");
var createAccountButton = document.getElementById("create-account-button");
var authBox = document.getElementById("auth-box");
var existingMember = document.getElementById('existing-member');
var signUpBox = document.getElementById("sign-up");
var userName = document.getElementById("sign-up-username");
var userEmail = document.getElementById("sign-up-email");
var userPassword = document.getElementById("sign-up-password");
var loginEmail = document.getElementById("login-email");
var loginPw = document.getElementById("login-password");
var user = document.getElementById("name-for-schedule");
var date = document.getElementById("date-for-schedule");
var event = document.getElementById("event-for-schedule");
var time = document.getElementById("time-for-schedule");
var scheduleShow = document.getElementById("show-schedule");


function showLoginForm(){
    signUpButton.style.setProperty("display","none");
    signUpBox.style.setProperty("display","none");
    loginButton.style.setProperty("display","none");
    authBox.style.setProperty("display","block");
    logInForm.style.setProperty("display","block");
}

function showSignUpForm(){
    existingMember.style.setProperty("display","none");
    signUpButton.style.setProperty("display","none");
    createAccountButton.style.setProperty("display","block");
    loginButton.style.setProperty("display","none");
    authBox.style.setProperty("display","block");
    signUpForm.style.setProperty("display","block");
}

// function showSchedulerForm(){
//     user.style.setProperty("display","none");
//     date.style.setProperty("display","none");
//     event.style.setProperty("display","block");
//     time.style.setProperty("display","none");
   
// }

function cancel(){
    location.reload();
}

// pasport functions////

//write users to the database using sequelize
function createNewAccount(){
    axios.post('/auth/register', { username: userName.value, email: userEmail.value, password: userPassword.value }).then(function(response) {
        var user = response.data.username;
        console.log(user);
        alert(`Account created for ${user}`);
        window.location = response.data.URL;
        
    }).catch(function(){
        alert(`That user is already registered`);
    });
    

}

//
function loginToExistingAccount(){
    axios.post('/auth/login',{email:loginEmail.value,password:loginPw.value}).then(function(response){
        console.log(response.data);
        alert('success');
        window.location = response.data.URL;
    }).catch(function(err){
        console.log(err);
    });
   
}



function editAppear(editIndex){
    var showChangeButton= document.getElementById(`save-button${editIndex}`);
    var showEditField = document.getElementById(`edit-field${editIndex}`);
    showChangeButton.style.setProperty("display","block");
    showEditField.style.setProperty("display","block");
}

///function to write "write and get from database begins here"
function editTask(presentTaskId){
    var editTaskInput=document.getElementById(`edit-field${presentTaskId}`);

    axios.put(`/schedule/edit/${editTaskInput.value}/edit/${presentTaskId}`).then(function(response) {
        var user = response;
        console.log(user);
        // alert(`Schedule created for ${name}`);
    }).catch(function(){
        alert(`Please fill form in it's entirety`);
    });
}

function showSchedulerForm(){
    axios.post('/schedule/post', {name:user.value,event:event.value,date:date.value}).then(function(response) {
        var user = response;
        console.log(user);
        // alert(`Schedule created for ${name}`);
    }).catch(function(){
        alert(`Please fill form in it's entirety`);
    });
}

function showSchedule(){
    
    axios.get('/schedule/get').then(function(response) {
        var user = response.data;
        console.log(user);
        arrayIndex=0;
        var grabbedTask=response.data[arrayIndex].name;
        var id = response.data[arrayIndex].id;
      
        response.data.forEach(function(task){
            console.log(task);
            var name= task.name;
            var id = task.id;
            var grabbedTask= task.event;
            scheduleShow.innerHTML+=
            
            `<div style:"block;" id=${id}>
                <li id="list-${id}">${grabbedTask}</li> <span>
                <span class="tex-align:center" >
                    <button type="button" onclick="deleteSchedule(${id})" class= "btn-primary" >Delete</button>
                    <button type="button" onclick="completeTask(${id})" class= "btn-primary" >Complete</button>
                    <button type="button" onclick="editAppear(${id})" class= "btn-primary" >Edit</button>
                    <input id="edit-field${id}" style="display:none;"  type="text" class="form-control" >
                    <button id="save-button${id}" style="display:none;"  type="button" onclick="editTask(${id})"  class= "btn-primary" >Save Change</button>
                </span>
            </div>`;               
        });
    });
}




function deleteSchedule(idNumber){
    axios.delete(`/schedule/delete/${idNumber}`).then(function(response) {
        var user = response.data.username;
        console.log(user);
        alert(`Account created for ${user}`);
    }).catch(function(){
        alert(`That user is already registered`);
    });
}






// // CALENDAR JS
// var date = Date.now() //Initializing Date Object.
// //creates a Date object pointing to the current moment in time.

// function displayCalendar(){
 
 
//  var htmlContent ="";
//  var FebNumberOfDays ="";
//  var counter = 1;
 
 
//  var dateNow = new Date();
//  var month = dateNow.getMonth();

//  var nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
//  var prevMonth = month -1;
//  var day = dateNow.getDate();
//  var year = dateNow.getFullYear();
 
 
//  //Determing if February (28,or 29)  
//  if (month == 1){
//     if ( (year%100!=0) && (year%4==0) || (year%400==0)){
//       FebNumberOfDays = 29;
//     }else{
//       FebNumberOfDays = 28;
//     }
//  }
 
 
//  // names of months and week days.
//  var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
//  var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
//  var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"]
 
 
//  // days in previous month and next one , and day of week.
//  var nextDate = new Date(nextMonth +' 1 ,'+year);
//  var weekdays= nextDate.getDay();
//  var weekdays2 = weekdays
//  var numOfDays = dayPerMonth[month];
     
 
 
 
//  // this leave a white space for days of pervious month.
//  while (weekdays>0){
//     htmlContent += "<td class='monthPre'></td>";
 
//  // used in next loop.
//      weekdays--;
//  }
 
//  // loop to build the calander body.
//  while (counter <= numOfDays){
 
//      // When to start new line.
//     if (weekdays2 > 6){
//         weekdays2 = 0;
//         htmlContent += "</tr><tr>";
//     }
 
 
 
//     // if counter is current day.
//     // highlight current day using the CSS defined in header.
//     if (counter == day){
//         htmlContent +="<td class='dayNow'  onMouseOver='this.style.background=\"#FF0000\"; this.style.color=\"#FFFFFF\"' "+
//         "onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>"+counter+"</td>";
//     }else{
//         htmlContent +="<td class='monthNow' onMouseOver='this.style.background=\"#FF0000\"'"+
//         " onMouseOut='this.style.background=\"#FFFFFF\"'><button>"+counter+"</button><div>Event</div></td>";    
 
//     }
    
//     weekdays2++;
//     counter++;
//  }
 
 
 
//  // building the calendar html body.
//  var calendarBody = "<table class='calendar'> <tr class='monthNow'><th colspan='7'>"
//  +monthNames[month]+" "+ year +"</th></tr>";
//  calendarBody +="<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>"+
//  "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
//  calendarBody += "<tr>";
//  calendarBody += htmlContent;
//  calendarBody += "</tr></table>";
//  // set the content of div .
//  document.getElementById("calendar").innerHTML=calendarBody;
 
// }


// displayCalendar();








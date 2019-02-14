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
var hours = document.getElementById("hours-for-schedule");
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

function cancel(){
    location.reload();
}

function createNewAccount(){
    axios.post('/auth/register', { username: userName.value, email: userEmail.value, password: userPassword.value }).then(function(response) {
        var user = response.data.username;
        console.log(user);
        alert(`Account created for ${user}`);
        location.reload();
        alert("please login after creating account");
    }).catch(function(){
        alert(`Error in loggin in`);
    });
}

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


function editTask(presentTaskId){
    var editTaskInput=document.getElementById(`edit-field${presentTaskId}`);
    axios.put('/schedule/put', {event:editTaskInput.value,id:presentTaskId}).then(function(response) {
        var user = response.data;
        var id= document.getElementById(`list-${presentTaskId}`);
        id.innerHTML=`${user.event}`;
        alert('Change was Successful');
        location.reload();
    }).catch(function(){
        alert(`Please fill form in it's entirety`);
    });
    var showChangeButton= document.getElementById(`save-button${presentTaskId}`);
    var showEditField = document.getElementById(`edit-field${presentTaskId}`);
    showChangeButton.style.setProperty("display","none");
    showEditField.style.setProperty("display","none");
}

function showSchedulerForm(){
    axios.post('/schedule/post', {name:user.value,event:event.value,hours:hours.value}).then(function(response) {
        var user = response.data;
        console.log(user);
        alert(`Task created!`);
        location.reload();
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
        var hours = response.data[arrayIndex].hours
        var id = response.data[arrayIndex].id;
        response.data.forEach(function(task){
            console.log(task);
            var name= task.name;
            var id = task.id;
            var hours = task.hours;
            var grabbedTask= task.event;
            scheduleShow.innerHTML+=
                    
                   `<div id=${id}  class="row renderedSchedule">
                   <div class="col-3 individual">${name}</div>
                   <div id="list-${id}" class="col-3 individual">${grabbedTask}<input id="edit-field${id}" style="display:none;"  type="text" class="form-control" ></div>
                   <div class="col-3 individual">${hours}</div>
                   <div class="col-3 individual">
                        <button type="button" onclick="deleteSchedule(${id})" class= "btn-primary" >Delete</button>
                        <button type="button" onclick="editAppear(${id})" class= "btn-primary" >Edit</button><div>
                       <button id="save-button${id}" style="display:none;"  type="button" onclick="editTask(${id})"  class= "btn-primary" >Save Change</button>
                   </div>`           
        });
    });
    
}

function deleteSchedule(idNumber){
    axios.delete(`/schedule/delete/${idNumber}`,{id:idNumber}).then(function(response) {
        console.log(idNumber);
        var user = response.data;
        console.log(user);
        alert(`${response.data.status}`);
        location.reload();
    }).catch(function(){
        alert(`That user is already registered`);
    });
}

function logOutButton(){
    axios.get('/auth/logout').then(function(response) {
        console.log(response);
        window.location=response.data.URL;
    });
};








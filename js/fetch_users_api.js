var check_logged=false;
var baseobj=document.createElement("script");
baseobj.type="text/javascript";
baseobj.src="js/base.js";
document.body.appendChild(baseobj);

function userLogin(){

var emailobj=document.getElementById('emaillogin').value;
var passwordobj=document.getElementById('password2').value;

//if (getLocalStorage('user_token')){
//        alert("You are logged.");
//        window.location.href="../user_profile.html";
//        return false;
//}

  if (!emailobj){          
          alert("please input your email address.");
          return false;
  }
  if(!passwordobj){
          alert("please input your password.");
          return false;
  }

  
 fetch('https://fetapi.herokuapp.com/api/users/v1/login/',{
        method: 'POST',
        headers:{
                'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
			email: emailobj,
			password: passwordobj
		}),                   
 }).then(function(response){
        if (response.ok){     
           check_logged=true;                               
           alert("You are logged!!");
           return response.json();                                 
        }
        alert ("Error: " + response.statusText +". " + "Please check your credential." );
        return false;
 }).then(function(result){
        if(check_logged){ 
          var tokens=JSON.stringify(result);
          var data=JSON.parse(tokens);        
          setLocalStorage('user_token',data.access);
          setLocalStorage('refresh_token',data.refresh);        
          console.log(result);  
          window.location.href="../user_profile.html";    
          check_logged=false;         
        }
        return false;
 }).catch(function(error){        
        alert('Oops: something responses error.' + ' Status:' + error.message);
        }) 

        return false;
}

function userRegister(){
        var fullnameobj=document.getElementById('fullname').value;
        var phoneobj=document.getElementById('phoneNumber').value;
        var genderobj=document.getElementById('gender').value;
        var usernameobj=document.getElementById('username').value;
        var emailaddressobj=document.getElementById('emaillogin').value;
        var password1obj=document.getElementById('password2').value;
        var password2obj=document.getElementById('passwordConfirmation').value;

        if (password1obj!=password2obj){          
                alert("Your password is mismatch. Please check.");
                return false;
        }

        Check_Invitation_Code(usernameobj)
        
        fetch('https://fetapi.herokuapp.com/api/users/v1/register/',{
        method: 'POST',
        headers:{
                'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
                        mb_account: fullnameobj,
			mb_invite_code: usernameobj,
                        mobile_phone: phoneobj,
                        email: emailaddressobj,
                        password: password1obj,
                        password2: password2obj,
                        gender: genderobj
		}),       
        }).then(function(response){
                if (response.ok){     
                   check_logged=true;                               
                   alert("Your account is created!!");
                   userLogin();
                   return false;                                 
                }
                alert ("Error: " + response.statusText +". " + "Please check them." );
                return false;
        }).then(function(result){
                if(check_logged){                                                
                console.log(result);
                check_logged=false;
                }
        }).catch(function(error){        
                alert('Oops: something responses error.' + ' Status:' + error.message);
                }) 

        return false;
}

function userLogout(){
        var bearer_token=getLocalStorage('user_token');        
        var bearer = 'Bearer ' + bearer_token;              
        fetch('https://fetapi.herokuapp.com/api/users/v1/logout/',{
        method: 'POST',                
        headers:{      
                'Content-Type': 'application/json',          
                'Authorization': bearer                
        },
        mode: 'cors',
}).then(function(response){
        if (response.ok){             
           check_logged=true;                       
           alert("You successfully logged out.");  
           return false;                                          
        }
        alert ("Error: " + response.statusText +". " + "Please check your credential." );
        return false;
}).then(function(result){
        if (check_logged){                 
        console.log(result);          
        deleteLocalStorage('user_token');
        deleteLocalStorage('refresh_token');           
        window.location.href="../index.html";
        check_logged=false;             
        }
 }).catch(function(error){        
        alert('Oops: something responses error.' + ' Status:' + error.message);
        }) 

        return false;
}

function userResetPassword(){  

}

function IsUserOnline(){
        alert("Waiting for this function.")
}

function Check_Invitation_Code(invitecode){
        
}
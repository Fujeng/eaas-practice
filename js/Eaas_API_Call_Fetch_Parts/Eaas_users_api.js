//import * as Yup from 'yup';

var check_logged=false;
var baseobj=document.createElement("script");
baseobj.type="text/javascript";
baseobj.src="js/base.js";
document.body.appendChild(baseobj);

function userLogin(){
        
                var email=document.getElementById('email').value;
                var password=document.getElementById('password').value;
                        
        //      let url='http://localhost:1337/api/auth/local';
                let url='https://eaas.herokuapp.com/api/auth/local';

                  fetch(url,{
                        method: 'POST',
                        headers:{
                                'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                                        identifier: email,
                                        password: password
                                }),                   
                 }).then(function(response){
                        if (response.ok){     
                           check_logged=true;                               
                           alert("You are logged and user profile should be displayed!!");
                           return response.json();                                 
                        }                        
                        alert ("Calling API Error: " + response.statusText +". "+ "Please check your credential." );                        
                        return false;
                 }).then(function(result){
                        if(check_logged){ 
                          var tokens=JSON.stringify(result);
                          var data=JSON.parse(tokens);                                
                          setLocalStorage('user_token',data.jwt);
                          //setLocalStorage('user_token',data.access);
                          //setLocalStorage('refresh_token',data.refresh);        
                          console.log(result);  
                          window.location.href="../user_profile.html";    
                          check_logged=false;         
                        }
                        return false;
                 }).catch(function(error){        
                        alert('Oops: something responses error when calling the API.' + ' Status:' + error.message);
                        }) 
                
                        return false;
                  // Submit the form to your server here
               // } catch (error) {
               //   alert(error.errors);
               //   return false;
               // }
              //});
       
//if (getLocalStorage('user_token')){
//        alert("You are logged.");
//        window.location.href="../user_profile.html";
//        return false;
//}

 // if (!emailobj){          
 //         alert("please input your email address.");
 //         return false;
 // }
 // if(!passwordobj){
 //         alert("please input your password.");
 //         return false;
 // } 
 
}

function userRegister(){
        
        var username=document.getElementById('fullname').value;
        var phonenumber=document.getElementById('phonenumber').value;
        var gender=document.getElementById('gender').value;
        var introducer=document.getElementById('introducer').value;
        var email=document.getElementById('email').value;
        var password=document.getElementById('password').value;
        var repeatpassword=document.getElementById('repeatpassword').value;
   
        if (password!=repeatpassword){          
                alert("Warning: Your password must matched. Please check them again.");
                return false;
        }

           
        //let url='http://localhost:1337/api/auth/local/register';
        let url='https://eaas.herokuapp.com/api/auth/local/register';
        
             fetch(url,{
                method: 'POST',
                headers:{
                        'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                                username: username,
        			mb_invite_code: introducer,
                                mb_mobile: phonenumber,
                                email: email,
                                password: password,                        
                                mb_gender: gender,
                                mb_reg_time: Date.now()
	        	}),       
                }).then(function(response){
                        if (response.ok){     
                           check_logged=true;                               
                           alert("Your account is created and confirmation message has been sent already.\n Please check and open it thru your mailbox!!");   
                           window.location.href="../index.html";                           
                           return true;                                 
                        }
                        alert ("Calling API Error: " + response.statusText +". " + "Please check the related registration information." );
                        return false;
                }).then(function(result){
                        if(check_logged){                                                
                                console.log(result);
                                check_logged=false;
                        }
                }).catch(function(error){        
                        alert('Oops: something responses error when calling the API.' + ' Status:' + error.message);
                        }) 

                return false;
}

function userLogout(){
        var bearer_token=getLocalStorage('user_token');        
        var bearer = 'Bearer ' + bearer_token;        
        //let url='https://fetapi.herokuapp.com/api/users/v1/logout/'
        let url='http://localhost:1337/api/auth/logout';
        
        fetch(url,{
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
        alert ("Calling API Error: " + response.statusText +". " + "Please check your credential." );
        return false;
}).then(function(result){
        if (check_logged){                 
        console.log(result);                  
        deleteLocalStorage('user_token');
        //deleteLocalStorage('user_token');
        //deleteLocalStorage('refresh_token');           
        window.location.href="../index.html";
        check_logged=false;             
        }
 }).catch(function(error){        
        alert('Oops: something responses error when calling the API.' + ' Status:' + error.message);
        }) 

        return false;
}

function userResetPassword(){  
        const result_value=new Boolean(true);

        var email_address=document.getElementById('email-reset').value;        

        let url1='https://eaas.herokuapp.com/api/users?filters[$and][0][email][$eq]=';
        let url2=url1.concat(email_address);
        
        // Query userprofile by email

        //result_value=QueryUserProfile(url2);
        //alert(result_value);
        
        //let url='http://localhost:1337/api/auth/forgot-password';
        

        let url='https://eaas.herokuapp.com/api/auth/forgot-password';

        fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({
                  email: email_address               
                }),
              }).then(function(response){
                if (response.ok){                                                        
                    alert("Your request is accepted already. \n Please check your email for changing password.");  
                    window.location.href="../index.html";
                    return true;                                          
                     }
                    alert ("Calling API Error: " + response.statusText +". " + "Please check your email address." );
                    return false;
              }).catch(function(error){
                alert('Oops: something responses error when calling the API.' + ' Status:' + error.message);
              })
              return false;
              
}

function userResetPasswordAction(){
        var new_password=document.getElementById('password').value;
        var rep_password=document.getElementById('repeatpassword').value;
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('code');
        
        if (new_password!=rep_password){
           alert("Warning: Your password must matched. Please check them again.");
           return false;
        }        

        let url='https://eaas.herokuapp.com/api/auth/reset-password';

               fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify({
                  password: new_password,
                  passwordConfirmation: rep_password,
                  code: urlToken
                }),
              }).then(function(response){
                if (response.ok){                                                        
                    alert("Your password is changed. \n Please logon our system by new password.");  
                    window.location.href="../user_logon.html";
                    return true;                                          
                     }
                    alert ("Calling API Error: " + response.statusText +". " + "Please check your new password." );
                    return false;
              }).catch(function(error){
                alert('Oops: something responses error when calling the API.' + ' Status:' + error.message);
              })
              return false;
}

function IsUserOnline(){
        
}

function IsInviteCodeExist(){

}

function QueryUserProfile(url2){
        //Find public users              
        alert(url2);
        return fetch(url2, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
         },
        mode: 'cors',
        }).then(function(response){
           if (response.ok){    
                return response.json();                
           }
           alert ("Calling API Error: " + response.statusText +". " + "Please check your search keyword." );        
           return false;
        }).then(function(result){
             var userdata=JSON.stringify(result); 
             let userdata_json=userdata(0);
             var data_set=JSON.parse(userdata_json);  
             alert(data_set);   
             if (data_set.email===''){
                alert('System does not find user data.\n Please check your search keyword again.');
                return false;
             }                         
             return true;
        }).catch(function(error){
           alert('Oops: something responses error when calling the API.' + ' Status:' + error.message);
        })
        return false;
}
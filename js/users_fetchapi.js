function userLogin(){

    var emailobj=document.getElementById('email').value;
    var passwordobj=document.getElementById('password').value;
    
      if (!emailobj){          
              alert("please input your email address.");
              return false;
      }
      if(!passwordobj){
              alert("please input your password.");
              return false;
      }
    
  fetch("https://fetapi.herokuapp.com/api/users/v1/login/",{
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                  email : emailobj,
                  password : passwordobj          
            }),
            headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8"})
            })
            .then(res=>{res.jason();})
            .then(result=>{console.log(result);});
            alert("You are logged!!")
    }
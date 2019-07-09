var todoList=function(text){      //todo list object
    this.name=text;  //the todo text
    this.inerDiv=document.createElement("div");   //make div
    this.inerDiv.id=(this.name);
    mainDiv.appendChild(this.inerDiv);
    this.newSpan=document.createElement("span")
    this.textNode = document.createTextNode(this.name);  //make text
    this.newSpan.appendChild(this.textNode);
    this.newSpan.style.fontSize="20px";
    this.newSpan.style.marginRight="50px";
    this.newSpan.style.color="Gold";
    this.inerDiv.appendChild(this.newSpan);
    this.deleteBtn=document.createElement("button");  //make delete button
    this.deleteBtn.innerHTML = "Delete";
    this.deleteBtn.name=this.name;
    //this.deleteBtn.style.padding="16px 16px";
    this.inerDiv.appendChild(this.deleteBtn);
    this.chkBox=document.createElement("input");  //make chk box
    this.chkBox.type=("checkbox");
    this.chkBox.checked = false;
    this.chkBox.name=this.name;
    this.chkBox.style.width="100px";
    this.chkBox.style.height="25px";
    //this.chkBox.style.margin="1px";
    this.inerDiv.appendChild(this.chkBox);
    

}

var users=function(name){     //users object
    this.todoArray=[] ;
    this.userName=name;
}

var id=0;
var inputText=document.getElementById("toList");
var addBtn=document.getElementById("add");
var mainDiv=document.getElementById("main");
var checkDiv=document.getElementById("checked");
var srchBtn=document.getElementById("search");
var userNames=document.getElementById("userNames");
var addUser=document.getElementById("Adduser");
var userValue=document.getElementById("userValue");
var signBtn=document.getElementById("signin");
var searchBtn=document.getElementById("searchBtn");
var searchLst=document.getElementById("searchLst");
var searchArea=document.getElementById("search");
var showAllBtn=document.getElementById("showAll");
var reqDiv=document.getElementById("reqDiv");

var userList;
var data=[];



  

addBtn.addEventListener("click",addNew);
addUser.addEventListener("click",addNewUser);
signBtn.addEventListener("click",signIn);
searchBtn.addEventListener("click",displaySearch);  
showAllBtn.addEventListener("click",signIn);

var usersArray=[];
var userFound=false;

function initUsers() {
    for ( var i = 0 ; i < localStorage.length; ++i ) {   //initilization
        var myKey=localStorage.key( i ) ;  
        userNames.insertAdjacentHTML('beforeend', '<option value="'+myKey+'" >');
        userList=new users(myKey);               
        userList.todoArray=JSON.parse(localStorage.getItem(myKey));
        //console.log(userList.todoArray);
        usersArray.push(userList);
        //console.log(usersArray);
    
      }
}

initUsers();

console.log(usersArray);

function checkRequired() {
    if(userValue.value==""){
        console.log("called");
        
        reqDiv.innerHTML="Please enter a name First";      
        return false;
    }
    else {
        reqDiv.innerHTML="";
        return true;}
    
}

function addNewUser(){   //add new user
    checkDiv.innerHTML="";
    mainDiv.innerHTML="";
    searchArea.value="";
    inputText.value="";
    userFound=false;
    if(!checkRequired()){
        return;
    }
    usersArray.forEach(function(user) {
        if(user.userName==userValue.value){
            reqDiv.innerHTML="this user name is already taken Sign-in or choose a different name";
            userFound=true;
        }
        
    })
    if(userFound){
        console.log("called return");
        
        return;
    }
    userList=new users(userValue.value);
    usersArray.push(userList);
  console.log(userList);
   userNames.insertAdjacentHTML('beforeend', '<option value="'+userValue.value+'" >');  
   localStorage.setItem(userValue.value,JSON.stringify("")); 
   if(userValue.value!=""){
   // getTodo();
}
       
}
 
function signIn(){    //sign-in
    console.log(usersArray);
    checkDiv.innerHTML="";
    searchArea.value="";
    inputText.value="";
    if(!checkRequired()){
        return;
    }
    if(userValue.value!=0){
        getTodo();}
}

function addNew(){    //make new to do
    
    
    if(inputText.value==""){
        return;
    }
    usersArray.forEach(function(user){
        if(user.userName==userValue.value){
            console.log(user.userName);
            user.todoArray=user.todoArray||[];
            
            user.todoArray.push({task:inputText.value,checked:false}); 
            console.log(user.todoArray);
            
            localStorage.setItem(userValue.value,JSON.stringify(user.todoArray)); 
        }
    })
    
    if(userValue.value!=0){
   getTodo();}
    inputText.value="";
    
}

function getTodo(){
    data = JSON.parse(localStorage.getItem(userValue.value));
    usersArray.forEach(function(element) {
        if(userValue.value==element.userName){
            userList.todoArray=data;
            //console.log("from getTodo "+userList.todoArray);
        }
    })
    
    
    if(data!=null&&data!=""){
        console.log(data);  
        
    displayTodo(data)    //search in addnew
    startSearch();
}
  
}

function displayChecked(btn){     //display checked
    checkDiv.appendChild(btn.parentNode);
    btn.parentNode.firstElementChild.style.textDecoration="line-through";  //////////////////////
}

function displayTodo(data){   //desplay to do list
    mainDiv.innerHTML="";
    checkDiv.innerHTML="";
    data.forEach(function(element){
        var newList=new todoList(element.task);
        if(element.checked==true){
            newList.chkBox.checked=true;
            displayChecked(newList.chkBox);
        }
        newList.deleteBtn.addEventListener("click",deleteTodo);
        newList.chkBox.addEventListener("change",moveChecked);
    })

}

function deleteTodo(e){       //delete button   
    var grandParrent= e.target.parentNode.parentNode
    grandParrent.removeChild(e.target.parentNode);
    usersArray.forEach(function (user){
        if(user.userName==userValue.value){
            console.log(user.todoArray);
            
            var filtered=user.todoArray.filter(function(value, index, arr){  
                if(e.target.name!=value.task){
                    return value;
                }
            }
                
            )
           
           user.todoArray=filtered;   
           localStorage.setItem(user.userName,JSON.stringify(user.todoArray));
        }
    })
    
    
    startSearch();
    

}

function isChecked(chkBtn){

    if(chkBtn.checked==false){
        console.log("checked");
        
        usersArray.forEach(function (user){
            if(user.userName==userValue.value){
                user.todoArray.forEach(function(usrTask){
                    if(usrTask.task==chkBtn.name){
                        usrTask.checked=false;
                        localStorage.setItem(user.userName,JSON.stringify(user.todoArray));  
                    }
                })
    
            }
        })
    return false;}

   else {
    console.log("not checked");
       
    usersArray.forEach(function (user){
        if(user.userName==userValue.value){
            user.todoArray.forEach(function(usrTask){
                if(usrTask.task==chkBtn.name){
                    usrTask.checked=true;
                    localStorage.setItem(user.userName,JSON.stringify(user.todoArray));  
                }
            })

        }
    })
    return true;
}
}

function moveChecked(e){
   // e.target.checked=true;
   var chk=isChecked(e.target)
   if(chk==false){
       console.log("called");
       
       mainDiv.appendChild(e.target.parentNode);
       e.target.parentNode.firstElementChild.style.textDecoration="none";
   }
   else{
    displayChecked(e.target);
   // checkDiv.appendChild(e.target.parentNode);
    //e.target.parentNode.firstElementChild.style.textDecoration="line-through";
    }   ///////
}

function startSearch(){
    searchLst.innerHTML="";
    usersArray.forEach(function(user){
        if(user.userName==userValue.value){
            user.todoArray.forEach(function(taskElement){
                searchLst.insertAdjacentHTML('beforeend', '<option value="'+taskElement.task+'" >'); 
            })
        }
    })
}

function displaySearch(){
    mainDiv.innerHTML="";
    checkDiv.innerHTML="";
    usersArray.forEach(function (user) {
        if(user.userName==userValue.value){
            user.todoArray.forEach(function (taskElement){
                if(taskElement.task==searchArea.value){
                    var newList=new todoList(taskElement.task);
                    if(taskElement.checked==true){
                        newList.chkBox.checked=true;
                        displayChecked(newList.chkBox);
                }
        newList.deleteBtn.addEventListener("click",deleteTodo);
        newList.chkBox.addEventListener("change",moveChecked);

                }
                
            })
        }
        
    })
    if(mainDiv.innerHTML==""&&checkDiv.innerHTML==""){
                   
            mainDiv.innerHTML="No Results Found";
        
    }
}

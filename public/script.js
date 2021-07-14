

var divAddProducts=document.getElementById("listDiv");
var buttonClick=document.getElementById('button1');
var inputArea=document.getElementById('inputArea');
var main_div=document.getElementById('main-div');
var closebtn=document.getElementsByClassName('close');
var image=document.getElementById('image');



var elementId=0;

var request = new XMLHttpRequest();

request.addEventListener("load", function(response){
    console.log(response.target);
    var data = JSON.parse(response.target.responseText);

    data.forEach(function(data,index){
      elementId=data.id?data.id+1:1;
      createBlock(data);
    })
  });
  request.open('get','/data');
  request.send();





buttonClick.addEventListener("click",function(event){
  addNewProduct();
});

function addNewProduct(){
  var content=inputArea.value
  

 if(content) {
   var file=image.files[0];
   console.log(file);
  var abc=new Object();
  abc.id=elementId;
  abc.name=content;
  abc.isChecked=false;
  abc.src=content+elementId;
  console.log(abc);
 
  elementId++;


  var request=new XMLHttpRequest();
   request.addEventListener("load",function(response){
     console.log(response.target);
     inputArea.value=""
   })
     request.open('post','/upload');
     request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(abc));

  var formData = new FormData();
  formData.append('profile_pic',file,abc.src) 
  formData.append('name',abc.src)
  uploadPic(formData,function(){
    createBlock(abc);
  })
}
else{
  alert('Enter something');
}
}
function uploadPic(formData,callback){
  console.log('hello');
var request=new XMLHttpRequest();
request.open("POST",'/uploadphoto')
request.addEventListener("load",function(response){
  callback();
})
request.send(formData);

}
function createBlock(abc){
//single main div
  var newDiv=document.createElement("div");
  newDiv.setAttribute("class","single-div");
  newDiv.setAttribute("id",abc.id);


//heading for the input 
  var h4Name=document.createElement('h4');
  h4Name.innerHTML=abc.name;
  newDiv.appendChild(h4Name);



//cross for deletion 
  var xDelete=document.createElement('span');
  xDelete.setAttribute("class","close");
  xDelete.setAttribute('id',abc.id);
  xDelete.innerHTML="x";
  newDiv.appendChild(xDelete);

  xDelete.addEventListener("click",function(event){
      var selectIndex=parseInt(newDiv.id);
      newDiv.remove(selectIndex);
    deleteElement(selectIndex);
   
  });

//checkbox for line 
  var checkBox=document.createElement("input");
  checkBox.setAttribute('type','checkbox');
  checkBox.setAttribute('class','checkbox');
  if(abc.isChecked){
    h4Name.style.textDecoration='line-through';
    checkBox.checked=true;

  }

  newDiv.appendChild(checkBox);

var img=document.createElement('img');
img.setAttribute('src',abc.name+abc.id+'.jpg');
img.style.width='40px';
newDiv.appendChild(img);

  checkBox.addEventListener("click",function(event){
    var selectIndex=parseInt(newDiv.id);
    updateElement(selectIndex);
    if(checkBox.checked){
        abc.isChecked=true;
       h4Name.style.textDecoration='line-through';
       
    }
    else{
      abc.isChecked=false;
        h4Name.style.textDecoration='none';
    }
  })
      

  //appending single div to main div
  main_div.appendChild(newDiv);
  
}


function deleteElement(id){
  var request = new XMLHttpRequest();
  request.open('post','/delete');
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({"id":id}));

}

function updateElement(id){
  var request = new XMLHttpRequest();
  request.open('post','/update');
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({"id":id}));

}











const express=require("express");
const bodyParser=require("body-parser");
const request =require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  const data={
    members :[
      {
        email_address:email,
        status :"subscribed",
        merge_fields :{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us8.api.mailchimp.com/3.0/lists/2e8e3590e7";
  const options={
    method :"POST",
    auth :"SaiDinesh28:79e579b04b5a64ead45fb84e3a37c935-us8"
  }
const request=  https.request(url,options,function(response){
  if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
  }
  else {
    res.sendFile(__dirname+"/failure.html");
  }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
  });
  request.write(jsonData);
  request.end();
  //console.log(firstName,lastName,email);
});

app.post("/failure",function(req,res){
 res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});
// mailchimp API key
// 79e579b04b5a64ead45fb84e3a37c935-us8
//2e8e3590e7  list id

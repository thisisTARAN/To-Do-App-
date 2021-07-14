const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 2000;

var multer  = require('multer')

var storage = multer.diskStorage({

    destination: function (req, file, callback) {

        callback(null,'Images');

    },
    filename: function (req, file, cb) {
        console.log(file);
        console.log(req.name);
        cb(null, file.originalname+'.jpg');
      }
    })
    var upload = multer({ 
        storage: storage
    })

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Images')));

app.post('/upload',function(req,res){
    // console.log(req.body);
    // res.send();
    fs.readFile("./data.txt", "utf-8",function(err_r, f_data){
        f_data = f_data.length ? JSON.parse(f_data) : [];
        console.log(req.body);
        f_data.push(req.body);
        fs.writeFile("./data.txt", JSON.stringify(f_data), function(err, data)
    {
        if(err)
        {
            res.end("err")
        }
        else
        {
            res.end()
        }
    })
    })
    
})
app.post("/uploadphoto", upload.single('profile_pic'),function (req,res) {

    console.log(req.body,134)
    
    res.send(req.body)
})
app.post('/delete',function(req,res){
    fs.readFile('./data.txt',"utf-8",function(err_r, f_data){
        f_data = f_data.length ? JSON.parse(f_data) : [];
       for(i in f_data){
           if(f_data[i].id===req.body.id){
            fs.unlink("Images/"+f_data[i].src+'.jpg', function(err)
            {
                console.log(err,12345)
            })
            f_data.splice(i,1);
            break;
           }
       }
    fs.writeFile("./data.txt", JSON.stringify(f_data), function(err, data)
{
    if(err)
    {
        res.end("err")
    }
    else
    {
        res.end()
    }
})

})
});
app.post('/update',function(req,res){
    fs.readFile('./data.txt',"utf-8",function(err_r, f_data){
        f_data = f_data.length ? JSON.parse(f_data) : [];
       for(i in f_data){
           if(f_data[i].id===req.body.id){
            f_data[i].isChecked=!f_data[i].isChecked;
            break;
           }
       }
    fs.writeFile("./data.txt", JSON.stringify(f_data), function(err, data)
{
    if(err)
    {
        res.end("err")
    }
    else
    {
        res.end()
    }
})

})
});

app.get("/data", function(req, res)
{
    fs.readFile("./data.txt", "utf-8",function(err_r, f_data)
    {
        res.end(f_data);
    
    })
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
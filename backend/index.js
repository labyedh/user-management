const express= require('express');
const bodyparser=require('body-parser');
const mysql=require('mysql2');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(bodyparser.json());
const db=mysql.createConnection(
  {  host:"51.178.46.248",
    user:"stage",
    password:"Stage2023",
    database:"network",
});
app.listen(3200,()=>{
    console.log("server is running on 3200 port");   
   });
db.connect(err => {
    if(err) throw err;
    console.log("connected Successfully");
});
app.get('/user',(req,res)=>{
    let sql="SELECT * FROM user";
    db.query(sql,(err,result)=>{
        if (err) throw err;
        if(result.length>0)
        {
            res.send({
                message:"All users Data",
                data:result
            });
        };
    });
});
app.get('/user/:id',(req,res)=>{
    let sql="SELECT * FROM user where id=?";
    db.query(sql,[req.params.id],(err,result)=>{
        if (err) throw err;
        if(result.length>0)
        {
            res.send({
                message:"Get data by ID",
                data:result
            });
        }
        else{
            res.send({
                message:"data not found dear!"
            });
        };
    });
});
app.post('/user',(req,res)=>{
    let login=req.body.login;
    let password=req.body.password;
    let sql =`INSERT INTO user(login,password) VALUES(?,?)`;
    db.query(sql,[login,password],(err,result)=>{
        if (err) {console.log(err)};

            res.send({
                message:"data created successufully",
                data:result

    });
});
});
app.put('/user/:id',(req,res)=>{
    let id=req.params.id;
    let login=req.body.login;
    let password=req.body.password;
    sql=`update user set login=?,password=? where id=?`;
    db.query(sql,[login,password,id],(err,result)=>{
        if (err) throw err;
        res.send({
            message:"data updated succussefully",
            data:result
        });
    });
});
app.delete('/user/:id',(req,res)=>{
    let id=req.params.id;
    sql=`delete from user where id=?`
    db.query(sql,[id],(err,result)=>{
        if (err) throw err;
        res.send({
            message:"data removed succussefully",
            data:result
        });
    });
});
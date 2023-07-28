const express = require('express');
const app = express();
const mysql = require("mysql");
const { body, validationResult } = require('express-validator');
const cors = require("cors");
const nodemailer = require("nodemailer");
app.use(cors());
app.use(express.json());
//資料庫連結
const db = mysql.createConnection({
  user: "madoka",
  host: "127.0.0.1",
  password: "ABCd@12345",
  database: "equipmentsys",
});
//驗證碼產生
function generateVerificationCode() {
  const codeLength = 4;
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    code += Math.floor(Math.random() * 10); // 生成 0 到 9 之间的随机数
  }
  
  return code;
}
let code = '';




//登入
app.post("/login",(req,res)=>{
 const email = req.body.email;
 const pwd = req.body.pwd;
 db.query(
  "SELECT name,pwd FROM member WHERE email = ?",
  [email],
  (err,result) => {
    if(err){
      res.send('backend error');
      console.log(err);
    }else if(pwd===result[0].pwd){
      res.send('welcome   ' + result[0].name);
    }else {
      res.send('account or password error');
    }    
  }
  );
});
//發送驗證碼
app.post("/sendcode",(req,res)=>{
  const email = req.body.email;
  db.query(
   "SELECT email,pwd FROM member WHERE email = ?",
   [email],
   (err,result) => {
     if(err){
       res.send(false);
       console.log(err);
     }else{
      code = generateVerificationCode();
      // 创建一个邮件传输对象
      const transporter = nodemailer.createTransport({
      service: 'Gmail',
        auth: {
        user: result[0].email, // 发送方的 Gmail 邮箱地址
        pass: result[0].pwd // 发送方的 Gmail 邮箱密码或授权码
        }
        
      });
      // 设置邮件内容
      const mailOptions = {
      from: 'brian871212@gmail.com', // 发送方的 Gmail 邮箱地址
      to: result[0].email, // 接收方的邮箱地址
      subject: '魔法少女小圓測試驗證碼!!!', // 邮件主题
      text: code // 邮件正文
      };
      // 发送邮件
      transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
      });
      console.log(code);
      res.send(code);
     }}
   );
 });
//驗證驗證碼
app.post("/checkcode",(req,res)=>{
  const tmpcode = req.body.code;
  if(tmpcode === code){
    console.log('驗證碼true');
    res.send(true);
  }else{
    console.log('驗證碼錯誤 你的傳過來的驗證碼:',tmpcode);
    res.send(false);
  }

 });
//註冊
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const pwd = req.body.pwd;
  
  db.query(
    "SELECT * FROM member",
    (err,result) => {
      if(err){
        res.send('backend error');
        console.log(err);
      }
      const resultLength = result.length;
      for(let i = 0; i<resultLength; i++){
        if(username === result[i].name){
          res.send('username conflict');
          console.log(result[i].name);
          break;
        }else if(email === result[i].email){
          res.send('email conflict');
          console.log(result[i].email);
          break;
        }else if(pwd === result[i].pwd){
          res.send('password conflict');
          console.log(result[i].pwd);
          break;
        }else{
          db.query(
            "INSERT INTO member (name, email, pwd) VALUES (?,?,?)",
            [username, email, pwd],
            (err, result) => {
              if (err) {
                res.send('Insert falied');
                console.log(err);
              } else {
                res.send('Values Inserted');
              }
            }
          );



        }
      }
    }
    );
});
//查詢員工
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM member", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//員工密碼更新
app.put("/update", (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;
  db.query(
    "UPDATE member SET pwd = ? WHERE email = ?",
    [pwd, email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});
//刪除員工
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM member WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//新建設備
app.post("/createequipment", (req, res) => {
  const name = req.body.name;
  const model = req.body.model;
  const category = req.body.category;
  const year = req.body.year;
  const code = req.body.code;
  const position =req.body.position;
  const principal = req.body.principal;
  db.query(
  "INSERT INTO equipment (name, model, category, year, code, position, principal) VALUES (?,?,?,?,?,?,?)",
  [name, model, category, year, code, position, principal],
  (err, result) => {
    if (err) {
      console.log(err);
    }else{
      console.log(result);
    }
  }
);
});
//查詢設備
app.get("/equipment", (req, res) => {
  db.query("SELECT * FROM equipment", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log('HI')
    }
  });
});
//修改設備
app.put("/updateequipment", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const model = req.body.model;
  const category = req.body.category;
  const year = req.body.year;
  const code =req.body.code;
  const principal = req.body.principal;
  db.query(
    "UPDATE equipment SET name = ?  model = ? category = ? year = ? code = ? principal = ? WHERE id = ?",
    [name, model, category, year, code, principal, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//刪除設備
app.delete("/deleteequipment/:position", (req, res) => {
  const position = req.params.position
  console.log('我是position'+position);
  db.query("DELETE FROM equipment WHERE position = ?", position, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

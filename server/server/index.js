const express = require('express');
const app = express();
const mysql = require("mysql");
const { body, validationResult } = require('express-validator');
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs =require('fs');
const readline = require('readline'); 
//建立了一個readline介面的實例rl
const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout 
});
const logFile = 'device_log.txt'; //日誌文件名稱
const mysqlconfig = 'config.ini';//mysql組態檔案的名稱
let user='default';
let host='default';
let password='default';
let database='default';
let code = ''; //存驗證碼
app.use(cors());
app.use(express.json());

// 解析config.ini檔案內容為物件
function parseConfig(data) {
  const config = {};
  const lines = data.split('\n');
  for (const line of lines) {
    const parts = line.split(':');
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      config[key] = value;
    }
  }
  return config;
}
//開始讀取confing.ini檔案
fs.readFile(mysqlconfig,'utf-8',(err, data)=>{
  if(err){
    console.error('無法讀取config.ini檔案:' + err);
    return;
  }
  // 將檔案內容解析為一個物件
  const configData = parseConfig(data);
  // 現在，可以使用configData物件中的變數
   user = configData.user;
   host = configData.host;
   password = configData.password;
   database = configData.database;

  console.log(`使用者名稱: ${user}`);
  console.log(`主機: ${host}`);
  console.log(`密碼: ${password}`);
  console.log(`資料庫: ${database}`);
})
//資料庫連結
const db = mysql.createConnection({
  user: user,
  host: host,
  password: password,
  database: database,
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
      console.log('welcome   ' + result[0].name);
      res.send('welcome   ' + result[0].name);
    }else {
      console.log('account or password error');
      res.send('account or password error');
    }    
  }
  );
 mysqlclose.End();
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
          mysqlclose.End();
          break;
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
  mysqlclose.End();
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
  mysqlclose.End();
});
//刪除員工
app.delete("/delete/:name", (req, res) => {
  const id = req.params.name;
  db.query("DELETE FROM member WHERE name = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  mysqlclose.End();
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
      res.send('false');
    }else{
      console.log('成功新增設備',name,model,code);
      log.whenCreate('Insert',name,code,principal,position,model,category,year)
      res.send('true');
    }
  });
  mysqlclose.End();
});
//查詢設備
app.get("/equipment", (req, res) => {
  db.query("SELECT * FROM equipment", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  mysqlclose.End();
});
//修改設備
app.put("/updateequipment", (req, res) => {
  const name = req.body.name;
  const model = req.body.model;
  const position = req.body.position;
  const category = req.body.category;
  const year = req.body.year;
  const code =req.body.code;
  const principal = req.body.principal;
  const name2 = req.body.name2;
  const model2 = req.body.model2;
  const position2 = req.body.position2;
  const category2 = req.body.category2;
  const year2 = req.body.year2;
  const code2 = req.body.code2;
  const principal2 = req.body.principal2;
  db.query(
    "UPDATE equipment SET name = ?,  model = ?, category = ?, year = ?, code = ?, principal = ? WHERE code = ?",
    [name, model, category, year, code, principal, code],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        log.whenEdit(
          name,
          code,
          principal,
          position,
          model,
          category,
          year,
          name2,
          code2,
          principal2,
          position2,
          model2,
          category2,
          year2
        );
        res.send(true);
      }
    });
  mysqlclose.End();
});
//刪除設備
app.delete("/deleteequipment/:code", (req, res) => {
  const code = req.params.code
  console.log('我是code'+code);
  db.query("DELETE FROM equipment WHERE code = ?", code, (err, result) => {
    if (err) {
      console.log('刪除設備失敗!')
      console.log(err);
      res.send(fasle);
    } else {
      console.log('成功刪除設備!')
      log.whenDelete('del',code)
      console.log(result)
      res.send(true);
    }
  });
});

class Log {
  constructor(logFile) {
    this.logFile = logFile;
  }

  logMessage(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;

    fs.appendFile(this.logFile, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      } else {
        console.log(`Logged: ${logMessage}`);
      }
    });
  }

  whenCreate(name, code, owner, position, model, category, year) {
    const message = `created device: ${name} code: ${code} owner: ${owner} position: ${position} model: ${model} category: ${category} year: ${year}`;
    this.logMessage(message);
  }

  whenEdit(
    name,
    code,
    owner,
    position,
    model,
    category,
    year,
    name2,
    code2,
    owner2,
    position2,
    model2,
    category2,
    year2
  ) {
    const message = `edited device from: device: ${name} code: ${code} owner: ${owner} position: ${position} model: ${model} category: ${category} year: ${year} to device: ${name2} code: ${code2} owner: ${owner2} position: ${position2} model: ${model2} category: ${category2} year: ${year2}`;
    this.logMessage(message);
  }

  whenDelete(code) {
    const message = `deleted a device which code is ${code}`;
    this.logMessage(message);
  }
}
class myclose{
  End(){
  db.end((endErr) => {
    if (endErr) {
      console.error('關閉資料庫連線失敗:', endErr);
    } else {
      console.log('資料庫連線已關閉');
    }
  });
}
}
const mysqlclose = new myclose;
const log = new Log('device_log.txt');


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

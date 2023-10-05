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
console.log("you program have stated");
import './twoandtwo.css';
import React, { useState } from 'react';
import Axios from "axios";
import Twoandtwomainpage from './twoandtwomainpage/twoandtwomainpage.js';


// 主组件
const Twoandtwo = (props) => {

    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword,setNewpassowrd] = useState('');
    const [tmpcode,setTmpcode]= useState('');
    const [code,setCode] = useState('');

    //username的HOOK數值變更
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
    //password的HOOK數值變更
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    //email的HOOK數值變更
    const handleEmailChange = (event)=>{
      setEmail(event.target.value);
    };
    //newpassword的Hook數值變更
    const handleNewPasswordChange = (event) =>{
      setNewpassowrd(event.target.value);
    }
    //code的Hook數值變更
    const handleCodeChange = (event) => {
      setCode(event.target.value);
    }
    //tmpcode的HOOK數值變更
    const handleTmpodeChange = (event) => {
      setTmpcode(event);
    }
    //登入功能
    const handleLogin = () => {
      console.log('用户名:', email);
      console.log('密码:', password);

      Axios.post("http://localhost:3001/login", {
      email: email,
      pwd: password,
    }).then((result) => {
      switch(result){
        case 'account or password error':
          alert('account or password error');
          break;
        case 'backend error':
          alert('backend error');
          break;
        default:
          alert(result.data);
          console.log(result);
          tomainpage();
          break;
      }
    });






    };
    //開啟註冊
    const toregister = () => {
      const a =document.querySelector('.content');
      const b =document.querySelector('.register');
      a.style.display="none";
      b.style.display="block";
    }
    //忘記密碼
    const forgetpwd =() => {
      const a =document.querySelector('.content');
      const c =document.querySelector('.forgetpwd');
      a.style.display="none";
      c.style.display="block";
    }
    //註冊
    const register =() => {
      Axios.post("http://localhost:3001/register", {
        username: username,
        email: email,
        pwd: password,
      }).then((req) => {
        switch(req.data){
          case 'username conflict':
            alert('username conflict');
            break;
          case 'email conflict':
            alert('email conflict');
            break;
          case 'password conflict':
            alert('password conflict');
            break;
          case 'Insert falied':
            alert('Insert falied');
            break;
          case 'Values Inserted':
            alert('Values Inserted');
            cancel();
            break;
          default:
          alert('here is default!!');
        }
      });
    }
    //取消(返回會員登入)
    const cancel = () => {
      const a =document.querySelector('.content');
      const b =document.querySelector('.register');
      const c =document.querySelector('.forgetpwd');
      const d =document.querySelector('.resetpwd');
      a.style.display="block";
      b.style.display="none";
      c.style.display="none";
      d.style.display="none";
    }
    //發送驗證碼
    const sendcode = () => {
      Axios.post("http://localhost:3001/sendcode", {
        email: email,
      }).then((req) => {
        if(req==false){
          alert('後端mysql查詢有問題');
        }else{
          handleTmpodeChange(req.data);
          alert(req.data);
        }
      });
    }

    //驗證碼確認
    const checkcode = () => {
      if(code==tmpcode){
        alert('驗證碼OK');
      const c =document.querySelector('.forgetpwd');
      const d =document.querySelector('.resetpwd');
      c.style.display="none";
      d.style.display="block";
      }else{
        alert("驗證碼錯誤"+"正確驗證碼是"+tmpcode+'你的輸入:'+code);
      }
    }

    //確認密碼
    const checkpwd = () => {
      if(password===newpassword){

        Axios.post("http://localhost:3001/update", {
          email: email,
          pwd: password,
        }).then((result) => {
          if(result==true){
            alert('已更改密碼拉!!');
            cancel();
          }else{
            alert('後端更改密碼有問題~');
          }
        });
      }else{
        alert('密碼不對啦!!');
      }
    }

    //跳轉至2-2的主要頁面
    const tomainpage = () => {
      const a =document.querySelector('.content');
      const b =document.querySelector('.register');
      const c =document.querySelector('.forgetpwd');
      const d =document.querySelector('.resetpwd');
      const e =document.querySelector('.mainpage');
      a.style.display="none";
      b.style.display="none";
      c.style.display="none";
      d.style.display="none";
      e.style.display="block";
    }

  return (
    <div className='twotwo'>
      <div className='mainpage'>
       <Twoandtwomainpage state={props.state}/>
      </div>
      <div className='content'>
        <div>
        <h1>會員登入</h1>
        <label>帳號:</label>
        <input type="text" id="email" value={email} onChange={handleEmailChange} style={{ width: '150px' }}/>
        < br />
        <form>
        <label>密碼:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} style={{ width: '150px' }} autoComplete="new-password"/>
        </form>
        <p>密碼是Google的應用程式密碼</p>
        <p>這樣才能讓後端的nodemailer順利寄出email喔~</p>
        </div>
        <div>
        <button onClick={handleLogin}>要密碼的登入</button>
        <button onClick={tomainpage}>不用密碼的登入</button>
        </div>
        <div>
        <button onClick={toregister}>註冊帳號</button>
        <button onClick={forgetpwd}>忘記密碼</button>
        </div>
        </div>
      <div className='register'>
        <label>名稱:</label>
        <input type="text" value={username} onChange={handleUsernameChange}/>
        < br />
        <label>信箱:</label>
        <input type="text" value={email} onChange={handleEmailChange}/>
        <form>
        <label>密碼:</label>
        <input type="password" value={password} onChange={handlePasswordChange} autoComplete="new-password"/>
        </form>
        <button onClick={register}>註冊</button>
        <button onClick={cancel}>取消註冊</button>
      </div>
      <div className='forgetpwd'>
        <label>信箱:</label>
        <input type="text" value={email} onChange={handleEmailChange}/>
        < br />
        <label>驗證碼:</label>
        <input type="text" value={code} onChange={handleCodeChange}/>
        < br />
        <button onClick={sendcode}>發送驗證碼</button>
        <button onClick={checkcode}>認證</button>
        <button onClick={cancel}>取消</button>
      </div>
      <div className='resetpwd'>
        <form>
        <label>新密碼:</label>
        <input type="password" value={password} onChange={handlePasswordChange} autoComplete="new-password"/>
        <label>再次輸入新密碼:</label>
        <input type="password" value={newpassword} onChange={handleNewPasswordChange} autoComplete="new-password"/>
        </form>
        <button onClick={checkpwd}>確認</button>
        <button onClick={cancel}>取消</button>
      </div>
    </div>
  );
};

export default Twoandtwo;

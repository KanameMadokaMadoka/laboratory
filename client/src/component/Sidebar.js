import React, { useState } from 'react';
import './Sidebar.css';
import pic from './unitylogo.png'
import pic2 from './awslogo.png'
import question from './question.png'
import docker from './dockerlogo.png'
import java from './javalogo.png'
import leaf from './leaf.png'
import arrow from './arrow.png'

// 自定义组件
const Counter = ({name='未輸入',submenu1='未輸入',submenu2='未輸入',submenu3='未輸入',menu='未輸入',picsrc=question , id='', updataContent}) => {
//更改sidebar箭頭狀態且菜單開啟(sidebar.open的時候)
  const [Menu,setMenu] = useState(true);
  const showmenu = (e) =>{
    const tmp = e.target.parentNode;
    const tmpp =tmp.parentNode;
    if(Menu===true){
      e.target.classList.add('turn');
      tmpp.classList.add('arrow');
      setMenu(!Menu);
    }else{
      e.target.classList.remove('turn');
      tmpp.classList.remove('arrow');
      setMenu(!Menu);
    }
  }
//更改sidebar箭頭狀態且菜單開啟(sidebar.open的時候)
  // 獲取li的ID
  const chage = (event) =>{
    //用傳入方法更改上層元件Hook的值
    updataContent(event.target.id);
  }
  // 檢查是否有填ID
  if(id===''){console.log('Sidebar.js有ID未填'); id='ID未填寫啦!';}
  //有小菜單
  if(menu==='true'){
  return (
    <div className='submenu'>
      <div>
      <img src={picsrc} alt='submenu'></img>
        <span>{name}</span>
      <img src={arrow} alt='arrow' onClick={showmenu}></img>
      </div>
      {/* <ul className={`submenu ${isOpen ? 'open' : 'close'}`}></ul>   這是另一種控制className的作法*/}
        <ul>
        <li id ={id+0} onClick={chage}>{submenu1}</li>
        <li id ={id+1} onClick={chage}>{submenu2}</li>
        <li id ={id+2} onClick={chage}>{submenu3}</li>
        </ul>
    </div>
  );
  //沒有小菜單
  }else if(menu==='false'){
    return(
        <div id={id}>
          <img src={picsrc} alt='none'></img>
        <span id={id+0} onClick={chage}>{name}</span>
        </div>
    )
  }else{
    //當沒輸入menu的數值的時候會跳到這而已
    return(
    <div>
        <div>
        <span>menu數值有錯!!</span>
        </div>
    </div>
    )
  }
};
// 主组件
const Sidebar = (props) => {
  return (
    <div className={`sidebar ${props.state ? '' : 'close'}`}>
      <div className='title'>
        <img src={pic} alt='pic'></img>
        <span>設備管理系統</span>
      </div>
      <Counter name='欄位一' submenu1='一號' submenu2='二號' submenu3='三號' menu='true' picsrc={pic2} id = '0'  updataContent={props.updataContent} />
      <Counter name='欄位二' submenu1='一號' submenu2='二號' submenu3='三號' menu='true' picsrc={docker} id = '1'  updataContent={props.updataContent}/>
      <Counter name='欄位三' submenu1='一號' submenu2='二號' submenu3='三號' menu='true' picsrc={java} id = '2' updataContent={props.updataContent}/>
      <Counter name='欄位四' menu='false' picsrc={leaf} id = '3' updataContent={props.updataContent}/>
      <Counter name='欄位五' submenu1='一號' submenu2='二號' submenu3='三號' menu='true' picsrc={question} id = '4' updataContent={props.updataContent}/>
    </div>
  );
};

export default Sidebar;

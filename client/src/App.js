import Sidebar from './component/Sidebar';
import Topside from './component/Topside';
import Oneandone from './submenu/oneandone';
import Oneandtwo from './submenu/oneandtwo';
import Oneandthree from './submenu/oneandthree';
import Twoandone from './submenu/twoandone';
import Twoandtwo from './submenu/twoandtwo';
import React,{ useState } from 'react';


function App() {
  //用來開關Sidebar
  const [state,setState] = useState(true);
  const updateState = () =>{
    setState(!state);
  }
  //用來操作顯示主要內容
  const [content,setContent] = useState(0);
  const updataContent = (value) =>{
    //判斷輸入值只會是字串且長度只有2 
    if(typeof value === 'string' && value.length === 2)
    {setContent(value)}
    else
    {alert('輸入有問題 你的輸入:'+ typeof value + value)}
  }
  return (
    <div className="App">
      {/* 側邊導航欄 */}
      <Sidebar state={state} updataContent={updataContent}/>
      {/* 上方導航欄   */}
      <Topside state={state} updateState={updateState}/>
      {/* 下面用來顯示主要內容 */}
      {content === '00' ? <Oneandone /> :
       content === '01' ? <Oneandtwo /> :
       content === '02' ? <Oneandthree />:
       content === '10' ? <Twoandone />:
       content === '11' ? <Twoandtwo state={state}/>:
       <Oneandone />}
    </div>
  );
}

export default App;

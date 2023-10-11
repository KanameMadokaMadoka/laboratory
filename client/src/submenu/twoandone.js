import './twoandone.css';
import React, { useState } from 'react';
import Axios from "axios";
// 主组件
const Twoandone = () => {
//   const handleToggle = () => {
//     props.updateState();
//   };
const [data,setData] = useState("KanameMadoka");

const getsystemlog = () => {
  console.log('you click button!');
// 使用 Axios 发送 GET 请求到后端获取数据
Axios.get("http://localhost:3001/systemlog")  // 替换为实际的后端 API 路径
  .then((response) => {
    // 处理从后端获取的数据
    setData(response.data);
    console.log('data:'+response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
}






  return (
    <div className='twoone'>
      {/* <input type="date" id="datePicker" /> */}
      <button id="btn" onClick={getsystemlog}>click me to get data</button>
    <div className="systemlog">
      <div id="data">
      {data.split(';').map((line, index) => (
      <p key={index}>{line}</p>
    ))}
      </div>
    </div>     
    </div>
  );
};

export default Twoandone;

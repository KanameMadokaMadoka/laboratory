import './twoandtwomainpage.css';
import React, { useState } from 'react';
import Card from './Card';
import cmp from './cmp.png';
import Axios from "axios";
// 主组件
const Twoandtwomainpage = (props) => {

  const [selectedequipment, setSelectedEquipment] = useState('');
  const [selectedarea, setSelectedArea] = useState('');
  const [equipments,setEquipments] = useState({
      name: '',
      code: '',
      position: '',
      model: '',
      pricipal: '',
      year: '',
      category: ''
  });
  // 以下是hook初始化500個object的做法
  // const [equipments, setEquipments] = useState(() => {
  //   const initialEquipments = Array(500).fill({
  //     name: '',
  //     code: '',
  //     position: '',
  //     model: '',
  //     pricipal: '',
  //     year: '',
  //     category: ''
  //   });
  //   let Name='Madoka';
  //   let Code='M';
  //   let Position=['資訊室','醫務室','辦公室'];
  //   let Model=['TSMC','Apple','Google'];
  //   let Pricipal='owner';
  //   let Year=['2021','2022','2023'];
  //   let Category=['printer','computer','monitor'];
  //   for (let i = 0; i < initialEquipments.length; i++) {
  //     initialEquipments[i] = {
  //       name:Name+i,
  //       code:Code+i,
  //       position:Position[Math.floor(Math.random() * 3)],
  //       model:Model[Math.floor(Math.random() * 3)],
  //       pricipal:Pricipal,
  //       year:Year[Math.floor(Math.random() * 3)],
  //       category:Category[Math.floor(Math.random() * 3)]
  //     };
  //   }
  //   return initialEquipments;
  // });

  const logout = () => {
    const a =document.querySelector('.content');
    const b =document.querySelector('.register');
    const c =document.querySelector('.forgetpwd');
    const d =document.querySelector('.resetpwd');
    const e =document.querySelector('.mainpage');
    a.style.display="block";
    b.style.display="none";
    c.style.display="none";
    d.style.display="none";
    e.style.display="none";
  }

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };
  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };


  
  const Outputequipment = () => {
    console.log(equipment[i]);
    // for(let i =0;i<500;i++){
    // console.log(equipments[i]);
    // }
  }


  return (
    <div className={`main ${props.state ? '' : 'close'}`}>
      <div className='infomation'>
      <h1>設備管理系統</h1>
      <label htmlFor="dropdown">設備：</label>
      <select id="dropdown" value={selectedequipment} onChange={handleEquipmentChange}>
        <option value="">請選擇</option>
        <option value="新增">新增</option>
        <option value="修改">修改</option>
        <option value="查詢">查詢</option>
        <option value="刪除">刪除</option>
      </select>
      <label htmlFor="dropdown">設備區域：</label>
      <select id="dropdown" value={selectedarea} onChange={handleAreaChange}>
        <option value="">請選擇</option>
        <option value="全部">全部</option>
        <option value="資訊室">資訊室</option>
        <option value="醫務室">醫務室</option>
        <option value="辦公室">辦公室</option>
      </select>
      <p>目前功能: {selectedequipment} 所在區域: {selectedarea}</p>
      <button onClick={logout}>登出</button>
      <button onClick={Outputequipment}>輸出</button>
      </div>
      <div className='Cardstitle'><h2>{selectedarea}</h2></div>
      <div className='Cards'>

      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="John Doe"
        location="Room 101"
        model="ABC123"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Madoka"
        location="Room 102"
        model="DEF456"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      <Card icon={<img src={cmp} alt="Device Icon" />}
        owner="Houra"
        location="Room 103"
        model="OIU789"
        code="0"
        date="1"
      />
      </div>
    </div>
  );
};

export default Twoandtwomainpage;

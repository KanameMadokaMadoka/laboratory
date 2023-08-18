import './twoandtwomainpage.css';
import React, { useState,useEffect} from 'react';
import Card from './Card';
import Axios from "axios";
// 主组件
const Twoandtwomainpage = (props) => {
  const [selectedarea, setSelectedArea] = useState('');
  const [visibleDevices, setVisibleDevices] = useState(50);
  const [equipmentsnumber,setEquipmentsnumber] = useState({
    all:0,
    office:0,
    IT:0,
    medical:0,
  });
//網頁加載完畢後自動執行
useEffect(() => {
  update();
}, []);
//// 下方兩個功能(createEquipment,Outputequipment) 用來一次向後端新建500個設備
// const createEquipmentoi = (name,code,position,model,principal,year,category) => {
//     Axios.post("http://localhost:3001/createequipment", {
//       name:name,
//       code:code,
//       position:position,
//       model:model,
//       principal:principal,
//       year:year,
//       category:category,
//   }).then((req) => {
//     if(req=='false'){
//       console.log('後端mysql資料寫入有問題')
//       return(req.data)
//     }else{
//       return(req.data)
//     }
//   });
// }
// const Outputequipment = () => {
//   let i=0;
//   let bool=true;
//   let b='';
//   do{
//     b=createEquipment(
//       equipments[i].name,
//       equipments[i].code,
//       equipments[i].position,
//       equipments[i].model,
//       equipments[i].principal,
//       equipments[i].year,
//       equipments[i].category)
//     i++;
//     if(i==500||b=='false'){bool=false;console.log('已中斷 目前進度'+i)}else{
//     console.log('進度'+i);
//     }
//   }while(bool);
// }
  const [equipments,setEquipments] = useState(()=>{
    const initialEquipments = Array(500).fill({
    name: '',
    code: '',
    position: '',
    model: '',
    principal: '',
    year: '',
    category: ''
  });
  return initialEquipments
  });
  // 以下是hook初始化500個object的做法
  // const [equipments, setEquipments] = useState(() => {
  //   const initialEquipments = Array(500).fill({
  //     name: '',
  //     code: '',
  //     position: '',
  //     model: '',
  //     principal: '',
  //     year: '',
  //     category: ''
  //   });
  //   let Name='Madoka';
  //   let Code='M';
  //   let Position=['資訊室','醫務室','辦公室'];
  //   let Model=['TSMC','Apple','Google'];
  //   let Principal='owner';
  //   let Year=['2021','2022','2023'];
  //   let Category=['printer','computer','monitor'];
  //   let bbb = initialEquipments.length
  //   for (let i = 0; i < bbb; i++) {
  //     initialEquipments[i] = {
  //       name:Name+i,
  //       code:Code+i,
  //       position:Position[Math.floor(Math.random() * 3)],
  //       model:Model[Math.floor(Math.random() * 3)],
  //       principal:Principal,
  //       year:Year[Math.floor(Math.random() * 3)],
  //       category:Category[Math.floor(Math.random() * 3)]
  //     };
  //   }
  //   return initialEquipments;
  // });
  
  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };
  
  // 滾動處理函式，當滾動到底部時增加可見的設備數量
  const showmore = () => {
    setVisibleDevices((prevVisibleDevices) =>
        Math.min(prevVisibleDevices + 50, 500)
      );
  };
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
  const update = () => {
    let officeCount=0;
    let ITCount=0;
    let medicalCount=0;
    //抓取資料
    Axios.get("http://localhost:3001/equipment").then((req)=>{
      const newDataFromBackend = req.data.map((item) => ({
        name: item.name,
        code: item.code,
        position: item.position,
        model: item.model,
        principal: item.principal,
        year: item.year,
        category: item.category,
      }));
      //統計數量
      for (const key in newDataFromBackend) {
        if (newDataFromBackend.hasOwnProperty(key)) {
          const item = newDataFromBackend[key];
          switch (item.position) {
            case '辦公室':
              officeCount++;
              break;
            case '資訊室':
              ITCount++;
              break;
            case '醫務室':
              medicalCount++;
              break;
            default:
              break;
          }
        }
      }
      //更新hook
      setEquipments(newDataFromBackend)
      setEquipmentsnumber({all:officeCount+ITCount+medicalCount,
        office:officeCount,
        IT:ITCount,
        medical:medicalCount,})
    });
    console.log('網頁加載完成');
  }


  return (
    <div className={`main ${props.state ? '' : 'close'}`}>
      <div className='infomation'>
      <h1>設備管理系統</h1>
      <p>總設備數量:{equipmentsnumber.all}  資訊室設備數量:{equipmentsnumber.IT}  醫務室設備數量:{equipmentsnumber.medical}  辦公室設備數量{equipmentsnumber.office}</p>
      <label htmlFor="dropdown">設備區域：</label>
      <select id="dropdown" value={selectedarea} onChange={handleAreaChange}>
        <option value="">請選擇</option>
        <option value="全部">全部</option>
        <option value="資訊室">資訊室</option>
        <option value="醫務室">醫務室</option>
        <option value="辦公室">辦公室</option>
      </select>
      <p>所在區域: {selectedarea}</p>
      <button onClick={logout}>登出</button>
      </div>
      <div className='Cardstitle'><h2>{selectedarea}</h2> <button onClick={showmore}>顯示更多</button></div>
      <div className='Cards'>

      {equipments.slice(0, visibleDevices).map((equipment, index) => (
        selectedarea === equipment.position || selectedarea ==='全部' ?(
          <Card
            key={index}
            name={equipment.name}
            owner={equipment.principal}
            position={equipment.position}
            model={equipment.model}
            code={equipment.code}
            date={equipment.year}
            category={equipment.category}
          />
        ) : null
      ))}
      </div>
    </div>
  );
};

export default Twoandtwomainpage;

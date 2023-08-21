import './twoandtwomainpage.css';
import React, { useState,useEffect} from 'react';
import Card from './Card';
import Axios from "axios";
// 主组件
const Twoandtwomainpage = (props) => {
  const [selectedarea, setSelectedArea] = useState('');
  const [visibleDevices, setVisibleDevices] = useState(50);
  const [equipmentsnumber,setEquipmentsnumber] = useState({
    office:0,
    IT:0,
    medical:0,
  });
  const [name,setName] = useState('鹿目圓');
  const [owner,setOwner] = useState('owner');
  const [position,setPosition] = useState('資訊室');
  const [model,setModel] = useState('TSMC');
  const [code,setCode] = useState('M0');
  const [year,setYear] = useState('2020');
  const [category,setCategory] = useState('monitor');
  const initialEquipments = Array(500).fill({
    name: '',
    code: '',
    position: '',
    model: '',
    principal: '',
    year: '',
    category: ''
  })
  const [equipments,setEquipments] = useState(initialEquipments);

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
  
  // 按鈕處理函式，當按鈕觸發時增加可見的設備數量
  const showmore = () => {
    setVisibleDevices((prevVisibleDevices) =>
        Math.min(prevVisibleDevices + 50, 500)
      );
  };
  //登出
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
  
  //向後端資料庫抓取資料更新
  const updateonce = () => {
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
      //更新hook
      setEquipments(newDataFromBackend)
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
      setEquipmentsnumber({
        office:officeCount,
        IT:ITCount,
        medical:medicalCount,})
        console.log('網頁加載完成')
    });
  }

  const equipmentcreate = () => {
    if(equipmentsnumber.all===500)
    {
      alert('設備數量已達到上限');    
      cancel();
    }
    else
    {
      Axios.post("http://localhost:3001/createequipment", {
        name:name,
        code:code,
        position:position,
        model:model,
        principal:owner,
        year:year,
        category:category,
      }).then((req) => {
        if(req==='false'){
          console.log('後端mysql資料寫入有問題')
          console.log(req)
        }else{
          // 更新(equipments,equipmentnumbers)HOOK資訊
          const tmpequipment = {
          name:name,
          code:code,
          position:position,
          model:model,
          principal:owner,
          year:year,
          category:category,
          }
          setEquipments((prevEquipments) => [...prevEquipments,tmpequipment])
          const tmpequipmentnumbers={
            ...equipmentsnumber
          }
          switch(position){
            case '資訊室':
              tmpequipmentnumbers.IT++
              break
            case '醫務室':
              tmpequipmentnumbers.medical++
              break
            case '辦公室':
              tmpequipmentnumbers.office++
              break
            default:
              alert('新建設備裡的switch竟然跑到default!')
              break
          }
          setEquipmentsnumber(tmpequipmentnumbers);
          alert('設備已經新增囉')
        }
      });
      cancel();
    }
  }

  const equipmentedit = () =>{
    alert('edit已被觸發');
    cancel();
  }
  const equipmentdel = () =>{
    if(code.length>4||code[0]!=='M')
    {alert("只能輸入M開頭且長度不超過4的字串喔")}
    else{
    Axios.delete(`http://localhost:3001/deleteequipment/${code}`).then((req)=>{
      if(req){
      // 首先复制当前的 equipments 状态，然后过滤掉要删除的设备 
      const updatedEquipments = equipments.filter(equipment => equipment.code !== code);
      // 设置 equipments 状态为更新后的数组
      setEquipments(updatedEquipments);
      // 复制当前的 equipmentsnumber 状态
      const updatedEquipmentNumbers = { ...equipmentsnumber };
      // 获取要删除设备的位置
      const deletedEquipment = equipments.find(equipment => equipment.code === code);
      const position = deletedEquipment.position;
      // 根据设备的位置来减少相应位置的计数
      switch (position) {
        case '資訊室':
          updatedEquipmentNumbers.IT--;
          break;
        case '醫務室':
          updatedEquipmentNumbers.medical--;
          break;
        case '辦公室':
          updatedEquipmentNumbers.office--;
          break;
        default:
          alert('删除设备时的switch出现了default情况!');
          break;
      }
      // 设置 equipmentsnumber 状态为更新后的对象
      setEquipmentsnumber(updatedEquipmentNumbers);
        alert('設備已刪除')
      }else{
        alert('設備刪除失敗')
      }
      });
    cancel();
    }
  }
  const showaddequipment = () => {
    const a =document.querySelector('.addequipment');
    const b =document.querySelector('.editequipment');
    const c =document.querySelector('.delequipment');
    a.style.display= 'block';
    b.style.display= 'none';
    c.style.display= 'none';
  }

  const showeditequipment = () => {
    const a =document.querySelector('.addequipment');
    const b =document.querySelector('.editequipment');
    const c =document.querySelector('.delequipment');
    a.style.display= 'none';
    b.style.display= 'block';
    c.style.display= 'none';
  }

  const showdelequipment = () => {
    const a =document.querySelector('.addequipment');
    const b =document.querySelector('.editequipment');
    const c =document.querySelector('.delequipment');
    a.style.display= 'none';
    b.style.display= 'none';
    c.style.display= 'block';
  }

  const cancel = () =>{
    const a =document.querySelector('.addequipment');
    const b =document.querySelector('.editequipment');
    const c =document.querySelector('.delequipment');
    a.style.display= 'none';
    b.style.display= 'none';
    c.style.display= 'none';
  }

  //網頁加載完畢後自動執行
  useEffect(() => {
    updateonce();
  }, []);

  

  return (
    <div className={`main ${props.state ? '' : 'close'}`}>
      <div className='infomation'>
      <h1>設備管理系統</h1>
      <p>總設備數量:{equipmentsnumber.IT+equipmentsnumber.medical+equipmentsnumber.office}  資訊室設備數量:{equipmentsnumber.IT}  醫務室設備數量:{equipmentsnumber.medical}  辦公室設備數量{equipmentsnumber.office}</p>
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

      <div className='addequipment'>
      <label>設備名稱:</label>
      <input value={name} onChange={(e)=>setName(e.target.value)}style={{ width: '150px' }} placeholder='不要超過9個字喔'/>
      <label>擁有人:</label>
      <input value={owner} onChange={(e)=>setOwner(e.target.value)}style={{ width: '150px' }} placeholder='只能輸入onwer拉'/>
      <label >地點:</label>
        <select onChange={(e)=>setPosition(e.target.value)}>
            <option value="資訊室">資訊室</option>
            <option value="醫務室">醫務室</option>
            <option value="辦公室">辦公室</option>
        </select>
      <label >型號:</label>
        <select onChange={(e)=>setModel(e.target.value)}>
            <option value='TSMC'>TSMC</option>
            <option value='Apple'>Apple</option>
            <option value='Google'>Google</option>
        </select>
      <label >類型:</label>
        <select onChange={(e)=>setCategory(e.target.value)}>
            <option value='monitor'>monitor</option>
            <option value='computer'>computer</option>
            <option value='printer'>printer</option>
        </select>
      <label>財產編號:</label>
      <input value={code} onChange={(e)=>setCode(e.target.value)}style={{ width: '150px' }} />
      <label>年份:</label>
      <select onChange={(e)=>setYear(e.target.value)}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
        </select>
      <button onClick={equipmentcreate}>建立</button>
      <button onClick={cancel}>取消</button>
      </div>

      <div className='editequipment'>
      <label>要修改的設備財產編號:</label>
      <input value={code} onChange={(e)=>setCode(e.target.value)}style={{ width: '150px' }}/>
      <button onClick={equipmentedit}>編輯</button>
      <button onClick={cancel}>取消</button>
      </div>

      <div className='delequipment'>
      <label>要刪除的設備財產編號:</label>
      <input value={code} onChange={(e)=>setCode(e.target.value)}style={{ width: '150px' }}/>
      <button onClick={equipmentdel}>刪除</button>
      <button onClick={cancel}>取消</button>
      </div>

      <div className='Cardstitle'><h2>{selectedarea}</h2>
      <button className='button1' onClick={showaddequipment}>新增設備</button>
      <button  onClick={showeditequipment}>修改設備</button>
      <button  onClick={showdelequipment}>刪除設備</button>
      <button  onClick={showmore}>顯示更多</button>
      </div>
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

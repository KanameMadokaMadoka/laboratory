import './oneandone.css';
import madoka from './madoka.jpg';
// 主组件
const oneandone = () => {
//   const handleToggle = () => {
//     props.updateState();
//   };
  return (
    <div className='one'>
        <img src={madoka} alt='madoka'></img>
        <div className='content'>
        <h1>如果有人說懷有希望是錯誤</h1>
        <h1>我會無數次反駁「不是這樣的」，不管到什麼時候。</h1>
        </div>
    </div>
  );
};

export default oneandone;

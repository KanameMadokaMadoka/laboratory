import './oneandtwo.css';
import akemi from './akemi.jpg';
// 主组件
const oneandtwo = () => {
//   const handleToggle = () => {
//     props.updateState();
//   };
  return (
    <div className='two'>
        <img src={akemi} alt='akemi'></img>
        <div className='content'>
        <h1>誰都無法相信未來，誰都無法接受未來。</h1>
        </div>
    </div>
  );
};

export default oneandtwo;

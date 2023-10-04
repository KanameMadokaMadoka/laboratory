import './oneandthree.css';
import mami from './mami.jpg';
// 主组件
const oneandthree = () => {
//   const handleToggle = () => {
//     props.updateState();
//   };
  return (
    <div className='three'>
        <img src={mami} alt='mami'></img>
        <div className='content'>
        <h1>已經沒有什麼好怕的了</h1>
        </div>
    </div>
  );
};

export default oneandthree;

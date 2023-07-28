import './Topside.css';
import sidebar from './sidebar.png';

// 主组件
const Topside = (props) => {
  const handleToggle = () => {
    props.updateState();
  };
  return (
    <div className={`topside ${props.state ? '' : 'close'}`}>
        <div className='img'><img src={sidebar} alt='sidebar' onClick={handleToggle} ></img></div>
        <div className='contain'>
        <button>匯入Excel</button>
        <button>匯出Excel</button>
        <button>登出</button>
        </div>
    </div>
  );
};

export default Topside;

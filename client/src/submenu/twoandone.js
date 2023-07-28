import './twoandone.css';
// 主组件
const twoandone = () => {
//   const handleToggle = () => {
//     props.updateState();
//   };
  return (
    <div className='twoone'>
      <input type="date" id="datePicker" />
         <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Model</th>
          <th>Category</th>
          <th>Year</th>
          <th>Code</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item 1</td>
          <td>Model 1</td>
          <td>Category 1</td>
          <td>2022</td>
          <td>Code 1</td>
          <td>Position 1</td>
        </tr>
        <tr>
          <td>Item 2</td>
          <td>Model 2</td>
          <td>Category 2</td>
          <td>2021</td>
          <td>Code 2</td>
          <td>Position 2</td>
        </tr>
        <tr>
          <td>Item 3</td>
          <td>Model 3</td>
          <td>Category 3</td>
          <td>2020</td>
          <td>Code 3</td>
          <td>Position 3</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

export default twoandone;

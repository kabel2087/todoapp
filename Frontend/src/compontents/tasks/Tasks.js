import React from "react";
import { Table, Space } from "antd";
import axios from "axios";
import NewTask from '../newTask/NewTask';

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const { Column } = Table;
  React.useEffect(function () {
    axios
      .get("http://127.0.0.1:3000/task/all")
      .then(function (response) {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/task/${id}`)
      .then(function (response) {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
    <NewTask setTasks={setTasks} />
    <Table dataSource={tasks}>
      <Column title="Task" dataIndex="task" key="task" />

      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>Edit</a>
            <a onClick={(e) => deleteTask(record.id)}>Delete</a>
          </Space>
        )}
      />
    </Table>
    </>
  );
};

export default Tasks;



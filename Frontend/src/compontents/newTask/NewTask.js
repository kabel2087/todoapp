import React from 'react';
import {Input,Button} from 'antd';
import axios from "axios";

const NewTask = (props) =>{
    console.log(props)
    const [inputValue,setInputValue] = React.useState('');
    const createTask = () => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/task',
            data: {
              task: inputValue,
            }
          })
        .then(function (response) {
            console.log(response.data)
            props.setTasks(response.data)
          })
          .catch(function (error) {
          });
    }
    
    return(
        <>
            <Input value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }} placeholder="Task"/>
            <Button onClick={(e) => {
                createTask()
            }} type="primary">Submit</Button>
        </>
    );
}

export default NewTask;

// input setinputvalue hodnota z inputu
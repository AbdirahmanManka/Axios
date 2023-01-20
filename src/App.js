import axios from "axios";
import { Table,Button } from "antd";
import { useEffect, useState } from "react";
import "antd/dist/antd.css"
import {useNavigate} from "react-router-dom";
import UseForm from "./Pages/UseForm.jsx";
import {Routes, Route} from "react-router-dom"


const client=axios.create({
  baseURL:"https://jsonplaceholder.typicode.com/posts/"
})


export default function App() {
  
 


  
	// GET with Axios
  const [data, setData] = useState([]);
  useEffect(() =>{
    client.get('?_limit=10').then(res => {
      console.log(res.data);
      setData(res.data)
      console.log(res)
    }).catch(e => console.error("an error occurred"));
    
  }, []);
  
  



  const navigate =useNavigate()
  const handleEdit = record => navigate("/posts/"+record.id, {state: {data: record}})
  const handleDelete=record => {
    let newData = data.filter(el => {
      client.delete(""+record.id).then (res => console.log(res))
      return el.title === record.title?false:true
    })
 
    setData(newData)
  }

  //array of objects that represent the columns of the table.
  

  const cols = [
    {
      title: "ID",
      index: "id",
      dataIndex: "id"
    },
    {
      title: "Title",
      index: "title",
      dataIndex: "title"
    },
    {
      title: "Edit",
      key: "action",
      render: (text, record) => <Button onClick={() => handleEdit(record)}>Edit</Button>
  },
  {
    title: "Delete",
    key: "delete",
    render: (text, record) => <Button onClick={() => handleDelete(record)}>Delete</Button>
}


  ]
  return (
   <>
   <Routes>
    <Route path={"/posts"} element={<Table dataSource={data} columns={cols} rowKey={record => record.id} />}/>
    <Route path={"posts/:id"} element={ <UseForm/>} />
   </Routes>
   
   </>

  
   
  );
}








//












































//CREATE A FORM 
//GET DATA FROM ENDPOINTS 

//GET-DISPLAY DATA ON A TABLE  , CREATE(POST)-USE FORM TO REQUEST DATA FROM USER, PUT(UPDATE)-USE FORM,PATCH-, 
//DELETE -
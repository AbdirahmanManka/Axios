import React from 'react'
import "antd/dist/antd.css";
import { Form, Button, Input } from 'antd';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';

const {Item} = Form
 function User(props) {
	const {getFieldDecorator} = props.form
    const navigate = useNavigate();
    const location = useLocation();
    const handleBack = () => {
        navigate(-1);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.form.validateFields((err, val) => {
			console.log("Form Values\n",val);
            if (!err) {
				
                axios.post("https://jsonplaceholder.typicode.com/posts/", val)
            }
        })
    }
	return (
		<div style={{
			display: 'block', width: 700, padding: 30, border: 3
		}}>
			
			<Form name="basicform" onSubmit={handleSubmit}>
			<Form.Item
			label="UserId"
			name="id"
			 >
				{
				getFieldDecorator(
					"id", 
					{initialValue:location.state.data.id  ,rules: [{required: true, message: "your id"}]}
					) (<Input/>)
				}
			</Form.Item>
            <Form.Item
			label="Title"
			name="Title"
			
			>
				
			{getFieldDecorator("title", {initialValue: location.state.data.title ,rules: [{required: true, message: "your id"}]})(<Input/>)}
			</Form.Item>
			
            <Form.Item>
			<Button htmlType={"submit"}>
            submit
			</Button>
			</Form.Item>
			
            <Form.Item>
			<Button onClick={handleBack}>
			Back
			</Button>
			</Form.Item>

          
			</Form>
		</div>
	);
}
const WrapperForm = Form.create({name: "EditUser"})(User)
export default WrapperForm;

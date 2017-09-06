import React, { Component } from 'react';
import styles from './UserModal.css';
import { Modal, Form, Input, Icon } from 'antd';

const FormItem = Form.Item;

class UserEditModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	showModalHandler = (e) => {
		if (e) e.preventDefault();
		this.setState({
			visible: true,
		});
	};

	hideModalHandler = () => {
		this.setState({
			visible: false,
		});
	};

	okHandler = () => {
		const { onOk } = this.props;
		this.props.form.validateFields((err, values) => {
			if(!err) {
				onOk(values);
				console.log(values)
				this.hideModalHandler();
			}
		});
	};

	render () {
		const { children } = this.props;
		// console.log(this.props)
		const { getFieldDecorator } = this.props.form;
		const { name, email, website } = this.props.record;

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};

		return (
			<span>
				<span onClick={this.showModalHandler}>
					{children}
				</span>
				<Modal
					title='Edit User'
					visible={this.state.visible}
					onOk={this.okHandler}
					onCancel={this.hideModalHandler}
				>
					<Form layout='horizontal' onSubmit={this.okHandler}>
						<FormItem
							{...formItemLayout}  // ...
							label='name'
						>
							{
								getFieldDecorator('name', {
									rules: [{ required: true, message: 'Please input your name!' }],
									initialValue: name,
								})(<Input prefix={<Icon type="user" style={{ fontSize: 14 }} />} />)
							}	
						</FormItem>
						<FormItem
							{...formItemLayout}
							label='email'	
						>
							{
								getFieldDecorator('email', {
									rules: [{ required: true, message: 'Please input your email!' }],
									initialValue: email,
								})(<Input prefix={<Icon type='mail' style={{ fontSize: 14 }} />} />)
							}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label='website'
						>
							{
								getFieldDecorator('website', {
									initialValue: website,
								})(<Input />)
							}
						</FormItem>
					</Form> 
				</Modal>
			</span>
		);
	}
}

export default Form.create()(UserEditModal);

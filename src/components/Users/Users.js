import React from 'react';
import styles from './Users.css';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
	function deleteHandler(id) {
		console.warn(`TODO: ${id}`);
	}

	function pageChangeHandler(page) {
		dispatch(routerRedux.push({
			pathname: '/users',
			query: { page },
		}));
	}

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="">{text}</a>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: "Website",
			dataIndex: 'website',
			key: 'website',
		},
		{
			title: "Operation",
			key: 'operation',
			render: (text, { id }) => (
				<span className={styles.operation}>
					<a href="">Edit</a>
					<Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
						<a href="">Delete</a>
					</Popconfirm>
				</span>
			),
		},
	];

	return (
		<div className={styles.normal}>
			<div>
				<Table
					columns={columns}
					dataSource={dataSource}
					loading={loading}
					rowKey={record => record.id}
					pagination={false}
				/>
				<Pagination
					className="ant-table-pagination"
					total={total}
					current={current}
					pageSize={PAGE_SIZE}
					onChange={pageChangeHandler}
				/>
			</div>
		</div>
	);
}

// 为毛这下面这两个函数一毛一样，只有第二个能出现loading，第一个出了毛问题？
// function mapStateToProps(state) {
// 	const { list, total, page } = state.users;
// 	return {
// 		loadding: state.loading.models.users,
// 		list,
// 		total,
// 		page,
// 	}
// }

function mapStateToProps(state) {
	const { list, total, page } = state.users;
	return {
		loading: state.loading.models.users,
		list,
		total,
		page,
	}
}


export default connect(mapStateToProps)(Users);

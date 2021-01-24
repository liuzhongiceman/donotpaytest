import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Tooltip } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import { Issue, IssueFormModal } from '../Issue';
import { Container, ColumnTitle, Header, HeaderActions, Root } from './Column.styled';

const Column = ({
	item,
	isFirstColumn,
	isLastColumn,
	onIssueAdd,
	onIssueEdit,
	onIssueRemove,
	onMoveIssueToLeftColumn,
	onMoveIssueToRightColumn
}) => {
	const [issueModalVisible, setIssueModalVisible] = useState(false);
	const [editingIssue, setEditingIssue] = useState();

	const handleOnIssueAdd = (title, description) => {
		setIssueModalVisible(false);
		onIssueAdd && onIssueAdd(item, { title, description });
	};

	const handleOnIssueEdit = (id, title, description) => {
		setIssueModalVisible(false);
		onIssueEdit && onIssueEdit(item, { id, title, description });
	};

	return (
		<Root>
			<Container>
				<Header>
					<ColumnTitle>{item?.title}</ColumnTitle>
					<HeaderActions>
						<Tooltip placement="topLeft" title="Add new issue" arrowPointAtCenter>
							<PlusSquareOutlined style={{ color: '#2dff79' }} key="add" onClick={() => setIssueModalVisible(true)} />
						</Tooltip>
					</HeaderActions>
				</Header>
				{item.issues.map(issue => (
					<Issue
						key={issue.id}
						item={issue}
						isFirstColumn={isFirstColumn}
						isLastColumn={isLastColumn}
						onEdit={() => {
							setEditingIssue(issue);
							setIssueModalVisible(true);
						}}
						onRemove={() => onIssueRemove(item, issue)}
						onMoveToLeftColumn={() => onMoveIssueToLeftColumn(item, issue)}
						onMoveToRightColumn={() => onMoveIssueToRightColumn(item, issue)}
					/>
				))}
				<IssueFormModal
					visible={issueModalVisible}
					issue={editingIssue}
					onSubmit={(id, title, description) => {
						id ? handleOnIssueEdit(id, title, description) : handleOnIssueAdd(title, description);
					}}
					onCancel={() => {
						setIssueModalVisible(false);
						setEditingIssue(null);
					}}
				/>
			</Container>
		</Root>
	);
};

Column.propTypes = {
	item: propTypes.object,
	isFirstColumn: propTypes.bool,
	isLastColumn: propTypes.bool,
	onRemove: propTypes.func,
	onIssueEdit: propTypes.func,
	onIssueRemove: propTypes.func,
	onIssueAdd: propTypes.func,
	onMoveIssueToLeftColumn: propTypes.func,
	onMoveIssueToRightColumn: propTypes.func
};

export default Column;

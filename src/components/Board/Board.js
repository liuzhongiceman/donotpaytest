import React, { useState } from 'react';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { Column } from '../Column';
import { Columns, Container } from './Board.styled';

import { generateBoard } from '../../utils/helper';

const Board = () => {
	const [columns, setColumns] = useState(generateBoard);
	const [setColumnModalVisible] = useState(false);

	const addColumn = title => {
		const newColumnList = [...columns, {
			id: uuidv4(),
			title: title,
			issues: []
		}];
		setColumns(newColumnList);
		setColumnModalVisible(false);
		message.success('New column is added.');
	};

	const removeColumn = id => {
		const newColumnList = columns.filter(column => column.id !== id);
		setColumns(newColumnList);
		message.success('Column is removed.');
	};

	const addIssue = (issueCol, issue) => {
		const newColumnList = columns.map(col => {
			if (col.id === issueCol.id) {
				return {
					...col,
					issues: [...col.issues, {
						id: uuidv4(),
						title: issue.title,
						description: issue.description
					}]
				};
			}
			return col;
		});
		setColumns(newColumnList);
		message.success('New issue is added.');
	};

	const editIssue = (issueCol, issue) => {
		const newColumnList = columns.map(col => {
			if (col.id === issueCol.id) {
				return {
					...col,
					issues: col.issues.map(i => i.id === issue.id ? issue : i)
				};
			}
			return col;
		});
		setColumns(newColumnList);
		message.success('Issue is edited.');
	};

	const removeIssue = (issueCol, issue) => {
		const newColumnList = columns.map(column => {
			if (issueCol.id === column.id) {
				return {
					...column,
					issues: column.issues.filter(i => i.id !== issue.id)
				};
			}
			return column;
		});
		setColumns(newColumnList);
		message.success('Issue is removed.');
	};

	const moveIssueLeft = (issueCol, issue) => {
		const newColumnList = columns.map((column, index) => {
			if (column.id === issueCol.id) {
				return {
					...column,
					issues: column.issues.filter(i => i.id !== issue.id)
				};
			}
			if (index === columns.findIndex(col => col.id === issueCol.id) - 1) {
				return {
					...column,
					issues: [issue, ...column.issues]
				};
			}
			return column;
		});

		setColumns(newColumnList);
		message.success('Issue is moved.');
	};

	const moveIssueRight = (issueCol, issue) => {
		const newColumnList = columns.map((column, index) => {
			if (column.id === issueCol.id) {
				return {
					...column,
					issues: column.issues.filter(i => i.id !== issue.id)
				};
			}
			if (index === columns.findIndex(col => col.id === issueCol.id) + 1) {
				return {
					...column,
					issues: [issue, ...column.issues]
				};
			}
			return column;
		});

		setColumns(newColumnList);
		message.success('Issue is moved.');
	};

	return (
		<Container>
			<Columns>
				{columns.map((column, index) => (
					<Column
						key={column.id}
						isFirstColumn={index === 0}
						isLastColumn={index === columns.length - 1}
						item={column}
						onRemove={removeColumn}
						onIssueAdd={addIssue}
						onIssueEdit={editIssue}
						onIssueRemove={removeIssue}
						onMoveIssueToLeftColumn={moveIssueLeft}
						onMoveIssueToRightColumn={moveIssueRight}
					/>
				))}
			</Columns>
		</Container>
	);
};

export default Board;

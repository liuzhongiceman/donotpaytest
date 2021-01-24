import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Column } from '../Column';
import { Columns, Container } from './Board.styled';

import { generateBoard } from '../../utils/helper';

const Board = () => {
	const [columns, setColumns] = useState(generateBoard);

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

import React, { useState } from 'react';
import { Modal, Stack, TextField, Button, Typography } from '@mui/material';

const TreePopup = ({ mode, node, onAddNode, onEditNode, onDeleteNode, onClose }) => {
	const [nodeName, setNodeName] = useState('');
	const modeCreate = mode === 'create';
	const modeEdit = mode === 'edit';
	const modeDelete = mode === 'delete';

	const handleSave = () => {
		if (modeEdit) {
			onEditNode(node.id, nodeName);
		} else if (modeCreate) {
			onAddNode(node.id, nodeName);
		}
		onClose();
	};

	const handleDelete = () => {
		onDeleteNode(node.id);
		onClose();
	};

	return (
		<Modal open={!!node} onClose={onClose}>
			<Stack direction="column" useFlexGap spacing={{ xs: 1, sm: 2 }} sx={{ ...style, width: 300 }}>
				<Typography variant="h4">{modeEdit ? 'Edit Node' : modeDelete ? 'Delete Node' : 'Create Node'}</Typography>

				{!modeDelete ? (
					<TextField
						label="Node Name"
						value={nodeName}
						onChange={(e) => setNodeName(e.target.value)}
						autoComplete='off'
						fullWidth
					/>
				) : `Do you want to delete ${node?.name}?`}

				<Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", alignItems: "center" }}>
					<Button onClick={onClose} variant="contained" color="primary">
						Cancel
					</Button>
					{!modeDelete && (
						<Button onClick={handleSave} variant="contained" color="success">
							{modeCreate ? 'Save' : 'Edit'}
						</Button>
					)}
					{modeDelete && (
						<Button onClick={handleDelete} variant="contained" color="error">
							Delete
						</Button>
					)}
				</Stack>
			</Stack>
		</Modal>
	);
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export default TreePopup;
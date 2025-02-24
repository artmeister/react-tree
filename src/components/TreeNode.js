import React from 'react';
import { Stack, IconButton } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';

const TreeNode = ({ nodes, onNodeSelect }) => {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: "flex-start", alignItems: "center" }}>
            <span onClick={() => onNodeSelect(node, 'edit')}>{node.name}</span>
            <IconButton onClick={() => onNodeSelect(node, 'create')} size="small"><AddCircle /></IconButton>
            <IconButton onClick={() => onNodeSelect(node, 'delete')} size="small"><Delete /></IconButton>
          </Stack>
          {node.children && node.children.length > 0 && (
            <TreeNode key={node.id} nodes={node.children} onNodeSelect={onNodeSelect} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TreeNode;
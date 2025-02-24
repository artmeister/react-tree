import React, { useState, useEffect } from 'react';
import TreeNode from './TreeNode';
import TreePopup from './TreePopup';
import { getTreeData, createNode, renameNode, deleteNode } from '../apiService';

const EditableTree = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupMode, setPopupMode] = useState('');
  const [treeName, setTreeName] = useState('Root');

  const fetchData = async () => {
    try {
      const data = await getTreeData(treeName);
      setTreeData([data]);
    } catch (error) {
      console.error('Ошибка при получении данных дерева:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [treeName]);

  const handleAddNode = async (parentId, nodeName) => {
    try {
      if (!parentId) throw new Error("parentId is required");
      await createNode(treeName, parentId, nodeName);
      await fetchData();
    } catch (error) {
      console.error('Ошибка при добавлении узла:', error);
    }
  };

  const handleEditNode = async (nodeId, nodeName) => {
    try {
      await renameNode(treeName, nodeId, nodeName);
      await fetchData();
    } catch (error) {
      console.error('Ошибка при редактировании узла:', error);
    }
  };

  const handleDeleteNode = async (nodeId) => {
    try {
      await deleteNode(treeName, nodeId);
      await fetchData();
    } catch (error) {
      console.error('Ошибка при удалении узла:', error);
    }
  };

  return (
    <div>
      <TreeNode nodes={treeData} onNodeSelect={(node, mode) => { setSelectedNode(node); setPopupMode(mode); }} />
      {selectedNode && (
        <TreePopup
          mode={popupMode}
          node={selectedNode}
          onAddNode={handleAddNode}
          onEditNode={handleEditNode}
          onDeleteNode={handleDeleteNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
};

export default EditableTree;
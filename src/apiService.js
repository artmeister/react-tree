import axios from 'axios';

const API_BASE_URL = 'https://test.vmarmysh.com';

export const getTreeData = async (treeName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api.user.tree.get`, null, {
      params: { treeName }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных дерева:', error);
    throw error;
  }
};

export const createNode = async (treeName, parentNodeId, nodeName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api.user.tree.node.create`, null, {
      params: { treeName, parentNodeId, nodeName }
    });
    return { id: response.data.id, name: nodeName, children: [] };
  } catch (error) {
    console.error('Ошибка при создании узла:', error);
    throw error;
  }
};

export const renameNode = async (treeName, nodeId, newNodeName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api.user.tree.node.rename`, null, {
      params: { treeName, nodeId, newNodeName }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при переименовании узла:', error);
    throw error;
  }
};

export const deleteNode = async (treeName, nodeId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api.user.tree.node.delete`, null, {
      params: { treeName, nodeId }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении узла:', error);
    throw error;
  }
};
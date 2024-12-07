import axios from 'axios';

const API_URL = 'http://localhost:3000/people/'; 
const ADDRESS_API_URL='http://localhost:3000/address/'; 

export const getPeople = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const createPerson = async (person) => {
  try {
    const response = await axios.post(API_URL, person);
    return response.data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

export const updatePerson = async (person) => {
  try {
    const response = await axios.put(`${API_URL}/${person.id}`, person);
    return response.data;
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};

export const deletePerson = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

export const bulkDeletePeople = async (ids) => {
  try {
    const response = await axios.post(`${API_URL}/bulk-delete`, { ids });
    return response.data;
  } catch (error) {
    console.error('Error bulk deleting people:', error);
    throw error;
  }
};

export const undoDelete = async () => {
  try {
    const response = await axios.post(`${API_URL}/undo-delete`);
    return response.data;
  } catch (error) {
    console.error('Error undoing delete:', error);
    throw error;
  }
};


export const addAddress = async (data) => {
  try {
    const response = await axios.post(ADDRESS_API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};
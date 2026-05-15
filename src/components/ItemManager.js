import React, { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';

const ItemManager = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    description: '',
    category: '',
    status: 'normal'
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await itemService.getItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await itemService.updateItem(currentItem._id, currentItem);
      } else {
        await itemService.createItem(currentItem);
      }
      setCurrentItem({ name: '', description: '', category: '', status: 'normal' });
      setIsEditing(false);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await itemService.deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? 'Edit Item' : 'Add New Item'}
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid gap-4">
          <input
            type="text"
            name="name"
            value={currentItem.name}
            onChange={handleInputChange}
            placeholder="Item Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={currentItem.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={currentItem.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="p-2 border rounded"
            required
          />
          <select
            name="status"
            value={currentItem.status}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="normal">Normal</option>
            <option value="anomaly">Anomaly</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Items List</h2>
      <div className="grid gap-4">
        {items.map(item => (
          <div key={item._id} className="border p-4 rounded">
            <h3 className="font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Status: {item.status}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManager;
// src/components/TaskUpdate.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TaskUpdate({ task, onUpdate, onCancel }) {
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    assigned_to: task.assigned_to || '', // rendre optionnel
    due_date: task.due_date,
    status: task.status
  });

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5002/tasks/${task._id}`, updatedTask);
      onUpdate(); // Appeler la fonction pour rafraîchir les tâches
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
    }
  };

  return (
    <form onSubmit={handleSubmitUpdate} className="mt-4 bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Modifier la tâche</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Titre"
          value={updatedTask.title}
          onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={updatedTask.description}
          onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Assigné à (optionnel)"
          value={updatedTask.assigned_to}
          onChange={(e) => setUpdatedTask({ ...updatedTask, assigned_to: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={updatedTask.due_date}
          onChange={(e) => setUpdatedTask({ ...updatedTask, due_date: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enregistrer
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      >
        Annuler
      </button>
    </form>
  );
}

export default TaskUpdate;

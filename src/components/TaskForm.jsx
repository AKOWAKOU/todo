import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskCreated }) { // Ajouter la prop onTaskCreated
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title,
        description,
        status,
        due_date: dueDate,
      };
      if (assignedTo) {
        taskData.assigned_to = assignedTo;
      }

      await axios.post('http://localhost:5002/tasks', taskData, { headers: { "Access-Control-Allow-Origin": "*" } });
      console.log('Tâche créée :', taskData);
      
      // Appeler la fonction de rappel pour fermer le formulaire
      onTaskCreated(); // Appeler cette fonction pour fermer le formulaire
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  return (
    <form onSubmit={createTask} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          placeholder="Titre"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedTo">Assigné à (optionnel)</label>
        <input
          type="text"
          id="assignedTo"
          placeholder="ID Utilisateur"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Statut</label>
        <select
          id="status"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="à faire">à faire</option>
          <option value="en cours">en cours</option>
          <option value="terminé">terminé</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">Date limite</label>
        <input
          type="date"
          id="dueDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Créer la tâche
      </button>
    </form>
  );
}

export default TaskForm;

import React, { useState } from 'react';
import axios from 'axios';
//import TaskStatus from './TaskStatus';
import TaskForm from './TaskForm'; // Importer le TaskForm

function UserTasks() {
  const [userId, setUserId] = useState('');
  const [userTasks, setUserTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: '', description: '', due_date: '' });

  const handleFetchTasks = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3002/tasks/user/${userId}`);
        setUserTasks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches de l’utilisateur :', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3002/tasks/${taskId}`);
      setUserTasks(userTasks.filter(task => task.task_id !== taskId)); // Mettre à jour l'état des tâches après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  const handleUpdateTask = (task) => {
    setTaskToUpdate(task);
    setUpdatedTask({ title: task.title, description: task.description, due_date: task.due_date });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (taskToUpdate) {
      try {
        await axios.put(`http://localhost:3002/tasks/${taskToUpdate.task_id}`, updatedTask);
        handleFetchTasks(); // Rafraîchir les tâches après la mise à jour
        setTaskToUpdate(null); // Fermer le formulaire de mise à jour
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
      }
    }
  };

  return (
    <div className="user-tasks">
      <h2 className="text-xl font-bold mb-4">Gestion des Tâches d'un Utilisateur</h2>

      <button
        onClick={() => setShowAddTaskForm(!showAddTaskForm)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showAddTaskForm ? 'Annuler l\'ajout' : 'Ajouter une tâche'}
      </button>

      {showAddTaskForm && (
        <TaskForm /> // Utiliser le formulaire d'ajout de tâche existant
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Entrez l'ID de l'utilisateur"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          onClick={handleFetchTasks}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Afficher les tâches
        </button>
      </div>

      {userTasks.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Titre</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Date limite</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userTasks.map(task => (
              <tr key={task.task_id} className="text-center border-t">
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">{task.description}</td>
                <td className="py-2 px-4 border-b">
                  {task.status} 
                </td>
                <td className="py-2 px-4 border-b">{task.due_date}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDeleteTask(task.task_id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleUpdateTask(task)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Mettre à jour
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {taskToUpdate && (
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
            Enregistrer les modifications
          </button>
          <button
            type="button"
            onClick={() => setTaskToUpdate(null)} // Fermer le formulaire de mise à jour
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}

export default UserTasks;

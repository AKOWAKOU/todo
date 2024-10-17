import React, { useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskUpdate from './TaskUpdate'; // Importer le nouveau composant

function UserTasks() {
  const [userId, setUserId] = useState('');
  const [userTasks, setUserTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [taskToChangeStatus, setTaskToChangeStatus] = useState(null); // État pour le changement de statut
  const [/*updatedTask*/,setUpdatedTask] = useState({ title: '', description: '', assigned_to: '', due_date: '', status: 'à faire' });
  const [newStatus, setNewStatus] = useState('à faire'); // État pour le nouveau statut

  const handleFetchTasks = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:5002/tasks/user/${userId}`);
        setUserTasks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches de l’utilisateur :', error);
      }
    }
  };

  const handleUpdateTask = (task) => {
    setTaskToUpdate(task && task._id);
    console.log('Tâche sélectionnée pour mise à jour:', task); // Debug
    if (task && task._id) {
      setTaskToUpdate(task);
    } else {
      console.error('Tâche non valide ou ID manquant pour la mise à jour');
    }
    setUpdatedTask({
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to || '',
      due_date: task.due_date,
      status: task.status
    });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5002/tasks/${taskId}`);
      setUserTasks(userTasks.filter(task => task._id !== taskId)); // Mettre à jour les tâches
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  const handleChangeStatus = (task) => {
    setTaskToChangeStatus(task); // Afficher la boîte de sélection pour changer le statut
    setNewStatus(task.status); // Définir le statut actuel comme valeur par défaut
  };

  const handleSubmitChangeStatus = async () => {
    if (taskToChangeStatus) {
      try {
        await axios.patch(`http://localhost:5002/tasks/${taskToChangeStatus._id}/status`, { status: newStatus });
        handleFetchTasks(); // Rafraîchir les tâches après le changement de statut
        setTaskToChangeStatus(null); // Réinitialiser l'état après le changement de statut
      } catch (error) {
        console.error('Erreur lors du changement de statut de la tâche :', error);
      }
    }
  };

  const handleTaskCreated = () => {
    setShowAddTaskForm(false); // Fermer le formulaire après la création
    handleFetchTasks(); // Rafraîchir les tâches pour mettre à jour la liste
  };
  
  return (
    <div className="user-tasks">
      <h2 className="text-xl font-bold mb-4">Manage Tasks</h2>

      <button
        onClick={() => setShowAddTaskForm(!showAddTaskForm)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showAddTaskForm ? 'Cancel' : 'Add Task'}
      </button>

      {showAddTaskForm && <TaskForm onTaskCreated={handleTaskCreated} />}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        />
        <button
          onClick={handleFetchTasks}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Display Tasks
        </button>
      </div>

      {userTasks.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Assigned To</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userTasks.map(task => (
              <tr key={task._id} className="text-center border-t">
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">{task.description}</td>
                <td className="py-2 px-4 border-b">{task.assigned_to?.name || 'Unassigned'}</td>
                <td className="py-2 px-4 border-b">{task.status}</td>
                <td className="py-2 px-4 border-b">{task.due_date}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Delete
                  </button>
                  <button onClick={() => handleUpdateTask(task)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Update
                  </button>
                  <button onClick={() => handleChangeStatus(task)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                    ChangeStatus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Afficher le composant TaskUpdate si une tâche doit être mise à jour */}
      {taskToUpdate && (
        <TaskUpdate task={taskToUpdate} onUpdate={handleFetchTasks} onCancel={() => setTaskToUpdate(null)} />
      )}

      {taskToChangeStatus && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Change Status</h3>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
            <option value="à faire">à faire</option>
            <option value="en cours">en cours</option>
            <option value="terminé">terminé</option>
          </select>
          <button onClick={handleSubmitChangeStatus} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change</button>
          <button onClick={() => setTaskToChangeStatus(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">Cancel</button>
        </div>
      )}
    </div>
  );
}

export default UserTasks;

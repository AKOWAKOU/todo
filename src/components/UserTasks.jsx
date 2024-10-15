import React, { useState } from 'react';
import axios from 'axios';
import TaskStatus from './TaskStatus';

function UserTasks() {
  const [userId, setUserId] = useState('');
  const [userTasks, setUserTasks] = useState([]);

  const handleFetchTasks = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3002/tasks/user/${userId}`, {headers:{"Access-Control-Allow-Origin": "*"}});
        setUserTasks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches de l’utilisateur :', error);
      }
    }
  };

  return (
    <div className="user-tasks">
      <h2 className="text-xl font-bold mb-4">Rechercher les tâches d'un utilisateur</h2>
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
              <th className="py-2 px-4 border-b">Changer le statut</th>
            </tr>
          </thead>
          <tbody>
            {userTasks.map(task => (
              <tr key={task.task_id} className="text-center border-t">
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">{task.description}</td>
                <td className="py-2 px-4 border-b">{task.status}</td>
                <td className="py-2 px-4 border-b">{task.due_date}</td>
                <td className="py-2 px-4 border-b">
                  <TaskStatus taskId={task.task_id} currentStatus={task.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTasks;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskStatus from './TaskStatus';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Erreur lors de la récupération des tâches :', error));
  }, []);

  return (
    <div className="task-list">
      <h2 className="text-xl font-bold mb-4">Liste des tâches</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Titre</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Assigné à</th>
            <th className="py-2 px-4 border-b">Statut</th>
            <th className="py-2 px-4 border-b">Date limite</th>
            <th className="py-2 px-4 border-b">Changer le statut</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className="text-center border-t">
              <td className="py-2 px-4 border-b">{task.title}</td>
              <td className="py-2 px-4 border-b">{task.description}</td>
              <td className="py-2 px-4 border-b">{task.assigned_to || 'Non assigné'}</td>
              <td className="py-2 px-4 border-b">{task.status}</td>
              <td className="py-2 px-4 border-b">{task.due_date}</td>
              <td className="py-2 px-4 border-b">
                <TaskStatus taskId={task._id} currentStatus={task.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;

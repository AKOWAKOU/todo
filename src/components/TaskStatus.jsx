import React, { useState } from 'react';
import axios from 'axios';

function TaskStatus({ taskId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:5002/tasks/${taskId}/status`, { status: newStatus });
      setStatus(newStatus);
      console.log(`Statut de la tâche mis à jour : ${newStatus}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="à faire">à faire</option>
      <option value="en cours">en cours</option>
      <option value="terminé">terminé</option>
    </select>
  );
}

export default TaskStatus;

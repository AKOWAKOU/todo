import React from 'react';
import axios from 'axios';

function TaskStatus({ taskId, currentStatus, onStatusChange }) {
  const handleChangeStatus = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.patch(`http://localhost:3002/tasks/${taskId}/status`, { status: newStatus });
      onStatusChange(newStatus); // Appeler la fonction de rappel pour mettre à jour le statut dans le tableau
    } catch (error) {
      console.error('Erreur lors du changement de statut de la tâche :', error);
    }
  };

  return (
    <select 
      value={currentStatus} 
      onChange={handleChangeStatus}
      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="à faire">à faire</option>
      <option value="en cours">en cours</option>
      <option value="terminé">terminé</option>
    </select>
  );
}

export default TaskStatus;

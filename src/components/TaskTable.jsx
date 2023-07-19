import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const TaskTable = ({ tasksData, onDelete, onEdit }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editedTasks, setEditedTasks] = useState({});
  const [editId, setEditId] = useState(null);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleEditChange = (id, value) => {
    setEditedTasks((prevEditedTasks) => ({ ...prevEditedTasks, [id]: value }));
  };

  const handleEditClick = (id) => {
    setEditId(id);
  };

  const handleSave = (id, updatedTask) => {
    const trimmedTask = updatedTask.trim();
    if (trimmedTask !== '') {
      onEdit(id, trimmedTask);
    }
    setEditId(null);
  };

  const handleCancel = () => {
    setEditedTasks({});
    setEditId(null);
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all rows
      setSelectedRows(tasksData.map((task) => task.ID));
    } else {
      // Deselect all rows
      setSelectedRows([]);
    }
  };

  return (
    <div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>
              <Checkbox
                color="primary"
                checked={selectedRows.length === tasksData.length}
                onChange={handleSelectAllChange}
              />
              Select All
            </th>
            <th>Tasks</th>
            <th className='text-end'>
              <button className="btn btn-danger" onClick={() => onDelete(selectedRows)}>
                <DeleteIcon />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasksData.map((task) => (
            <tr key={task.ID}>
              <td>
                <Checkbox
                  color="primary"
                  checked={selectedRows.includes(task.ID)}
                  onChange={(e) => handleCheckboxChange(e, task.ID)}
                />
              </td>
              <td>
                {editId === task.ID ? (
                  <input
                    type="text"
                    value={editedTasks[task.ID] !== undefined ? editedTasks[task.ID] : task.Task}
                    onChange={(e) => handleEditChange(task.ID, e.target.value)}
                  />
                ) : (
                  <>
                    Date: {task.Date} <br />
                    {task.Task}
                  </>
                )}
              </td>
              <td className='text-end'>
                {editId === task.ID ? (
                  <>
                    <button className='btn btn-success' onClick={() => handleSave(task.ID, editedTasks[task.ID])}>
                      Save
                    </button>
                    <button className='btn btn-secondary ms-2' onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className='btn btn-success' onClick={() => handleEditClick(task.ID)}>
                    <EditIcon /> EDIT
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

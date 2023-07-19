import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const ThoughtsTable = ({ thoughtsData, onDelete, onEdit, editId, setEditId }) => {
  const [editedThoughts, setEditedThoughts] = useState('');

  const handleEditChange = (thoughts) => {
    setEditedThoughts(thoughts);
  };

  const handleSave = (id) => {
    if (editedThoughts.trim() !== '') {
      onEdit(id, editedThoughts);
      setEditedThoughts(''); // Clear the edited thoughts state
    }
    setEditId(null); // Reset editId to stop editing mode
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all rows
      setSelectedRows(thoughtsData.map((thought) => thought.ID));
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
            <th className='text-start'>
              <Checkbox
                color="primary"
                checked={selectedRows.length === thoughtsData.length}
                onChange={handleSelectAllChange}
              /> Select All
            </th>
            <th className='text-center'>Thoughts</th>
            <th className='text-end'>
              <button className="btn btn-danger" onClick={() => onDelete(selectedRows)}>
                <DeleteIcon />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {thoughtsData.map((thought) => (
            <tr key={thought.ID}>
              <td className='text-start'>
                <Checkbox
                  color="primary"
                  checked={selectedRows.includes(thought.ID)}
                  onChange={(e) => handleCheckboxChange(e, thought.ID)}
                />
              </td>
              <td className='text-center'>
                Date: {thought.Date} <br></br>
                {editId === thought.ID ? (
                  <input
                    type="text"
                    value={editedThoughts}
                    onChange={(e) => handleEditChange(e.target.value)}
                  />
                ) : (
                  thought.Thoughts
                )}
              </td>
              <td className='text-end'>
                {editId === thought.ID ? (
                  <>
                    <button className='btn btn-success' onClick={() => handleSave(thought.ID)}>
                      Save
                    </button>
                    <button className='btn btn-secondary ms-2' onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className='btn btn-success' onClick={() => setEditId(thought.ID)}>
                    <EditIcon /> Edit
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

export default ThoughtsTable;

import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import TaskTable from './TaskTable';

const TasksForToday = localStorage.getItem('Tasks') ? JSON.parse(localStorage.getItem('Tasks')) : [];

const Task = () => {
  const dateRef = useRef(null);
  const taskRef = useRef(null);

  const [allTasks, setAllTasks] = useState(TasksForToday);
  const [editId, setEditId] = useState(null);

  // Helper function to get the current date in the format accepted by the input element (YYYY-MM-DD)
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let date = currentDate.getDate();

    // Add leading zero to month and date if necessary
    month = month < 10 ? `0${month}` : month;
    date = date < 10 ? `0${date}` : date;

    return `${year}-${month}-${date}`;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const taskData = {
      ID: Date.now(),
      Date: dateRef.current.value,
      Task: taskRef.current.value,
    };
    setAllTasks([...allTasks, taskData]);

    dateRef.current.value = null;
    taskRef.current.value = '';

    console.log(taskData);
  }

  function handleDelete(selectedRows) {
    const updatedTasks = allTasks.filter((task) => !selectedRows.includes(task.ID));
    setAllTasks(updatedTasks);
  }

  // Function to handle the edit action
  const handleEdit = (selectedId, updatedTask) => {
    const updatedTaskData = allTasks.map((task) =>
      task.ID === selectedId ? { ...task, Task: updatedTask } : task
    );
    setAllTasks(updatedTaskData);
    setEditId(null); // Reset editId to stop editing mode
  };

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(allTasks));
  }, [allTasks]);

  return (
    <div className='container w-100 border border-4 m-2 bg-warning'>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor='Date'>Date:</Form.Label>
        <input type='date' name='date' id='date' ref={dateRef} required min={getCurrentDate()} /> <br />
        <Form.Label htmlFor='taskForTheDay'>Task for the Day</Form.Label>
        <InputGroup className='mb-2'>
          <Form.Control as='textarea' aria-label='textarea' id='task' ref={taskRef} required />
        </InputGroup>
        <Button variant='primary' type='submit'>
          Save
        </Button>
      </Form>

      <TaskTable tasksData={allTasks} onDelete={handleDelete} onEdit={handleEdit} editId={editId} setEditId={setEditId} />
    </div>
  );
};

export default Task;

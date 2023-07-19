import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ThoughtsTable from './ThoughtsTable';

const ThoughtsMoToday = localStorage.getItem('Thoughts') ? JSON.parse(localStorage.getItem('Thoughts')) : [];


const Thoughts = () => {
  const d = new Date();
  const date = d.getDate();
  const month = d.getMonth() + 1; // Add 1 to get the correct month value
  const year = d.getFullYear();
  const compleDate = date + "/" + month + "/" + year;

  const thoughtsRef = useRef(null);

  const [allThoughts, setAllThoughts] = useState(ThoughtsMoToday);

  function handleSubmit(e) {
    e.preventDefault();
    const thoughtsData = {
      ID: Date.now(),
      Date: compleDate,
      Thoughts: thoughtsRef.current.value,
    };
    setAllThoughts([...allThoughts, thoughtsData]);

    thoughtsRef.current.value = '';

    console.log(thoughtsData)
  }

  const [editId, setEditId] = useState(null);

  // Function to handle the edit action
  const handleEdit = (selectedId, updatedThoughts) => {
    const updatedThoughtsData = allThoughts.map((thought) =>
      thought.ID === selectedId ? { ...thought, Thoughts: updatedThoughts } : thought
    );
    setAllThoughts(updatedThoughtsData);
    setEditId(null); // Reset editId to stop editing mode
  };

  function handleDelete(selectedRows) {
    const updatedThoughts = allThoughts.filter((thought) => !selectedRows.includes(thought.ID));
    setAllThoughts(updatedThoughts);
  }

  useEffect(()=>{
    localStorage.setItem('Thoughts', JSON.stringify(allThoughts))
  }, [allThoughts])

  
  return (
    <div className='container w-100 border border-4 m-2 bg-info'>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor='Date' className=''>
          Date:
        </Form.Label>
        <input type='text' name='date' id='date' value={compleDate} placeholder={compleDate} readOnly /> <br />
        <Form.Label htmlFor='thoughtsForTheDay'>Thoughts for the Day</Form.Label>
        <InputGroup className='mb-2'>
          <Form.Control as='textarea' aria-label='textarea' id='thoughts' ref={thoughtsRef} required />
        </InputGroup>
        <Button variant='primary' type='submit'>
          Save
        </Button>
      </Form>

      <ThoughtsTable
        thoughtsData={allThoughts}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editId={editId}
        setEditId={setEditId}
      />
    
    </div>
  );
};

export default Thoughts;

'use client'
import React, { useState } from 'react';

const Page = () => {
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [maintask, setMaintask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMaintask([...maintask, { task, desc }]);
    setTask('');
    setDesc('');
    setEditIndex(null);
  };

  const deleteHandler = (i) => {
    let copytask = [...maintask];
    copytask.splice(i, 1);
    setMaintask(copytask);
  };

  const editTaskHandler = (i) => {
    setEditIndex(i);
    setEditTask(maintask[i].task);
    setEditDesc(maintask[i].desc);
  };

  const saveEditHandler = () => {
    let copytask = [...maintask];
    copytask[editIndex] = { task: editTask, desc: editDesc };
    setMaintask(copytask);
    setEditIndex(null);
  };

  let renderTask = <h2>No task is Available</h2>;
  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => {
      if (i === editIndex) {
        return (
          <li key={i} className='flex item-center justify-between mb-8'>
            <div className='flex item-center justify-between w-2/3'>
              <input
                type='text'
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className='p-3 m-3 px-13 text-black border-2'
              />
              <input
                type='text'
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className='p-3 m-3 px-13 text-black border-2'
              />
              <button onClick={() => saveEditHandler()} className='bg-green-400 text-white p-4 rounded font-bold'>
                Save
              </button>
            </div>
          </li>
        );
      } else {
        return (
          <li key={i} className='flex item-center justify-between mb-8'>
            <div className='flex item-center justify-between w-2/3'>
              <h5 className='text-2xl font-semibold'>{t.task}</h5>
              <h6 className='text-lg font-medium'>{t.desc}</h6>
              <button onClick={() => deleteHandler(i)} className='bg-red-400 text-white px-4 py-2 rounded font-bold'>
                Delete
              </button>
              <button onClick={() => editTaskHandler(i)} className='bg-blue-400 text-white px-4 py-2 rounded font-bold'>
                Edit
              </button>
            </div>
          </li>
        );
      }
    });
  }

  return (
    <div>
      <h1 className='bg-red-200 p-10 text-center font-bold text-5xl'>My To-Do List</h1>
      <form onSubmit={submitHandler}>
        <div className='flex text-center justify-center'>
          <input
            type='text'
            className='p-3 m-3 px-13 text-black border-2'
            placeholder='Enter your task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type='text'
            className='p-3 m-3 px-13 text-black border-2'
            placeholder='Enter the description'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button type='submit' className='bg-black text-white p-3 m-3 border-2'>
            Add task
          </button>
        </div>
      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
};

export default Page;

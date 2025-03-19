import { useState } from 'react';
import './App.css';

// Task Component (Props)
function Task(props) {
  const { id, title, assignedTo, completed, message, priority, assignTask, completeTask, markUnsuccessful } = props;

  return (
    <div className={`task ${completed ? 'completed' : ''} ${priority}`}>
      <h3>{title}</h3>
      {assignedTo && <p>Assigned to: {assignedTo}</p>}
      {!completed && <p>Priority: {priority}</p>}
      {completed && <p className="message">{message}</p>}
      {!completed && (
        <div>
          <select
            value={assignedTo || ''}
            onChange={(e) => assignTask(id, e.target.value)}
          >
            <option value="">Select Person</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>
          {assignedTo && (
            <>
              <button onClick={() => completeTask(id)}>Complete</button>
              <button onClick={() => markUnsuccessful(id)}>Mark Unsuccessful</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Main App Component (State, Forms, Events)
function App() {
  const [tasks, setTasks] = useState([]); // State for all tasks
  const [newTask, setNewTask] = useState(''); // State for new task input
  const [priority, setPriority] = useState('Low'); // State for priority selection

  // Event: Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        assignedTo: '',
        completed: false,
        message: '',
        priority: priority,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setPriority('Low'); // Reset to default
    }
  };

  // Event: Assign a task to a person
  const assignTask = (id, person) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, assignedTo: person } : task
      )
    );
  };

  // Event: Mark task as completed
  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: true,
              message: `${task.title} completed by ${task.assignedTo}`,
            }
          : task
      )
    );
  };

  // Event: Mark task as unsuccessful (returns to "To Be Assigned")
  const markUnsuccessful = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              assignedTo: '', // Unassign the task
              completed: false, // Reset completion
              message: '', // Clear message
            }
          : task
      )
    );
  };

  // Filter tasks into frames
  const unassignedTasks = tasks.filter((task) => !task.assignedTo && !task.completed);
  const assignedTasks = tasks.filter((task) => task.assignedTo && !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>

      {/* Task Creation Form */}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <div className="priority-section">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <p className="priority-info">
            High: Urgent | Medium: Important | Low: Routine
          </p>
        </div>
        <button type="submit">Add Task</button>
      </form>

      {/* Frames */}
      <div className="frames">
        {/* Frame 1: Unassigned Tasks */}
        <div className="frame">
          <h2>To Be Assigned</h2>
          {unassignedTasks.length === 0 ? (
            <p>No tasks to assign</p>
          ) : (
            unassignedTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                assignedTo={task.assignedTo}
                completed={task.completed}
                message={task.message}
                priority={task.priority}
                assignTask={assignTask}
                completeTask={completeTask}
                markUnsuccessful={markUnsuccessful}
              />
            ))
          )}
        </div>

        {/* Frame 2: Assigned Tasks */}
        <div className="frame">
          <h2>Assigned Tasks</h2>
          {assignedTasks.length === 0 ? (
            <p>No assigned tasks</p>
          ) : (
            assignedTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                assignedTo={task.assignedTo}
                completed={task.completed}
                message={task.message}
                priority={task.priority}
                assignTask={assignTask}
                completeTask={completeTask}
                markUnsuccessful={markUnsuccessful}
              />
            ))
          )}
        </div>

        {/* Frame 3: Completed Tasks */}
        <div className="frame">
          <h2>Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p>No completed tasks</p>
          ) : (
            completedTasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                assignedTo={task.assignedTo}
                completed={task.completed}
                message={task.message}
                priority={task.priority}
                assignTask={assignTask}
                completeTask={completeTask}
                markUnsuccessful={markUnsuccessful}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
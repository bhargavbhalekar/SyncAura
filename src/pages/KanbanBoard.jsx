import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import logo from '../assets/syncaura-logo.svg';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      newTask: "",
      items: [
        { id: "1", content: "Design UI" },
        { id: "2", content: "Write Docs" },
      ],
    },
    inProgress: {
      name: "In Progress",
      newTask: "",
      items: [
        { id: "3", content: "Backend Setup" },
      ],
    },
    done: {
      name: "Done",
      newTask: "",
      items: [
        { id: "4", content: "Project Plan" },
      ],
    },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const handleAddTask = (columnId) => {
    const taskText = columns[columnId].newTask.trim();
    if (!taskText) return;

    const newTask = {
      id: Date.now().toString(),
      content: taskText,
    };

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [...columns[columnId].items, newTask],
        newTask: ""
      },
    });
  };

  const handleRemoveTask = (columnId, taskId) => {
    const updatedItems = columns[columnId].items.filter(item => item.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: updatedItems
      }
    });
  };

  const handleInputChange = (e, columnId) => {
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        newTask: e.target.value
      }
    });
  };

  return (
    <div className="dashboard-page">
      {/* Navbar with logo and topbar */}
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="SyncAura Logo" className="navbar-logo" />
          <h1 className="navbar-title">SyncAura</h1>
        </div>
        <div className="navbar-right">
          <Topbar />
        </div>
      </div>

      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <div className="kanban-container">
            <DragDropContext onDragEnd={handleDragEnd}>
              {Object.entries(columns).map(([columnId, column]) => (
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => (
                    <div
                      className="kanban-column"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <h2>{column.name}</h2>

                      {/* Add Task Input */}
                      <div className="add-task">
                        <input
                          type="text"
                          value={column.newTask}
                          onChange={(e) => handleInputChange(e, columnId)}
                          placeholder={`Add task in ${column.name}`}
                        />
                        <button onClick={() => handleAddTask(columnId)}>Add</button>
                      </div>

                      {/* Task Items */}
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <div
                              className="kanban-task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span>{item.content}</span>
                              <button
                                className="remove-btn"
                                onClick={() => handleRemoveTask(columnId, item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;

import { FC, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { instance } from '../../api/axios.api';
import { IResponseTaskLoader, ITaskResponse } from '../../types/task.types';
import { useLoaderData } from 'react-router-dom';
import './task.css'


export const taskLoader = async () => {
  const tasks = await instance.get<ITaskResponse[]>('/task/')

  const data = {
    tasks: tasks.data
  }

  return data
}

const TaskList: FC = () => {
  const { tasks } = useLoaderData() as IResponseTaskLoader;

  const initialTasksByStatus: { [key: string]: ITaskResponse[] } = {
    ToDo: tasks.filter(task => task.status === 'ToDo'),
    InProgress: tasks.filter(task => task.status === 'InProgress'),
    OnHold: tasks.filter(task => task.status === 'OnHold'),
    Completed: tasks.filter(task => task.status === 'Completed')
  };

  const [tasksByStatus, setTasksByStatus] = useState(initialTasksByStatus);

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    const updatedTasksByStatus = { ...tasksByStatus };

    const currentStatus = Object.keys(updatedTasksByStatus).find(status =>
      updatedTasksByStatus[status].some(task => task.id === taskId)
    );

    if (currentStatus) {
      const updatedTask = updatedTasksByStatus[currentStatus].find(task => task.id === taskId);
      if (updatedTask) {
        updatedTasksByStatus[currentStatus] = updatedTasksByStatus[currentStatus].filter(task => task.id !== taskId);
      }

      updatedTasksByStatus[newStatus].push(updatedTask!!);

      setTasksByStatus(updatedTasksByStatus);

      await instance.put(`/task/${taskId}`, { status: newStatus });
    } else {
      console.error('Задача с указанным ID не найдена в текущем списке');
    }
  };

  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const newStatus = destination.droppableId;
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='tasks'>
          {Object.keys(tasksByStatus).map(status => (
            <div className='task' key={status}>
              <h3>{status}</h3>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasksByStatus[status].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='draggable-item'
                          >
                            <div className='task-content'>
                              <div className='task-name'><strong>Name:</strong> {task.name}</div>
                              <div className='task-priority'><strong>Priority:</strong> {task.priority}</div>
                              <div className='task-status'><strong>Status:</strong> {task.status}</div>
                              <div className='task-created'><strong>Created At:</strong> {new Date(task.createdAt!!).toLocaleString()}</div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default TaskList;
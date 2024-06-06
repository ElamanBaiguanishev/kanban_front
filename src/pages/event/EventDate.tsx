import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios.api';

const EventDate: FC = () => {
    const [eventsAndTasks, setEventsAndTasks] = useState<{ events: any[], tasks: any[] }>({ events: [], tasks: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { date } = useParams<{ date: string }>();

    useEffect(() => {
        const fetchEventsAndTasks = async () => {
            try {
                const response = await instance.get(`/event/${date}?userId=1`);
                console.log(response.data); // Проверяем формат данных
                setEventsAndTasks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events and tasks:', error);
                setError('Failed to load data');
                setLoading(false);
            }
        };

        fetchEventsAndTasks();
    }, [date]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {eventsAndTasks.events.length === 0 && eventsAndTasks.tasks.length === 0 ? (
                <div>No events or tasks found for this date.</div>
            ) : (
                <>
                    <h2>Events</h2>
                    {eventsAndTasks.events.length === 0 ? (
                        <p>No events for this date.</p>
                    ) : (
                        eventsAndTasks.events.map((event) => (
                            <div key={event.id}>
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <p>{new Date(event.dueDate).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                    <h2>Tasks</h2>
                    {eventsAndTasks.tasks.length === 0 ? (
                        <p>No tasks for this date.</p>
                    ) : (
                        eventsAndTasks.tasks.map((task) => (
                            <div key={task.id}>
                                <h3>{task.name}</h3>
                                <p>Priority: {task.priority}</p>
                                <p>Status: {task.status}</p>
                                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default EventDate;

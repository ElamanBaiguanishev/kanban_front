import { useState, useEffect, FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { instance } from '../../api/axios.api';

interface Event {
  date: string;
  title: string;
}

const CalendarComponent: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await instance.get('/event');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date: Date) => {
    // Format date to yyyy-mm-dd in local time
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString = formatDate(date);
      const dayEvents = events.filter(event => event.date === dateString);
      if (dayEvents.length > 0) {
        return (
          <div
            data-tooltip-id={`tooltip-${dateString}`}
            data-tooltip-content={dayEvents.map(event => event.title).join(', ')}
            className="highlight"
          >
            {dayEvents.length}
          </div>
        );
      }
    }
    return null;
  };

  const onClickDate = (value: Date) => {
    const dateString = formatDate(value);
    navigate(`/event/${dateString}`);
  };

  return (
    <div>
      <Calendar tileContent={tileContent} onClickDay={onClickDate} />
      {events.map(event => (
        <ReactTooltip key={event.date} id={`tooltip-${event.date}`} place="top" />
      ))}
    </div>
  );
};

export default CalendarComponent;

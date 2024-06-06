import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../routes/Routes";
import { FaTasks, FaRocketchat } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";


const SideBar: FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    tasks: false,
    chats: false,
  });

  const toggleExpand = (section: string) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2%' }}>
        <Link to={Routes.Home}>
          <img src="/src/assets/images/logo.png" alt="Logo" style={{ width: '70px' }} />
        </Link>
      </div>

      <div>
        <div onClick={() => toggleExpand("tasks")} className="sidebar-element">
          <FaTasks />
          <span>Мои задачи</span>
          <div>{expanded.tasks ? "▼" : "►"}</div>
        </div>
        {expanded.tasks && (
          <ul>
            <li>
              <Link to={Routes.Tasks.default}>Задачи</Link>
            </li>
            <li>
              <Link to={Routes.Tasks.admin}>Админ панель</Link>
            </li>
            <li>
              {/* <Link to={Routes.Tasks.saas}>SaaS</Link> */}
            </li>
          </ul>
        )}
      </div>

      <div>
        <div onClick={() => toggleExpand("chats")} className="sidebar-element">
          <FaRocketchat />

          <span>Мессенджер</span>
          <div>{expanded.chats ? "▼" : "►"}</div>
        </div>
        {expanded.chats && (
          <ul>
            <li>
              <Link to={Routes.Component.privatechat}>Личные сообщения</Link>
            </li>
            <li>
              <Link to={Routes.Component.conference}>Конференции</Link>
            </li>
          </ul>
        )}
      </div>

      {/* <div>
        <div className="sidebar-element">
          <FaRocketchat />
          <span>
            <Link to={Routes.Chat}>Чаты</Link>
          </span>
        </div>
      </div> */}

      <div>
        <div className="sidebar-element">
          <FaCalendarAlt />
          <span>
            <Link to={Routes.Calendar}>Календарь</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

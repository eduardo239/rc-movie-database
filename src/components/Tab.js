export const Tab = ({ className, label, isActive, onClick, children }) => {
  const tabClass = `tabs__tab ${className}`;
  const linkClass = isActive ? 'tabs__tab-link--active' : 'tabs__tab-link';

  return (
    <li className={tabClass}>
      <button className={linkClass} onClick={onClick}>
        {className}
      </button>
    </li>
  );
};

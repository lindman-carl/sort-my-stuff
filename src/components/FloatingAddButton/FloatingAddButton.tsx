import React, { useState } from "react";
import cn from "classnames";

// icons
import { MdAdd } from "react-icons/md";
import { Collection, Unit } from "@prisma/client";

export type Action = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  parents: (Collection | Unit)[] | undefined;
};

// main component
type FloatingAddButtonProps = {
  actions: Action[];
};

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ actions }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <ul className="fab-container">
      <li className="fab-button" onClick={toggleOpen}>
        <MdAdd />
      </li>
      {actions.map((action, index) => (
        <li
          style={{ transitionDelay: `${index * 25}ms` }}
          className={cn("fab-action", { open })}
          key={action.label}
          onClick={action.onClick}
        >
          {action.icon}
          <span className="tooltip">{action.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default FloatingAddButton;

export interface Todo {
  id: number;
  task: string;
  created_at: string;
}
export interface Signup {
  username: string;
  email: string;
  password: string;
}

export interface Employee {
  id: number;
  username: string;
  email: string;
  manager_id: number;
  password: string;
  role: string;
}

type Member = {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: string;
};

export type Props = {
  todo: Todo;
  index: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  
};

export type Form = {
  onSubmit: (data: Member) => void;
  isOpen: (setIsOpen: boolean) => void;
  editId: number;
  selectedMember: boolean;
  managers: Employee[]
};
export type SidebarProps = {
  setSelectedUser: (id: number) => void;
  setSelectUserName: (username: string) => void;
};

export type EmployeeSidebarProps = {
  setView: (view: "my" | "assigned") => void;
};

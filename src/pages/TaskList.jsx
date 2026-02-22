import { TASK_DATA } from "../api/mock_data";
import { TaskCards } from "../components/taskCards";

export default function TaskList() {
  return (
    <div className="mx-16">
      <TaskCards tasks={TASK_DATA}></TaskCards>
    </div>
  );
}

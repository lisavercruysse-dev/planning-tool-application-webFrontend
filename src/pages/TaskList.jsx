import { TASK_DATA } from "../api/mock_data";
import { TaskCards } from "../components/tasks/TaskCards";

export default function TaskList() {
  return (
    <div className="mx-16 flex flex-col gap-6 mt-4.25">
      <TaskCards tasks={TASK_DATA}></TaskCards>
    </div>
  );
}

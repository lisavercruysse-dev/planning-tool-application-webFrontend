import { TaskCards } from './taskCards.jsx'

export function TaskList({tasks, searchQuery, setSearchQuery, onTaskDetailsClick}) {
    return (
        <div>
            <TaskCards
                tasks={tasks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onTaskDetailsClick={onTaskDetailsClick}
              />
        </div>  
    )
}
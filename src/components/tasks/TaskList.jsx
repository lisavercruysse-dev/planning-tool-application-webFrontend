import { TaskCards } from './taskCards.jsx'

export function TaskList({tasks, searchQuery, setSearchQuery}) {
    return (
        <div>
            <TaskCards
                tasks={tasks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
        </div>  
    )
}
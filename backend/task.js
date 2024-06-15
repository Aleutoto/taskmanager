require('dotenv').config();

class TaskManager {
    constructor(taskTitle, taskDetails, isTaskComplete = false) {
        this.taskTitle = taskTitle;
        this.taskDetails = taskDetails;
        this.isTaskComplete = isTaskComplete;
    }

    setTaskCompleted() {
        this.isTaskComplete = true;
    }

    updateTaskDetails(newDetails) {
        this.taskDetails = newDetails;
    }

    displayCurrentTaskStatus() {
        console.log(`Task: ${this.taskTitle} - ${this.taskDetails} [${this.isTaskComplete ? 'Complete' : 'Incomplete'}]`);
    }
}

const initialTask = new TaskManager(process.env.TASK_NAME, process.env.TASK_DESCRIPTION);
initialTask.displayCurrentTaskStatus();
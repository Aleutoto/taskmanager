require('dotenv').config();

class TaskManager {
    constructor(title, details, isComplete = false) {
        this.title = title;
        this.details = details;
        this.isComplete = isComplete;
    }

    markTaskAsCompleted() {
        this.isComplete = true;
    }

    reviseTaskDetails(updatedDetails) {
        this.details = updatedDetails;
    }

    showTaskStatus() {
        console.log(`Task: ${this.title} - ${this.details} [${this.isComplete ? 'Complete' : 'Incomplete'}]`);
    }
}

const initialTask = new TaskManager(process.env.TASK_NAME, process.env.TASK_DESCRIPTION);
initialTask.showTaskStatus();
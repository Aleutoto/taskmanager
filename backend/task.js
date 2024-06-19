require('dotenv').config();

class TaskManager {
    constructor(title, details, isComplete = false) {
        if (!title || !details) {
            throw new Error('Title and details are required to create a task.');
        }

        if (typeof isComplete !== 'boolean') {
            throw new TypeError('isComplete must be a boolean value.');
        }

        this.title = title;
        this.details = details;
        this.isExample = isComplete;
    }

    markTaskAsCompleted() {
        this.isComplete = true;
    }

    reviseTaskDetails(updatedDetails) {
        if (!updatedDetails) {
            throw new Error('Updated details are required to revise a task.');
        }
        this.details = updatedDetails;
    }

    showTaskStatus() {
        console.log(`Task: ${this.title} - ${this.details} [${this.isComplete ? 'Complete' : 'Incomplete'}]`);
    }
}

try {
    const initialTask = new TaskManager(process.env.TASK_NAME, process.env.TASK_DESCRIPTION);
    initialTask.showTaskStatus();

    // Example of revising task details - Wrap in try..catch block for error handling
    // try {
    //     initialTask.reviseTaskDetails('New details for the task');
    // } catch (error) {
    //     console.error(error.message);
    // }

    // Example of marking task as complete - Normally safe, but can be wrapped if extended in future
    // initialTask.markTaskAsCompleted();

} catch (error) {
    console.error('Failed to initialize a task:', error.message);
}
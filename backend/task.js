require('dotenv').config();
class Task {
    constructor(name, description, isComplete = false) {
        this.name = name;
        this.description = description;
        this.isComplete = isComplete;
    }
    markComplete() {
        this.isComplete = true;
    }
    updateDescription(newDescription) {
        this.description = newDescription;
    }
    displayTask() {
        console.log(`Task: ${this.name} - ${this.description} [${this.isComplete ? 'Complete' : 'Incomplete'}]`);
    }
}
const task1 = new Task(process.env.TASK_NAME, process.env.TASK_DESCRIPTION);
task1.displayTask();
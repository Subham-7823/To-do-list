import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todolist');

  task = "";
  newtime = "";

  taskList: { id: number, task: string, time: string }[] = [];

  showRemainingOnly = false; // flag for button

  addTask() {
    if (this.task.trim() && this.newtime) {
      this.taskList.push({
        id: this.taskList.length + 1,
        task: this.task.trim(),
        time: this.newtime
      });
      this.task = '';
      this.newtime = '';
    }
  }

  deleteTask(taskId: number) {
    this.taskList = this.taskList.filter(item => item.id !== taskId);
  }

  // ✅ Filter tasks after current time
  get remainingTasks() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return this.taskList.filter(task => {
      const [h, m] = task.time.split(":").map(Number);
      const taskMinutes = h * 60 + m;
      return taskMinutes > currentMinutes;
    });
  }
}

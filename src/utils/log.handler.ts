import { Task, ITask } from "../databases/mongodb/task.model";

export class LogHandler {
  static async logAction(
    name: string,
    assignedTo: string,
    status: string = "pending"
  ): Promise<ITask> {
    const task = new Task({
      name,
      assignedTo,
      status,
      dueDate: new Date(),
    });
    return await task.save();
  }

  static async getLogs(): Promise<ITask[]> {
    return await Task.find().exec();
  }

  async getLogsByUser(userId: string): Promise<ITask[]> {
    return await Task.find({ assignedTo: userId }).exec();
  }

  async getLogsByAction(action: string): Promise<ITask[]> {
    return await Task.find({ name: action }).exec();
  }
}

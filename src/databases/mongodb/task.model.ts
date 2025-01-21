import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  assignedTo: string;
  dueDate: Date;
  status: string;
}

const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "CREATE_USER",
      "DELETE_USER",
      "UPDATE_USER",
      "CREATE_COLOC",
      "DELETE_COLOC",
      "ADD_MEMBER",
      "REMOVE_MEMBER",
      "UPDATE_COLOC",
      "TRANSFER_COLOC",
    ],
  }, //voir si + finance
  assignedTo: { type: String, required: true },
  dueDate: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

export const Task = mongoose.model<ITask>("Task", TaskSchema);

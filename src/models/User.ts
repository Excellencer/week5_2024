import mongoose, { Document, Schema, Types } from 'mongoose'

interface ITodo {
    todo: string
}

interface ITodoDocument extends ITodo, Document {}

interface IUser extends Document {
    name: string
    todos: Types.DocumentArray<ITodoDocument>;
}

let todoSchema: Schema = new Schema({
    todo: {type: String, required: true},
})

let userSchema: Schema = new Schema({
    name: {type: String, required: true},
    todos: [todoSchema],
})

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema)
const Todo: mongoose.Model<ITodoDocument> = mongoose.model<ITodoDocument>('Todo', todoSchema);

export { User, IUser, Todo, ITodo, ITodoDocument };
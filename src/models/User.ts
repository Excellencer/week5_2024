import mongoose, { Document, Schema, Types} from 'mongoose';

interface ITodo extends Document { 
    todo: string;
}


interface IUser extends Document {
    name: string;
    todos: Types.DocumentArray<ITodo>;
}

let todoSchema: Schema = new Schema({
    todo: { type: String, required: true },
});

let userSchema: Schema = new Schema({
    name: { type: String, required: true },
    todos: [todoSchema],
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);
const Todo: mongoose.Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);


export { User, IUser, Todo, ITodo };
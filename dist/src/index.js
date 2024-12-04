"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const User_1 = require("../src/models/User");
let router = (0, express_1.Router)();
let jsonParser = body_parser_1.default.json();
router.get('/', (req, res) => {
    res.sendFile(path_1.default.join('public', '../index.html'));
    res.sendFile(path_1.default.join('public', '../js/main.js'));
});
router.post('/add', jsonParser, async (req, res) => {
    console.log(req.body);
    let { name, todo } = req.body;
    if (!name || !todo) {
        res.status(500).send('Input both fields');
        return;
    }
    try {
        let user = await User_1.User.findOne({ name });
        if (!user) {
            let newUser = new User_1.User({
                name,
                todos: [{ todo }],
            });
            await newUser.save();
            res.send(`Todo added successfully for user ${name}.`);
        }
        else {
            user.todos.push({ todo });
            await user.save();
            res.send(`Todo added successfully for user ${name}.`);
        }
    }
    catch (error) {
        console.error('Error', error);
        res.status(500).send('An error occurred.');
    }
});
router.get("/todos/:id", jsonParser, async (req, res) => {
    let username = req.params.id;
    try {
        let user = await User_1.User.findOne({ name: username }).populate('todos').exec();
        if (!user) {
            res.status(500).send("User not found");
            return;
        }
        let todos = user.todos.map((x) => x.todo);
        res.json(todos);
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error ocurred");
    }
});
router.delete("/delete/:name", async (req, res) => {
    let username = req.params.name;
    try {
        let deletedUser = await User_1.User.findOneAndDelete({ name: username });
        if (!deletedUser) {
            res.status(500).send("User not found");
            return;
        }
        res.send("user deleted");
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error ocurred.");
    }
});
router.put("/update", jsonParser, async (req, res) => {
    console.log(req.body.name);
    let { name, todo } = req.body;
    try {
        let user = await User_1.User.findOne({ name });
        if (!user) {
            res.status(500).send("User not found.");
            return;
        }
        let todoIndex = user.todos.findIndex((x) => x.todo === todo);
        if (todoIndex === -1) {
            res.status(500).send("Todo not found.");
            return;
        }
        user.todos.splice(todoIndex, 1);
        await user.save();
        res.send("Todo deleted successfully.");
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error ocurred");
    }
});
exports.default = router;

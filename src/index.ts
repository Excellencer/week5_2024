import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { User, ITodo } from '../src/models/User';

let router: Router = Router();
let jsonParser = bodyParser.json();

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join('public', '../index.html'));
  res.sendFile(path.join('public', '../js/main.js'));
});

router.post('/add', jsonParser, async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  let { name, todo } = req.body;

  if (!name || !todo) {
    res.status(500).send('Input both fields');
    return;
  }

  try {
    let user = await User.findOne({ name });

    if (!user) {
      let newUser = new User({
        name,
        todos: [{ todo }], 
      });
      await newUser.save();
      res.send(`Todo added successfully for user ${name}.`);
    } else {
      
      user.todos.push({ todo } as ITodo); 
      await user.save();
      res.send(`Todo added successfully for user ${name}.`);
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('An error occurred.');
  }
});


router.get("/todos/:id", jsonParser, async (req: Request, res: Response): Promise<void> => {
  let username: string = req.params.id;

  try {
    let user = await User.findOne({ name: username }).populate('todos').exec();

    if (!user) {
      res.status(500).send("User not found");
      return;
    }
    let todos = user.todos.map((x) => x.todo);
    res.json(todos);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error ocurred");
  }
});

router.delete("/delete/:name", async (req: Request, res: Response): Promise<void> => {
  let username = req.params.name;

  try {
    let deletedUser = await User.findOneAndDelete({ name: username });

    if (!deletedUser) {
      res.status(500).send("User not found");
      return;
    }
    res.send("user deleted");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error ocurred.");
  }
});

router.put("/update", jsonParser, async (req: Request, res: Response): Promise<void> => {
  console.log(req.body.name)
  let { name, todo } = req.body;


  try {
    let user = await User.findOne({ name });

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
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("An error ocurred");
  }
});

export default router;

import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { User, ITodoDocument } from '../src/models/User';

const router: Router = Router();
const jsonParser = bodyParser.json();

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join('public', '../index.html'));
  res.sendFile(path.join('public', '../js/main.js'));
});

router.post('/add', jsonParser, async (req: Request, res: Response): Promise<void> => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    res.status(500).send('Input both fields');
    return;
  }

  try {
    let user = await User.findOne({ name });

    if (!user) {
      const newUser = new User({
        name,
        todos: [{ todo }], 
      });
      await newUser.save();
      res.send(`Todo added successfully for user ${name}.`);
    } else {
      
      user.todos.push({ todo } as ITodoDocument); 
      await user.save();
      res.send(`Todo added successfully for user ${name}.`);
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('An error occurred.');
  }
});

export default router;

/*
type TUser = {
    name: string;
    todos: string[];
};

let UserList: TUser[] = [];




router.post("/add", jsonParser, function (req: Request, res: Response) {

    let index : number = 0;
    index = UserList.findIndex(x  => x.name === req.body.name);

    console.log(index);
    if (index === -1) {
        UserList.push({ name: req.body.name, todos: [req.body.todo] });
        res.send(`Todo added successfully for user ${req.body.name}.`);
    } else {
        UserList[index].todos.push(req.body.todo
        )
        res.send(`Todo added successfully for user ${req.body.name}.`);
    }
    //console.log(UserList)
    //console.log(UserList[0].todos)
    //console.log(UserList[0].todos[0])
    
});



router.get("/todos/:id", jsonParser, function (req: Request, res: Response) {

    let index :number = 0;
    let username : string = req.params.id;
    index = UserList.findIndex(x => x.name === username);
    if (index === -1) {
        res.status(201).send("User not found");
    } else {
      console.log(UserList[index].todos)
      res.json(UserList[index].todos);
    }
  });

router.delete("/delete", function (req: Request, res: Response) {
    console.log("Toimii")
    let index : number= 0;
    
    index = UserList.findIndex(x => x.name === req.body);
    if (index === -1) {
      console.log("Hello 2")
      res.send("User not found")
    } else {
    UserList.splice(index, 1)
      console.log("Hello 1")
      res.send("User deleted");
    }
  });

*/

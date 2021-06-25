import express from 'express';
import { testHandler } from './src/handler/test';
import { userHandler } from './src/handler/user';
import { signUpHandler } from './src/handler/signUp';
import { phoneHandler } from './src/handler/phone';

const app = express();
const port = 3000;

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

testHandler(app);
userHandler(app);
signUpHandler(app);
phoneHandler(app);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

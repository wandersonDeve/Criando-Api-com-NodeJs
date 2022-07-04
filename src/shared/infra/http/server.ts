import {app, port} from './app';

app.listen(port, () => {
    console.info(`Server is running at http://localhost:${port}`);
  });
  
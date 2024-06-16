# Example Tasks API

- [1. Installation](#installation)
- [2. Launching in development mode](#launching-in-development-mode)
- [3. Available routes](#available-routes)

### Installation
```shell
git clone https://github.com/ravenekse/todo-example-app.git
npm install
```

After installing all packages via NPM, copy the **.env.example** file and name it **.env**. Then run the migrations that will create the tables in the SQLite database.

```shell
node ace migration:run
```

### Launching in development mode
To start the server in development mode, run the following command:

```shell
npm run dev
```

### Available routes
The following routes are available in the application:

| Route      | Method | Form data                                                                                   | Description                 |
|------------|--------|---------------------------------------------------------------------------------------------|-----------------------------|
| /tasks     | GET    | -                                                                                           | Returns all records         |
| /tasks     | POST   | title: string (required)<br/>description: string (optional)                                 | Adds new record             |
| /tasks/:id | GET    | -                                                                                           | Returns one selected record |
| /tasks/:id | PATCH  | title: string (required)<br/>description: string (optional)<br/>is_done: boolean (optional) | Updates the selected record |
| /tasks/:id | DELETE | -                                                                                           | Deletes the selected record |

More information about the framework can be found in its official documentation: https://docs.adonisjs.com

//The task of declaring the port and starting the server.
const app = require("./src/app");

const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log('Hello Word');
});

// process is the process method
// in node with SIGINT (ctrl + c)
process.on('SIGINT', () => {
    server.close(() => console.log('Exit Server Express'));
});
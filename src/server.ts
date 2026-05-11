import { buildApp } from './app.js';

const PORT = Number(process.env.PORT) || 3000;
const testMode = process.env.NODE_ENV === 'test';

const app = buildApp({ testMode });

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server ready at http://localhost:${String(PORT)}`);
});

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forceful shut down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
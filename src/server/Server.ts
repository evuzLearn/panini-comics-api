import express, { Express, Router } from 'express';
import bodyParser from 'body-parser';

export class Server {
  app: Express;
  port: number;

  constructor(routes: { [e: string]: Router } = {}) {
    this.app = express();
    this.port = +process.env.PORT || 3001;
    this.app.use(bodyParser.json());
    this.app.get('/api', (req, res) => {
      res.send({ message: `Welcome to api!` });
    });
    Object.keys(routes).forEach(key => {
      this.app.use(`/${key}`, routes[key]);
    });
    this.listenerNotFound();
    this.listenerError();
  }

  start() {
    return new Promise((resolve, reject) => {
      this.app.listen(this.port, err => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log(`Listening at http://localhost:${this.port}`);
        resolve();
      });
    });
  }

  private listenerNotFound() {
    this.app.use((req, res, next) => {
      return res.status(404).send({ mensaje: 'Not found' });
    });
  }

  private listenerError() {
    this.app.use((error, req, res, next) => {
      console.error(error);
      return res.status(500).send({ mensaje: 'There was an error', error });
    });
  }
}

import express from 'express';
import config from './config.js'
import mongo from './db/connect.js'
import api from './routes/api.js'
import views from './routes/views.js'

const app = express();
const { PORT } = config;

api(app);
views(app);

async function initDB() {
  const DB = await mongo.connect()
  if (DB) {
    initExpress()
  }
}

function initExpress() {
  console.log("Iniciando instancia de Express...");
  app.listen(PORT, ()=>{
    console.log("El servidor Express esta activo.");
  });
  process.on("SIGINT", closeApp);
  process.on("SIGTERM", closeApp);
}

function closeApp(){
    mongo.disconnect().then(()=>process.exit(0));
}

initDB()
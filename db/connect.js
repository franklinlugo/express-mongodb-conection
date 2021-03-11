import mongodb from 'mongodb';
import config from './config.js'

const { DB_HOST, DB_PORT, DB_NAME } = config;
const { MongoClient }  = mongodb;

const connectionUrl = `mongodb://${DB_HOST}:${DB_PORT}`;
let instance = null;
let isDisconnecting = false;

function connect() {
  return new Promise((resolve, reject)=>{
      MongoClient.connect(connectionUrl, { useNewUrlParser: true }, function(err, client) {
          if (err) { reject(err); }
          console.log("Conectado satisfactoriamente al servidor de Mongo!");
          instance = client;
          resolve(client.db(DB_NAME));
      });
  });
}

function disconnect(){
  if (instance && !isDisconnecting){
      isDisconnecting = true;
      console.log("Desconectando instancia de Mongo");
      return new Promise((resolve, reject)=>{
          instance.close((err, result)=>{
              if (err) { reject(err); isDisconnecting=false; return; }
              console.log("Instancia de Mongo desconectada!");
              resolve();
          });
      })
  }
}

export default {
  connect,
  disconnect,
  instance: () => instance,
}
import mongo from './connect.js'
import yargs from 'yargs';
import usersData from '../resources/users.js';


const args = yargs(process.argv.slice(2)).argv;

if (args.fill) {
    mongo.connect()
      .then(db=>{
          db.collection("users").insertMany(usersData, (err, result)=>{
              if (err) throw err;
              console.log("Los datos han sido insertados satisfactoriamente!");
              mongo.disconnect();
          });
      })
}

if (args.clear) {
    mongo.connect()
      .then(db=>{
          db.collection("users").drop((err, result)=>{
              if (err) throw err;
              console.log("La colección se ha descartado satisfactoriamente!");
              mongo.disconnect();
          });
      })
}
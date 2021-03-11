import mongo from './connect.js';
import config from './config.js';

const { DB_NAME } = config;

export default {
    getUsers: function() {
      const db = mongo.instance().db(DB_NAME);
      const users = db.collection("users").find({}).toArray();
      return users;
    },
    getUserById: function(id) {
      const db = mongo.instance().db(DB_NAME);
      const user = db.collection("users").find({ _id: id}).toArray();
      return user;
    },
    getUserByAgeRange: function(lower = 0, higher = 99) {
      const db = mongo.instance().db(DB_NAME);
      const users = db.collection("users").find({
        age: {
          $gte: Number(lower),
          $lte: Number(higher)
        }
      }).toArray();
      return users;
    }
}

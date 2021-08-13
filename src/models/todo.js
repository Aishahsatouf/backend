  
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tasks = new mongoose.Schema({
  task: { type: String, required: true },
  description: { type: String, required: true },
  creationdate:{type:Date,required:true},
  duedate: { type: String},
  userId: { type: Schema.Types.ObjectId, ref: "to_do_users", required: true },
},
{
   timestamps: true
 }
);

module.exports = mongoose.model('tasks', Tasks);
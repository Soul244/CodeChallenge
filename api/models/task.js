const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  address: {type: Object, required: true},
  phone: {type: String, required:true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  time: {type: String, required:true, default: Date.now },
  date: {type: String, required:true, default: Date.now }, 
  isTaskDone: {type: Boolean, default: false},
  isTaskMissed: {type: Boolean, default: false}
},{
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');
const Task = require('../models/task');

exports.Get_Task = (req, res) => {
  Task.findOne({
      _id: req.params._id
    })
    .exec()
    .then((task) => {
      if (task.length < 1) {
        return res.status(404).json({
          error: 'Görüşme bulunamadı',
        });
      }
      return res.status(200).json({
        task,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.Post_Task = (req, res) => {
  const {
    body
  } = req;
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    name: body.name,
    surname: body.surname,
    email: body.email,
    address: body.address,
    phone: body.phone,
    user: body.user,
    time: body.time,
    date: body.date
  });
  task.save()
    .then((task) => {
      res.status(200).json({
        task,
        message: 'Görüşme kaydedildi',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};


exports.Get_Tasks = (req, res) => {
  Task.find({user: req.params._id})
    .sort({
      createdAt: -1
    })
    .exec()
    .then((tasks) => {
      if (tasks.length > 0) {
        res.status(200).json({
          tasks,
          message: 'Görüşmeler getirildi...',
        });
      } else {
        res.status(201).json({
          tasks: [],
          message: 'Görüşme bulunamadı...',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.Delete_Task = (req, res) => {
  const {_id} = req.params;
  Task.remove({
    _id
  })
  .exec()
  .then(result =>
    res.status(200).json({
      _id,
      message: 'Görüşme Silindi',
    }))
  .catch((error) => {
    console.log(error);
    res.status(500).json({
      error,
    });
  });
};

exports.Update_Task = (req, res) => {
  const {body,params} = req;
  const {_id} = params;
  const updateOps = {};
  var options = { new: true }; 
  for (const [key, value] of Object.entries(body)) {
    updateOps[key] = value;
  }
  Task.findOneAndUpdate({_id}, { $set: updateOps}, options)
    .exec()
    .then((result) => {
      res.status(200).json({
        _id,
        updatedData: result,
        message: 'Görüşme Güncellendi',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};


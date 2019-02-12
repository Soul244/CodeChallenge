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
  console.log(task);
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
  console.log(req.params._id)
  Task.find({user: req.params._id})
    .sort({
      createdAt: -1
    })
    .exec()
    .then((tasks) => {
      if (tasks.length > 0) {
        console.log(tasks);
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
  Task.remove({
      _id: req.params._id,
    })
    .exec()
    .then(task =>
      res.status(200).json({
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
  const updateOps = {};
  for (const [key, value] of Object.entries(body)) {
    updateOps[key] = value;
  }
  console.log(params._id)
  console.log(updateOps);
  Task.updateOne({
    _id: params._id
    }, {
      $set: updateOps,
    })
    .exec()
    .then(() => {
      console.log("Görüşme Güncellendi")
      res.status(200).json({
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


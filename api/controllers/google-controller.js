const axios = require('axios');

exports.Get_Distance = (req, res) => {
  const {
    body
  } = req;
  const link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${body.starting.lat},${body.starting.lng}&destinations=${body.destination.lat},${body.destination.lng}&key=AIzaSyDt0UBms1C1UbTGFQeFgX4Wj8Yo3aJVPQ8`
  axios.get(link)
    .then(response => {
      res.status(200).json({
        _id: body._id,
        duration: response.data.rows[0].elements[0].duration.text,
        distance: response.data.rows[0].elements[0].distance.text
      })
    })
    .catch(error=>{
      console.log(error);
      res.status(500).json({
        error
      })
    })
}
const axios = require('axios');

exports.Get_Distance = (req, res) => {
  const {
    body
  } = req;
  const link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${body.starting.lat},${body.starting.lng}&destinations=${body.destination.lat},${body.destination.lng}&key=AIzaSyDt0UBms1C1UbTGFQeFgX4Wj8Yo3aJVPQ8`
  axios.get(link)
    .then(response => {
      if(response.data.rows[0].elements[0].status !== "ZERO_RESULTS") {
        res.status(200).json({
          _id: body._id,
          duration: response.data.rows[0].elements[0].duration.text,
          distance: response.data.rows[0].elements[0].distance.text
        })
      } else {
        res.status(200).json({
          _id: body._id,
          message: "No Result"
        })
      }
    })
    .catch(error=>{
      console.log(error);
      res.status(500).json({
        error
      })
    })
}
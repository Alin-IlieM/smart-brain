const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '3d8df9338a23416cbddf4fa5d3153c1f'
  });

  const handleApiCall = (req, resp) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {resp.json(data);}).catch(err=> resp.status(400).json('unable to work with api'))
  }
  

const handleImage = (req, resp, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        resp.json(entries[0].entries)
    })
    .catch(err=> resp.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}
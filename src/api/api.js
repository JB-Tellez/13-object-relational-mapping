
import express from 'express';
import singers from '../models/singers.js';

const router = express.Router();

router.get('/api/v1/singers', (req, res) => {
  singers
    .find()
    .then(foundSingers => res.send(foundSingers))
    .catch(err => res.send(err));
});

// router.put('/api/v1/singers', (req, res) => {
  // singers.findByIdAndUpdate(....)
// });

export default router;


















// 'use strict';

// import express from 'express';
// import Singer from '../models/singers.js';

// const router = express.Router();
// const API_URL = '/api/v1/singers';

// router.get(API_URL, (req, res) => {
//   Singer.find().then(singers => res.send(singers));
// });

// router.post(API_URL, express.json(), (req, res) => {

//   Singer
//     .create(req.body)
//     .then(singer => res.send(singer))
//     .catch(err => res.send(err));
// });

// router.get(API_URL + '/:id', (req, res) => {

//   Singer
//     .findById(req.params.id)
//     .then(singer => res.send(singer))
//     .catch(err => res.send(err));

// });

// router.put(API_URL + '/:id', express.json(), (req, res) => {

//   Singer
//     .findByIdAndUpdate(req.params.id, req.body)
//     .then(singer => res.send(singer))
//     .catch(err => res.send(err));
// });

// router.delete(API_URL + '/:id', (req, res) => {
//   Singer
//     .findByIdAndRemove(req.params.id)
//     .then(result => res.send(result))
//     .catch(err => res.send(err));
// });

// export default router;
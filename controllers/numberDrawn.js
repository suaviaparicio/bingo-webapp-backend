const { Subject } = require('rxjs');

const countDown = new Subject();
const numberDrawn = new Subject();

module.exports = {numberDrawn, countDown};
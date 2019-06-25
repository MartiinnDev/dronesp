const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    commentBy: { type: String, required: false },
    title: { type: String, required: true },
    content: { type: String, required: true, default: 'Standart comment' },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', schema);
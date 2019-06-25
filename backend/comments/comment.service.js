const db = require('_helpers/db');
const Comment = db.Comment;

module.exports = {
    getAll,
    getById,
    update,
    create,
    delete: _delete
};

async function getAll() {
    return await Comment.find();
}

async function getById(id) {
    return await Comment.findById(id).select();
}

async function update(id, commentParam) {
    const comment = await Comment.findById(id);

    // copy commentParam properties to comment
    Object.assign(comment, commentParam);

    await comment.save();
}

async function create(commentParam){
    const comment = new Comment(commentParam);
    await comment.save();
}

async function _delete(id) {
    await Comment.findByIdAndRemove(id);
}
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now // Use function reference for default
    },
    parentId: {
        type: mongoose.Types.ObjectId, // Use ObjectId for referencing other threads
        ref: 'Thread', // Reference the same model for parent-child relation
    },
    children: [{ // Changed 'Children' to 'children' to follow naming conventions
        type: mongoose.Types.ObjectId,
        ref: 'Thread'
    }]
});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;

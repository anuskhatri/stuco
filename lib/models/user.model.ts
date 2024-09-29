import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },  // Fixed typo
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    threads: [   // One-to-many relationship: user can have multiple threads
        {
            type: mongoose.Schema.Types.ObjectId, // Each thread is referenced by ObjectId
            ref: 'Thread'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false, 
    },
    communities: [  // One-to-many relationship: user can belong to multiple communities
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);  // Ensures model is only created once

export default User;

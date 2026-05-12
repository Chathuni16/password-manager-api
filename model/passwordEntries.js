import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    websiteName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    category: { type: String, default: 'General' }
});

export default mongoose.model('PasswordEntries', passwordSchema);
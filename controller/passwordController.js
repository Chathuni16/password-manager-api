import Password from "../model/passwordEntries.js";

// 1. Create a new Password Entry (POST)
export const createPassword = async (req, res) => {
    try {
        const newEntry = new Password({
            ...req.body,
            userId: req.user.id
        });
        const savedEntry = await newEntry.save();
       
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. Get all passwords (GET)
export const getAllPasswords = async (req, res) => {
    try {
        const userId = req.user.id;
        const passwords = await Password.find({ userId: userId });
        res.status(200).json(passwords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Get one (GET)
export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const passwordExist = await Password.findById(id);

        if (!passwordExist) {
            return res.status(404).json({ message: "Password not found" });
        }

        if (passwordExist.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to view this entry" });
        }

        res.status(200).json(passwordExist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Update a password (PUT)
export const updatePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const passwordEntry = await Password.findById(id);

        if (!passwordEntry) {
            return res.status(404).json({ message: "Password entry not found" });
        }

        if (passwordEntry.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update" });
        }

        const updatedEntry = await Password.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete a password (DELETE)
export const deletePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const passwordEntry = await Password.findById(id);

        if (!passwordEntry) {
            return res.status(404).json({ message: "Password entry not found" });
        }

        if (passwordEntry.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete" });
        }

        await Password.findByIdAndDelete(id);
        res.status(200).json({ message: "Password entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
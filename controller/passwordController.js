import Password from "../model/passwordEntries.js";

//1. create a new Password Entry (POST)
export const createPassword =async(req,res)=> {
    try{
        const newEntry =new Password(req.body);
        const savedEntry = await newEntry.save();
        res.status(200).json(savedEntry);
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
};

//2. Get all passwords (GET)
export const getAllPasswords =async(req,res)=>{
    try{
        const passwords= await Password.find();
        res.status(200).json(passwords);
    }
    catch(err)
    {
        res.status(500).json({ error: err.message });
    }
};

//3.  Update a password (PUT)
export const updatePassword = async (req, res) => { 
    try {
        const id = req.params.id;
        const updatedEntry = await Password.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedEntry) {
            return res.status(404).json({ message: "Password entry not found" });
        }
        res.status(200).json(updatedEntry);
    } 
    catch (err) {
        res.status(500).json({ error: err.message }); 
    }
};

//4. Delete a password (DELETE)
export const deletePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEntry = await Password.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ message: "Password entry not found" });
        }

        res.status(200).json({ message: "Password entry deleted successfully" });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
       
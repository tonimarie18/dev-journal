import Idea from '../models/ideaModels.js';

// @desc    Create New Idea
// @route   POST /ideas
// @access  Public
export const newIdeas = async (req, res) => {
    const {title, description, status, timeSpent, priorityLevel, collections} = req.body

    if (!title){
        return res.status(400).json({error: "Title required"})
    }

    try {
        // Create a new idea document
        const newIdea = new Idea({
            title,
            description,
            status,
            timeSpent,
            priorityLevel,
            collections,
        });

        // Save to database
        const savedIdea = await newIdea.save();

        // Send response with the saved idea
        res.status(201).json(savedIdea);
    } catch (error) {
        console.error('Error saving idea:', error);
        res.status(500).json({ error: 'Failed to save idea' });
    }
    
}
// @desc    Delete Idea using Idea
// @route   DELETE /ideas/:id
// @access  Public

export const deleteIdeas =  async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the idea by ID
        const deletedIdea = await Idea.findByIdAndDelete(id);

        if (!deletedIdea) {
            return res.status(404).json({ message: 'Idea not found' });
        }

        res.status(200).json({ message: 'Idea deleted successfully', idea: deletedIdea });
    } catch (error) {
        console.error('Error deleting idea:', error.message);
        res.status(500).json({ error: 'Failed to delete idea' });
    }
}

// @desc    Get All Ideas
// @route   GET /ideas
// @access  Public

export const getIdeas =  async (req, res) => {
    try {
        // Fetch all ideas from the database
        const ideas = await Idea.find();
        res.json(ideas); // Send the ideas as a JSON response
    } catch (error) {
        console.error('Error fetching ideas:', error.message);
        res.status(500).json({ error: 'Failed to fetch ideas' });
    }
};

// @desc   Update Ideas w/ id
// @route   Put /ideas/:id
// @access  Public

export const updateIdeas =  async (req, res) => {
    const { id } = req.params;

    try {
        // Validate the request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body cannot be empty' });
        }

        // Update the idea and return the new document
        const updatedIdea = await Idea.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedIdea) {
            return res.status(404).json({ message: 'Idea not found' });
        }

        res.status(200).json(updatedIdea);
    } catch (error) {
        console.error('Error updating idea:', error.message);
        res.status(500).json({ error: 'Failed to update idea', details: error.message });
    }
}
const { prisma } = require("../config/db");



module.exports = {
    getAllConsultations: async (req, res) => {
        try {
            const consultations = await prisma.consultation.findMany();
            res.status(200).json(consultations);
        } catch (err) {
            res.status(500).json({
                message: "Error when attempting to get consultations",
                error: err,
            });
        }
    },

    getConsultations: async (req, res) => {
        const { id } = req.params; // retrieve id from request params
        try {
            console.log("Getting information for the id: " + id);
            // Parse the id to integer before querying
            const userId = parseInt(id);
    
            const consultations = await prisma.consultation.findMany({
                where: {
                    user_id: userId, // use parsed userId in query
                },
            });
            res.status(200).json(consultations); // Send the result as json response
        } catch (err) {
            console.error("Error when attempting to get consultations: ", err);
            res.status(500).json({message: "Error when attempting to get consultations", error: err}); // Send error as json response
        }
    },
    
};

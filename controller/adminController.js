const rates = require("../model/adminModel");



// Add new waste type
exports.addWasteRate = async (req, res) => {
    try {
        const { wastetype, rate } = req.body
        if (!wastetype || !rate) {
            return res.status(400).json("All fields are required")
        }

        const existing = await rates.findOne({ wasteType: wastetype })
        if (existing) return res.status(400).json("Waste type already exists")

        const result = new rates({ wasteType: wastetype, ratePerKg: rate })
        await result.save()
        res.status(200).json({ message: "Rate added successfully", result })
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get all rates
exports.getAllWasteRates = async (req, res) => {
    try {
        const wasteRates = await rates.find()
        res.status(200).json(wasteRates)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateWasteRate = async (req, res) => {
    const { id } = req.params
    const {rate}  = req.body

    console.log(id);
    console.log(rate)


    try {
        const result = await rates.findByIdAndUpdate({ _id: id },
            { ratePerKg: rate },
            { new: true })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}

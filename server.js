const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/calculate-seer-savings', (req, res) => {
    const { coolingHours, electricityCost, acCapacityTons, currentSeer, newSeer } = req.body;
    const acCapacityBTU = acCapacityTons * 12000; // 1 ton = 12,000 BTUs

    const currentEnergyUsage = (acCapacityBTU * coolingHours) / (currentSeer * 1000);
    const newEnergyUsage = (acCapacityBTU * coolingHours) / (newSeer * 1000);

    const currentAnnualCost = currentEnergyUsage * electricityCost;
    const newAnnualCost = newEnergyUsage * electricityCost;

    const annualSavings = currentAnnualCost - newAnnualCost;

    res.json({
        currentAnnualCost: currentAnnualCost.toFixed(2),
        newAnnualCost: newAnnualCost.toFixed(2),
        annualSavings: annualSavings.toFixed(2)
    });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`SEER Energy Saving Calculator API is running on port ${PORT}`);
});

const { Dish } = require('../models');

// Create new dish
exports.createDish = async (req, res) => {
    /*
    if (!req.session.restaurant_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const restaurant_Id = req.params.restaurant_Id;

    try {
        const { name, description, price, category } = req.body;
        const dish = await Dish.create({
            name,
            description,
            price,
            category,
            restaurant_Id: restaurant_Id
        });
        res.status(201).json(dish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Get one dish
exports.getOneDish = async (req, res) => {
    const dish_Id = req.params.dish_Id;
    const restaurant_Id = req.params.restaurant_Id;
    try {
        const dish = await Dish.findOne({ where: { id: dish_Id, restaurant_Id: restaurant_Id } });
        if (dish) {
            res.status(200).json(dish);
        } else {
            res.status(404).json({error: "Dish not found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// Update dish
exports.updateDish = async (req, res) => {
    /*
    if (!req.session.restaurant_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const dish_Id = req.params.dish_Id;
    const restaurant_Id = req.params.restaurant_Id;

    try {
        const [updated] = await Dish.update(req.body, {
            where: { id: dish_Id, restaurant_Id: restaurant_Id }
        });
        if (updated) {
            const updatedDish = await Dish.findOne({ where: { id: dish_Id, restaurant_Id: restaurant_Id } });
            res.status(200).json(updatedDish);
        } else {
            res.status(404).json({error: "Dish not found"});
        }
    } catch (error) {
        console.error("Error updating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Delete dish
exports.deleteDish = async (req, res) => {
    /*
    if (!req.session.restaurant_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const dish_Id = req.params.dish_Id;
    const restaurant_Id = req.params.restaurant_Id;
    try {
        const deleted = await Dish.destroy({
            where: { id: dish_Id, restaurant_Id: restaurant_Id }
        });
        if (deleted) {
            res.status(200).json({message: "Dish deleted"});
        } else {
            res.status(404).json({error: "Dish not found"});
        }
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({error: error.message});
    }
};
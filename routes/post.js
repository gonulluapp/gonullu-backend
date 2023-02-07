const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.post("/", async (req, res) => {
    const user = req.user;
    const { title, description,city, town, address, telephoneNumber, email, whatsappLink, supplyItems } = req.body;
    try {
        if(telephoneNumber == null){
            telephoneNumber = "-";
        }
        if(email == null){
            email = "-";
        }
        if(whatsappLink == null){
            whatsappLink = "-";
        }

        // storing our user data into database
        const post = await Post.create({
            title,
            description,
            user: user._id,
            city,
            town,
            address,
            telephoneNumber,
            email,
            whatsappLink,
            supplyItems,
        });

        return res.status(201).send(post);
        

    } catch (error) {
        console.log(error.getMessage)
        res.status(500).send();
    }
}
)

router.get("/", async (req, res) => {
    const { city, town, supplyItemType } = req.body;
    try {
        const availablePosts = await Post.aggregate([
        {   
            $match: {
                city: city,
                town: town,
                'supplyItems.type': supplyItemType,
            },
        },
        {
            $sort: {
                date: -1,
            }
        }
        ])
        
    } catch (error) {
        console.log(error.getMessage)
        res.status(500).send();
    }

})


module.exports = router;
const express = require("express");
const { default: Post } = require("../models/Post");
const router = express.Router();

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
    const { page, limit } = req.query;
    try {
        
        const options = {select: '-isDeleted', page: page, limit: limit, sort: {urgency: -1 ,date: -1}};

        const paginatedPosts = await Post.paginate(
            {city: city, town: town, 'supplyItems.type': supplyItemType},
            options
        )
        
        return res.status(200).send(paginatedPosts);
        // const availablePosts = await Post.aggregate([
        // {   
        //     $match: {
        //         city: city,
        //         town: town,
        //         'supplyItems.type': supplyItemType,
        //     },
        // },
        // {
        //     $addFields: {
        //         priority: {"$cond": { if: { $eq: [ '$supplyItems.urgency', 'ACIL' ] }, then: 2, else: 1 }}
        //     }
        // }
        // ,
        // {
        //     $sort: {
        //         priority: -1,
        //         date: -1,
        //     }
        // }
        // ])
        
    } catch (error) {
        console.log(error.getMessage)
        res.status(500).send();
    }

})


module.exports = router;
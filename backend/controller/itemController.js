const Items = require("../prototype/itemPrototype");       // importing items
const handlingError = require("../utilities/handlingError");
const asyncError = require("../middleware/asyncError");
const Features = require("../utilities/Fetures");

// controlling items -- books

//create items   --admin route (accessible to admin only)

exports.createItem = asyncError(async (req,res,next) =>{             

    const item = await Items.create(req.body);
    res.status(201).json({
        success:true, 
        item
    });
});

// To get all items 

exports.getAllItems = asyncError(async(req,res)=>{
    // Making an instance of class feature.
    const itemCount = await Items.countDocuments();  // keeping item count

    const single = 6;            // display only 6 items in every single page

    const Feature = new Features(Items.find(),req.query).search().filter()
    .pagination(single);    

    const items = await Feature.query;    
    
    res.status(200).json({
        success:true,
        items,
        itemCount               // doubtful with getItemDetails _________REMOVE ME
    })
});

// to get a particular item details

exports.getItemDetails = asyncError(async (req,res,next) =>{

    const item = await Items.findById(req.params.id);

    if(!item){
        return next(new handlingError("item not found", 404));
    }

    res.status(200).json({
        success:true,
        item  
    })
});

// to update items --admin

exports.updateItems = asyncError( async (req,res,next)=>{
    
    let item = await Items.findById(req.params.id);

    if(!item){
        return next(new handlingError("item not found", 404));
    }

    item = await Items.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        item
    })
});

// to delete an item -- admin

exports.deleteItems = asyncError(async (req,res,next) => {
    
    const item = await Items.findById(req.params.id);
    
 if(!item){
        return next(new handlingError("item not found", 404));
    }

    await item.remove();
    res.status(200).json({
        success:true,
        message:"Item deleted successfully"
    })
});


const express = require("express");
const { getAllItems,createItem, updateItems, deleteItems, getItemDetails  } = require("../controller/itemController"); 
const { isAuthenticatedUser } = require("../middleware/authorization");
//imported express, getAllItems and createItem from itemController
  
const router = express.Router();                  // calling Router method

  
router.route("/items").get(getAllItems);          // to get all books on /items url
router.route("/item/new").post(isAuthenticatedUser,createItem);      // to post a book on /items/new url

router.route("")

// to update and delete items , we select or find them by id and then update or delete
// them as we want. Also to get a particular item's details.

router.route("/item/:id").
put(isAuthenticatedUser,updateItems).
delete(isAuthenticatedUser,deleteItems).
get(getItemDetails);
 

module.exports = router;                            // exporting router
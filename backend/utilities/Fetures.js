class Features {                                    // Making a class of features 

    constructor(query, queryStr) {            // Using query and query string of the url
      this.query = query;
      this.queryStr = queryStr;
    }

  // search feature in the backend

  search(){ 
  //to search from the eneterd query matching it to the database. Only the 
  //alphabets or words matching the name of the item will be given out.                               

     const keyword = this.queryStr.keyword ? {

          name:{
            $regex : this.queryStr.keyword,
            $options: 'i'
          }
     } : {} ;

     this.query = this.query.find({...keyword});

     return this;
  }

  // Adding filter feature

  filter(){

    const dupl = {...this.queryStr};     // Making duplicate of queryStr object

    //filtering for category 
    const removed = ["keyword", "page", 'limit'];

    removed.forEach((i) => { delete dupl[i];});

    // filtering for ratings, price

    let queryStr = JSON.stringify(dupl);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Pagination to not display all items at once , on a single page

  pagination(single) {
    
    const resultatm = Number(this.queryStr.page) || 1;
    // to skip this number of items and keeping them on next page
    const cont = single * (resultatm - 1);

    this.query = this.query.limit(single).skip(cont);

    return this;
  }
}


module.exports = Features;
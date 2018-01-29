var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');

var auth = require('./auth');


router.get('/cartitems/:id', function(req, res, next) {
    console.log(req.params.id);
    User.findOne({_id: req.params.id }).then(function(result) {
        // console.log("hai",result);
        if (!result) { return res.sendStatus(401); }
        return res.json({ result });
    }).catch(next);
});
router.delete('/items/:id',auth.required, function (req, res, next) {
//  var selectedIndex;
console.log(req.params,req.payload.id);
  User.find({_id:req.payload.id},function(err,user){
       if (!user) { return res.sendStatus(401); }
              if(user[0].items.length>0){
               for(i=0;i<user[0].items.length;i++){
                  if(user[0].items[i].orderId==req.params.id){
                    user[0].items.splice(i,1);
                    break;

            }
         }
         user[0].save();
          return res.json({ "Success": true, "msg": "Item deleted successfully" });
      }
   
   
  })
});

router.post('/additems', function(req, res, next) {
    console.log(req.body)
    User.findOne({_id:req.body.id},function(err,data){
        if(!data){
            res.json({ 
                "Success": false, 
                "msg": " No User found." 
              }); 
        }
        else{
            let orderId= "OD"+ Math.floor((Math.random() * 10000000000) + 1);
            var item = {
            orderId:orderId,
            name:req.body.name,
            qty:req.body.qty, 
            href:req.body.href,
            weight:req.body.weight,
            cost:req.body.cost
        }
        data.items.push(item);
        //data.save();
        data.save(function(err,data){
                if(err)
                throw err;
                res.json({ 
                    "Success": true, 
                    "msg": " Item Successfully added." 
                  }); 
            })

        // console.log(data);
        }
    })

 });
 router.post('/buynow', function(req, res, next) {
    console.log(req.body)
    User.findOne({_id:req.body.id},function(err,data){
        if(!data){
            res.json({ 
                "Success": false, 
                "msg": " No User found." 
              }); 
        }
        else{
            let orderId= "OD"+ Math.floor((Math.random() * 10000000000) + 1);
            var order = {
            orderId:orderId,
            name:req.body.name,
            qty:req.body.qty, 
            href:req.body.href,
            weight:req.body.weight,
            cost:req.body.cost,
            date:Date()
        }
        data.orders.push(order);
        //data.save();
        data.save(function(err,data){
                if(err)
                throw err;
                res.json({ 
                    "Success": true, 
                    "msg": " Item  Ordered Successfully ." 
                  }); 
            })

        // console.log(data);
        }
    })

 });

//  get Orders
router.get('/getorders',auth.required, function(req, res, next) {

    User.findById(req.payload.id, function(err, orders) {
      if (err) {
        return res.status(500).json({ 
          "Success": false, 
          "msg": "Fail to connection" 
        });
      }
      if (!orders) {
        return res.status(401).json({ 
          "Success": false, 
          "msg": "Not get any data! plz Login " 
        });
      } else {
          var orders = orders.orders;
          
          res.status(200).json({
            orders: orders
          });
      }
  })
  });
  

module.exports = router;
Routing Logic 
Application Logic/Business Logic
Data logic / DB level 

Cosmetic Logic / View

..
    src 
        bussiness logic
        data logic
    public 
        static content 
        upload 
    routes 
        routing logic
    config
        configuration 
    view
        views
    .env
    app.js


API Test 
    -> Postman, insomina, Thunder client, swagger


Route =>  Middleware => Action Trigger


## Middleware 
    -> (request, response, next)


    protected => 
        // logged in, superamdin type 
            // loggedin 
                next()
                // role => superadmin
        // /user/payment         

        
### Requirements 
    - Ecommerce web 
        - Multi vendor 

        - Brand CRUD 
        - Banner CRUD 
        - Category CRUD 
        - User User 
            - admin, seller, customer 
                - Admin All permission 
                - Seller => Product Create, Order View 
                - Customer => Product Purchase, History
        - Order Module
        - Chat Module 
        - Offers 
        - Payment (Khalti)

        
        - Auth and Authorization 

### Body - Parser 
    - application/json
    - multipart/form-data 
        - multer ( File upload)
    - application/x-www-urlencoded


### Schema Definition 
    - structure of a Data
        - Ecommerce  (entity)
            * User 
                - name  
                    required,     
                - phone
                    optional
                - email
                - address
                    - shipping
                    - billing
                - password
                - image
                - role 
                    seller, admin, customer
                - status 

                - otp/activation_token
                - expiry_time
                - forget_pwd_token

            * Product
                - seller 
            * Category
            * Banner 
            * Order
                - customer 
                - seller
            * Brand
            * Transaction 
                - customer
                - receiver
            * Offer 
            * Coupons 
                - user
            * Reviews 
                - reviewer
            * Inventory
            * Account 


### Register and user activation 
    -> user register => email/otp/actiation link ---> Set password ---> user allows login 


## Data Storage 
    - Database 
        - RDBMS
        - Non-DBMS


orders
----------------------------------------------------------------------------------------------
id  user            product             price           qty         total       enterd_by
----------------------------------------------------------------------------------------------
1   Ram             iPhone 12           120000           1           120000      Sandesh
----------------------------------------------------------------------------------------------
2   Ram             iPhone 12           120000           1           120000      Sandesh
----------------------------------------------------------------------------------------------
3   Ram             iPhone 12           120000           1           115000      Sandesh


users               products                    orders 
--------------      ------------------------    --------------------------------------------- 
id      name        id  name        price       id  user_id     product_id  qty  dis  total e
--------------      ------------------------    --------------------------------------------- 
1       Ram B       1   iPhone 12   120000      1  1            1           1   -   12000   2
--------------      ------------------------    --------------------------------------------- 
2       Ram P                                   1  1            1           1   -   12000   2


User class => Model
    id, name 
let userObje = 


### SQL and No-SQL
    - Not only SQL 

    

### DB Find Operation 
    -> To fetch data 

    .find(filter, projection);
    .findOne(filter, projection);

    filter => Object / json
    proejction => object/json


    -> 
    $eq, $ne, $in, $nin, $gt, $lt, $gte, $lte, $and, $or

    {
        key: value,
        key1: value1
    }
    .... WHERE  key = "value" and key1 = "value1"


    {
        key: {$operation: value},
        key1: {$operation: value1}
    }

    ... WHERE (key $operation "Value") and (key1 $operation "value1")

    {
        $operation: {key: value},
        $operation: {key1: value1}
    }

    ... WHERE (key $operation "value") AND (key1 $operation  "value1")

## db.collection.updateOne(filter, updateBody,options)
    - updateBody => json 
    => {
            $set:{
                
            }
        }
    options => upsert: boolean 1, 0

## db.collection.deleteOne(filter)
    .deleteMany(filter)


sql server 
    - mysql 
        => phpmyadmin
        => dbeaver
        => mysql workbench
        => sqlyog


users 
    -> React register form 

ORM / ODM 
    - Object Relational Model 
    - Object Document Model/Mapping

    users => table name 
        - User as a model (Class based)
            - data, attributes 
                -> columns of a table 
                -> Rows a dataset -> an instance of that model 

Node 
    -> sql server => 
                    - sequelize (js, ts), typeorm
                    - postgres
    -> Mongodb  => Core drvier
                    - default Driver
                => ORM Provider 
                    - Mongoose


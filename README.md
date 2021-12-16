# DastgyrTask
#### This repo consists of backend and frontend directories.
Front end is developed using react js and backend is created using node js express.

### 1. Backend.
#### End points
To run backend goto the backend directory and run npm i then npm start.
Backend have following functionalities:
- Inventory in/out
    http://localhost:4000/inventory/add this api can add in/out inventory. We just have to pass the type in body this endpoint will know where to put the data.
    Method type: POST
    Sample data of body : {
    "sku": "abc123",
    "quantity": "30",
    "price": "150",
    "type": "sales"
}
- Get Inventory Snapshot
    http://localhost:4000/inventory/get this api can get all the sku and will tell you how many quantity each SKU have.
    Method type: GET.
#### Database
MySql database is used in this task. I created two tables
- Products (id, title, description, SKU, status)
- Inventories (id, SKU, type, cause, price, quantity, status)

I used sequelize ORM to fetch and add data in DB.

### 2. Frontend
To run frontend goto the frontend directory and run npm i then npm start.


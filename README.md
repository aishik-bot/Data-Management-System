# Data-Management-System

node version: v16.14.0
react version: 18.2.0

## Backend

Data is fetched from the given endpoint and stored in Local MongoDb. It is checked that if the data is already present and is updated, then that specific document will not be overwritten. Otherwise data is added and overwritten every hour.

Data is fetched every 1 hour and stored in MongoDb. For this, apiToDb() function is put inside a setInterval of 1 hour.

![Data intervals](./Data%20through%20intervals.png)

There is also functionality of deletion of a document.

## Frontend

Redux is used to share data fetched from backend endpoint to all the components. createAsyncThunk() is used for asynchronous fetching of data.

This data is visualised in form of an editable table where inline editing of data is possible. For user's convenience the edited row is changed to distinct purple. Also all the data are divided into pages each consisting 50 records.

![Edited data](./Edited%20data.png)



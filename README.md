# [AutoMate](https://autoproject2.herokuapp.com/)
![alt text](https://img.shields.io/badge/uses-Node-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-MySql-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-Express-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-Axios-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-bcrypt-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-Json_Web_Token-brightgreen.svg) 

![alt text](https://img.shields.io/badge/uses-Handlebars-blue.svg)  ![alt text](https://img.shields.io/badge/uses-Bootstrap-blue.svg)  ![alt text](https://img.shields.io/badge/uses-jQuery-blue.svg) 

### Problem

Often times people do not keep accurate records on their car’s maintenance. When was the last time you changed your air filter or had your brakes replaced? Unscrupulous auto repair shops can take advantage of this and perform unnecessary repairs.

Even worse people do not know the specifications of their car or even the simple replacement parts for their vehicle. What is your tire size? Are the front different from the back? On some cars they are. What is the recommended octane level recommended by the manufacturer? What size windshield wipers do you need?

![Image of Yaktocat](https://github.com/krtcotmo2/AutoMate/blob/master/test/fuel.png)
![Image of Yaktocat](https://github.com/krtcotmo2/AutoMate/blob/master/test/serrvice.png)

 
### How we built it (this was a team effort)
The backend server uses Node with Express. Express handles our API data retrieval via Axios requests. We use Bcrypt to hash out user passwords for a more secure storage. Once the password is verified, we use Json Web Token as part of the requests to ensure the user is logged in when accessing all internal pages.

The frontend utilizes Bootstrap as its primary level of Css styling. It has been designed for a desktop experience although the intended viewport is a mobile phone. (What else are you going to do while pumping the gas?) The data coming back from our API calls are populated using Handle Bars. Individual pieces are built including single rows for lists of data.

### Solution
By storing data about your car and its history on your mobile device,  you have the knowledge at your finger tips. You can look up specs from your car, enter in service work and search those records for specific instances. Store gas mileage and fuel histories. Get reminders when you might need upcoming or past due services.


### Future enhancements
API that auto downloads specs for the vehicle. API download that gets the maintenance schedule for your make and model. Insurance assistance in the event there is an accident. Linking family vehicles together though the same app.

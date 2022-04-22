# **Technology Stack**
<br/>
<img src="./src/images/tech.png" />
<br />
<br />

## **Back-End**
Back-End Repo:
https://github.com/Zaldana/backend-crate-digger


**MongoDB + Node.js + Express**

The site has three collections that stores the users information, the main vinyl collection, and a wish-list collection. The data models for the vinyl and wish-list collections are comprised of 12 different fields, 11 are used to store the incoming information from the Discogs api request from the front end and the final links the album to the user. The user is authenticated with JWT-Passport an authenticating middleware that extracts a JSON web token which is created in the sign-in response.  Validation for the user is handled through validation middleware that uses the validator library.

Milkman will emulate an eCommerce site used to purchase milk online.

The products will be pulled from the Kroger public API which has over 1800 milk products.

The store will be divided in four categories:
Natural & Organic
Non-Dairy
Flavored
Barrista Selections (for coffee)

The Backend will be created using Express and have a user model.

The Frontend will be created with React and the Redux to manage the user state, the shopping cart state, and the products database state pulled from kroger API.

MUI will be used for the site styles.
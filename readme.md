# Seal Project 2

- **Izzy Zinxhirija**
- **Izzy Properties Inc**
- **This is a full-stack application that will be used to manage real estate properties and track property details such as address, sales price, beds, baths, square footage, rent estimate, property manager, status. Users will be able to create new properties, edit existing, view a list of current properties, delete properties. This application will be using Express, MongoDB, CRUD operations, Create, Read, Update and Delete.**

- **Github URL: https://github.com/Izzy-2023/seir-seal-unit2-week4-project2**
- **Deployed Website: https://project2-app.onrender.com**
- **Trello Board: https://trello.com/b/dHi7FDjl/project2-board**

## List of Dependencies

##### Node Dependencies (package.json)

- Express
- Mongoose
- EJS
- dotenv
- Morgan
- method-override

##### Frontend (if used, ex. jquery, alpine, bootstrap, htmx, etc.)

- CSS
- Bootstrap
- Milligram
- jQuery

## Route Map

Below should be a table listing the different routes in your app and their purposes.

| Route Name | Endpoint | Method | Description |
|------------|----------|--------|-------------|
| Index | / | GET | Renders all properties on a page|
| New | /properties/new | GET | New form page to add new property|
| Delete | /properties/:id | DELETE | Deletes selected property|
| Update | /properties/:id | PUT | Updates selected property details|
| Create | /properties | POST | Adds the new property to the database|
| Edit | /properties/edit/:id | GET | Edit existing property|
| Seed | /seed | GET | Seeds the database with test data |
| Show | /properties/:id | GET | Shows details of the selected property|

## Design Mockups (Desktop + Mobile)


##### Desktop & Mobile Designs

![Desktop Design Mockup](https://i.imgur.com/4v1qgFz.png)

## ERD (Entity Relationship Diagram)

This should be a diagram showing your models and any relationships between them.

![Entity Relationship Diagram](https://i.imgur.com/o1bWUO5.png)

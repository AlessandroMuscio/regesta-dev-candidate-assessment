# Regesta Dev Candidate Assessment

## Architecture

For the project I used [_Next.js_](https://nextjs.org/) framework version _13.5.3_ mostly because I'm most familiar in web-development and I think _Next.js_ is an awesome tool. This means that the project is entirely done with [_React_](https://react.dev/) and run in local on a [_Node.js_](https://nodejs.org/en) version _18.18.0 LTS_ server.

For the **DB** I went with [_MongoDB_](https://www.mongodb.com/), even though I'm more familiar with **relational databases** and using _SQL_, I definitely prefer **document databases** like _mongo_ since I first used it.

## Technical Choices

For handling this project I made three collections in _MongoDB_:

- Products
- Suppliers
- Discounts

### Suppliers

Let's start with the most basic, this collection had all the necessary information for every _supplier_. Every documents has the fields:

- __id_, the unique id of the document
- _name_, the name of the supplier
- _minDaysShipping_, the minimum amount of days it needs to complete an order

### Products

The products collection was also straightforward, every document in this collection holds the information for a _product_ described by these fields:

- __id_, the unique id of the document
- _name_, the name of the product
- _quantity_, how many pieces are available
- _pricePerUnit_, how much does a single piece costs
- _supplier_, a reference to the supplier
- _discounts_, an array of references to the various discounts

### Discounts

The hardest collection to tackle was how to describe a _discount_, the fields are as follow:

- __id_, the unique id of the document
- _type_, a string to describe the type of the discounts:
  1. '_OrderTotal_'
  2. '_Quantity_'
  3. '_Seasonal_'
- _value_, the percentage to  discount
- _conditions_, an object that holds the discount conditions. Could be made in 3 different ways:
  1. with a '_minOrderTotal_' property with the money amount to exceed in order to apply the discount
  2. with a '_minQuantity_' property with the amount of pieces to exceed in order to apply the discount
  3. with a '_startDate_' and '_endDate_' with the two dates in between which the order date should be to apply the discount

### The Rest

**DB** stuff aside for the website I made a standard _HTML_ form with a quantity _input field_ and a product name _select field_ and of course a _submit button_. The button will redirect you to another page where you could visualize all the _suppliers_ that had the specified product in that quantity sorted from the cheapest, that was also highlighted, to the more expensive. At the end of the list I also added a '_Go Back_' button to return to the form page.

## Improvements

There are definitely some improvements that can be done here.

First of all, a _select field_ is not practical if the number of products increases, a _fuzzy search_ would be the best option but I never tried to make one and decided to stick with things I know best.

Secondly, right now my **DB** is hosted on a [_MongoDB Atlas_](https://www.mongodb.com/atlas/database) free server, an amazing tool that lets you host your **DB** for free, but of course being free it lacks speed so the query are a bit slow, changing to a paid plan or hosting a _MongoDB_ instance would greatly improve performance.

### Usage

If you want to try this website for yourself, it's just a matter of installing [_Node.js_](https://nodejs.org/en) and then going in the root folder of the project and running these simple commands:

```bash
# Install all dependencies
npm install

# Start the build of the website
npm start
```

Before doing this, contact me to get the '_URI_' to the **DB** that I saved in a `.env` file of course not saved in _version control_.

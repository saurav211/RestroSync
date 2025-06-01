// Script to add sample menu items to the database
const mongoose = require('mongoose');
const MenuItem = require('./menuItem.schema');

const items = [
  // Pizza
  { name: 'Margherita', price: 200, category: 'Pizza', timeToPrepare: 10, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Pepperoni', price: 250, category: 'Pizza', timeToPrepare: 12, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Veggie Supreme', price: 220, category: 'Pizza', timeToPrepare: 11, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  // Burger
  { name: 'Classic Burger', price: 120, category: 'Burger', timeToPrepare: 8, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Cheese Burger', price: 140, category: 'Burger', timeToPrepare: 9, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Double Patty Burger', price: 180, category: 'Burger', timeToPrepare: 10, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  // Drink
  { name: 'Coca-Cola', price: 40, category: 'Drink', timeToPrepare: 1, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Lemonade', price: 50, category: 'Drink', timeToPrepare: 2, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Iced Tea', price: 60, category: 'Drink', timeToPrepare: 2, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  // French Fries
  { name: 'Classic Fries', price: 80, category: 'French fries', timeToPrepare: 5, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Cheese Fries', price: 100, category: 'French fries', timeToPrepare: 6, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  // Veggies
  { name: 'Grilled Veggies', price: 90, category: 'Veggies', timeToPrepare: 7, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' },
  { name: 'Veggie Salad', price: 110, category: 'Veggies', timeToPrepare: 5, image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVQYV2NkYGD4z0AEYBxVSFQAAAwAAf8A/1wAAAAASUVORK5CYII=' }
];

async function addMenuItems() {
  await mongoose.connect('mongodb+srv://sauravsingh:bjlKZHddLtihWose@cluster0.mxdvgry.mongodb.net/restrosync?retryWrites=true&w=majority&appName=Cluster0');
  await MenuItem.insertMany(items);
  console.log('Sample menu items added!');
  await mongoose.disconnect();
}

addMenuItems();

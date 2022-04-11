const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'So Much Love' },
    { name: 'Lots of Love' },
    { name: 'Love' }
   
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: '1,000 smackers',
      description:
        'OMG Big Baller in the house!',
      category: categories[0]._id,
      price: 1000.00
    },
    {
      name: '500',
      description:
        'Wow just you are amazing.',
      category: categories[0]._id,
      price: 500.00
    },
    {
      name: 'One Hunend Big Ones',
      category: categories[1]._id,
      description: 'You love us almost as much as we love us.',
      price: 100.00
    },
    {
      name: 'Fiddy',
      category: categories[1]._id,
      description:
        'This is a great idea!',
      price: 50.00
    },
 
    {
      name: '25 Smackeroonies',
      category: categories[2]._id,
      description:
        'A noble Donation.',
      price: 25.00,
    },
    {
      name: '1,2,3,4,..5!',
      category: categories[2]._id,
      description:
        'A just donation.',
      image: 'tablet.jpg',
      price: 5.00,
    }
   
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Sloppy',
    lastName: 'Joe',
    email: 'asdf@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Ello',
    lastName: 'Poppet',
    email: 'fdsa@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});

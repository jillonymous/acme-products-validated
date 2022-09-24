const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, DECIMAL, INTEGER } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_db');

const Product = conn.define('product', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      isPositive: (value)=> {
        if(value <= 0){
          throw 'price must be positive'
        }
      }
    }
  },
  numberInStock: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

const seed = ()=> {
  return Promise.all([
    Product.create({ name: 'foo', price: 2.99, numberInStock: 7}),
    Product.create({ name: 'bar', price: 2.99, numberInStock: 7}),
  ]);
};

module.exports = {
  conn,
  seed,
  Product
};

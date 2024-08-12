const {Client} = require('pg');
const client = new Client({
  host: 'localhost',
  database: 'Subhajeet Mohanty',
  user: 'postgres',
  password: '12345',
  port: 5432,
})

client.connect();

const getProducts = (req, res) => {
  client.query('SELECT * FROM products', (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

const getProductById = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('SELECT * FROM products WHERE product_id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).json(results.rows)
  })
}

const createProduct = (req, res) => {
  const {id, name, catid, unit, price } = req.body

  client.query('INSERT INTO products (product_id, product_name, category_id, unit, price) VALUES($1, $2, $3, $4, $5)', [id,name, catid,unit,price], (err, results) => {
    if (err) {
      throw err
    }
    res.status(201).send(`Product added with ID: ${id}`)
  })
}

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id)
  const { catid } = req.body

  client.query(
    'UPDATE products SET category_id = $1 WHERE product_id = $2',
    [catid, id],
    (err, results) => {
      if (err) {
        throw err
      }
      res.status(200).send(`Product modified with ID: ${id}`)
    }
  )
}

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('DELETE FROM products WHERE product_id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    res.status(200).send(`Product deleted with ID: ${id}`)
  })
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
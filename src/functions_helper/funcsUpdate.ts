const Product = require('./handlers/product'); // importing the products

function updateProduct(productId, updatedName) {
    return new Promise((resolve, reject) => {
        // Find the product by ID
        Product.findById(productId, (err, product) => {
            if (err) {
                // If there's an error, reject the promise
                reject(err);
            } else {
                if (!product) {
                    // If the product doesn't exist, reject with an error message
                    reject(new Error('Product not found'));
                } else {
                    // Update the product's name
                    product.name = updatedName;
                    // Save the updated product
                    product.save((err, updatedProduct) => {
                        if (err) {
                            // If there's an error saving the updated product, reject the promise
                            reject(err);
                        } else {
                            // If the product is updated successfully, resolve the promise
                            resolve(updatedProduct);
                        }
                    });
                }
            }
        });
    });
}

module.exports = updateProduct;

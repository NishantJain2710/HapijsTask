const { Model } = require('objection');

const Store = require('./store');

class Product extends Model {
    static get tableName() {
        return 'products'
    }

    static get nameColumn() {
        return 'name';
    }

    static get quantityColumn() {
        return 'quantity';
    }

    static get priceColumn() {
        return 'price';
    }

    static get discountColumn() {
        return 'discount';
    }

    static get storeId() {
        return 'storeId';
    }

    $beforeInsert() {
        this.createdAt = new Date();
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get jsonSchema() {
        return {
            type : 'object',
            required:['name', 'quantity', 'price'],
            properties : {
                id : { type:'integer' },
                name : { type : 'string', minLength : 1, maxLength : 255},
                quantity : { type : 'integer'},
                price: { type : 'float' },
                discount : { type : 'float' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
                storeId: { type: 'integer' }
            }
        }
    }

    static relationMappings = {
        store: {
            relation: Model.BelongsToOneRelation,
            modelClass: Store,
            join: {
                from: 'Product.storeId',
                to: 'store.id'
            }
        }
    }
}

module.exports = Product;
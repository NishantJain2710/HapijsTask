const { Model } = require('objection');

const Customer = require('./customer');
const Product = require('./products');

class Invoice extends Model {
    static get tableName() {
        return 'invoice'
    }

    static get referenceIdColumn() {
        return 'referenceId';
    }

    static get totalBillColumn() {
        return 'totalBill';
    }

    static get amountPaidColumn() {
        return 'amountPaid';
    }

    static get modeColumn() {
        return 'mode';
    }

    static get dateColumn() {
        return 'date';
    }

    static get customerIdColumn() {
        return 'customerId';
    }

    static get productIdColumn() {
        return 'productId';
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
            required:['referenceId', 'totalBill', 'amountPaid', 'mode', 'date'],
            properties : {
                id : { type:'integer' },
                referenceId : { type : 'string', minLength : 1, maxLength : 255},
                totalBill : { type : 'number' },
                amountPaid: {type:'number' },
                mode : { type: 'string' },
                date : { type : 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
                customerId: { type:'integer' },
                ProductId: { type:'integer' }
            }
        }
    }

    static relationMappings = {
        customer : {
            relation: Model.BelongsToOneRelation,
            modelClass: Customer,
            join: {
                from: 'invoice.customerId',
                to: 'admins.id'
            }
        },
        product : {
            relation: Model.BelongsToOneRelation,
            modelClass: Product,
            join: {
                from: 'invoice.productId',
                to: 'admins.id'
            }
        }
    }
}

module.exports = Invoice;
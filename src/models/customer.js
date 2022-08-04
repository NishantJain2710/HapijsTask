const { Model } = require('objection');

const Invoice = require('./invoice');

class Customer extends Model {
    static get tableName() {
        return 'customers'
    }

    static get firstNameColumn() {
        return 'firstName';
    }


    static get lastNameColumn() {
        return 'lastName';
    }


    static get emailColumn() {
        return 'email';
    }


    static get passwordColumn() {
        return 'password';
    }


    static get fullnameColumn() {
        return 'fullname';
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
            required : ['firstName', 'lastName', 'email', 'password'],
            properties : {
                id : { type:'integer' },
                firstName : { type : 'string', minLength : 1, maxLength : 126},
                lastName : { type : 'string', minLength : 1, maxLength : 126},
                fullname: {type:'string', default: "" },
                password : { type: 'string' },
                email : { type : 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        }
    }

    static relationMappings = {
        invoice: {
            relation: Model.HasOneRelation,
            modelClass: Invoice,
            join: {
                from: 'customers.id',
                to: 'invoice.customerId'
            }
        }
    }
}

module.exports = Customer;
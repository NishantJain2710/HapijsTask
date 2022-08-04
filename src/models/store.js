const { Model } = require('objection');

const Admin = require('./admins');

class Store extends Model {
    static get tableName() {
        return 'store'
    }

    static get nameColumn() {
        return 'name';
    }

    static get addressColumn() {
        return 'address';
    }

    static get cityColumn() {
        return 'city';
    }

    static get pincodeColumn() {
        return 'pincode';
    }

    static get stateColumn() {
        return 'state';
    }

    static get countaryColumn() {
        return 'countary';
    }

    static get managerIdColumn() {
        return 'managerId';
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
            required:['name'],
            properties : {
                id : { type:'integer' },
                name : { type : 'string', minLength : 1, maxLength : 126},
                address : { type : 'string', minLength : 1, maxLength : 255},
                city: {type:'string', default: "" },
                pincode : { type: 'string' },
                state : { type : 'string' },
                countary : { type : 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        }
    }

    static relationMappings = {
        manager: {
            relation: Model.BelongsToOneRelation,
            modelClass: Admin,
            join: {
                from: 'store.managerId',
                to: 'admins.id'
            }
        }
    }
}

module.exports = Store;
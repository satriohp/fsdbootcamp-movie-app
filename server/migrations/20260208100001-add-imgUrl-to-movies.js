'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Movies', 'imgUrl', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Movies', 'imgUrl');
    }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      INSERT INTO genre (id, name)
      VALUES 
        (1, 'Animation'), (2, 'Adventure'), (3, 'Action'), (4, 'Crime'), 
        (5, 'Anime'), (6, 'Sports'), (7, 'Comedy'), (8, 'Drama'), 
        (9, 'Sci-Fi'), (10, 'Fantasy'), (11, 'Musical'), (12, 'Thriller'), (13, 'Romance')
      ON CONFLICT (id) DO NOTHING;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('genre', null, {});
  }
};
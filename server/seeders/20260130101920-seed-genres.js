'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genres = [
      { id: 1, name: 'Animation', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Adventure', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Action', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Crime', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Anime', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Sports', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Comedy', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Drama', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Fantasy', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Musical', createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Thriller', createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Romance', createdAt: new Date(), updatedAt: new Date() }
    ];

    return queryInterface.bulkInsert('Genres', genres, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
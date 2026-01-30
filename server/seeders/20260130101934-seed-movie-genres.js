'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const movieGenres = [
      { movie_id: 1, genre_id: 1, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 1, genre_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 2, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 2, genre_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 3, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 3, genre_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 4, genre_id: 5, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 4, genre_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 5, genre_id: 7, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 5, genre_id: 8, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 6, genre_id: 1, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 6, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 7, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 7, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 8, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 8, genre_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 9, genre_id: 5, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 9, genre_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 10, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 10, genre_id: 10, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 11, genre_id: 1, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 11, genre_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 12, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 12, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 13, genre_id: 10, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 13, genre_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 14, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 14, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 15, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 15, genre_id: 10, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 16, genre_id: 3, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 16, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 17, genre_id: 1, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 17, genre_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 18, genre_id: 12, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 18, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 19, genre_id: 7, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 19, genre_id: 9, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 20, genre_id: 4, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 20, genre_id: 8, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 21, genre_id: 7, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 21, genre_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { movie_id: 22, genre_id: 8, createdAt: new Date(), updatedAt: new Date() }, 
      { movie_id: 22, genre_id: 13, createdAt: new Date(), updatedAt: new Date() }
    ];

    return queryInterface.bulkInsert('movie_genres', movieGenres, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movie_genres', null, {});
  }
};
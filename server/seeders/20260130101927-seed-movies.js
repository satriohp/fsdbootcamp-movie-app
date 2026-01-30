'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const movies = [
      { id: 1, title: "Rio", category: "continue", src: "/assets/movie-posters/continue-watch/image208.png", year: "2011", type: "film", isPremium: false, rating: 4.5, description: "Blu ke Rio.", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: "Shazam", category: "continue", src: "/assets/movie-posters/continue-watch/image216.png", year: "2019", type: "film", isPremium: true, rating: 4.7, description: "Remaja jadi superhero.", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, title: "fastX", category: "continue", src: "/assets/movie-posters/continue-watch/image218.png", year: "2023", type: "film", isPremium: true, rating: 4.8, description: "Dom vs Dante.", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, title: "Blue Lock", category: "continue", src: "/assets/movie-posters/continue-watch/image219.png", year: "2022", type: "series", isPremium: true, rating: 4.6, description: "Striker egois.", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, title: "A Man Called Otto", category: "continue", src: "/assets/movie-posters/continue-watch/image224.png", year: "2022", type: "film", isPremium: false, rating: 4.4, description: "Pria pemarah.", createdAt: new Date(), updatedAt: new Date() },
      { id: 6, title: "Big Hero 6", category: "continue", src: "/assets/movie-posters/continue-watch/image226.png", year: "2014", type: "film", isPremium: false, rating: 4.8, description: "Hiro & Baymax.", createdAt: new Date(), updatedAt: new Date() },
      { id: 7, title: "The Tomorrow War", category: "toprated", src: "/assets/movie-posters/top-rated/image212.png", year: "2021", type: "film", isPremium: true, rating: 4.2, description: "Masa depan.", createdAt: new Date(), updatedAt: new Date() },
      { id: 8, title: "Batman", category: "toprated", src: "/assets/movie-posters/top-rated/image213.png", year: "2022", type: "film", isPremium: true, rating: 4.7, description: "Gotham.", createdAt: new Date(), updatedAt: new Date() },
      { id: 9, title: "My Hero Academia", category: "toprated", src: "/assets/movie-posters/top-rated/image223.png", year: "2016", type: "series", isPremium: true, rating: 4.9, description: "Deku.", createdAt: new Date(), updatedAt: new Date() },
      { id: 10, title: "Doctor Strange 2", category: "toprated", src: "/assets/movie-posters/top-rated/image224.png", year: "2022", type: "series", isPremium: true, rating: 4.5, description: "Multiverse.", createdAt: new Date(), updatedAt: new Date() },
      { id: 11, title: "Sonic 2", category: "toprated", src: "/assets/movie-posters/top-rated/image234.png", year: "2022", type: "film", isPremium: false, rating: 4.6, description: "Landak biru.", createdAt: new Date(), updatedAt: new Date() },
      { id: 12, title: "Guardians of Galaxy", category: "toprated", src: "/assets/movie-posters/top-rated/image235.png", year: "2014", type: "film", isPremium: false, rating: 4.8, description: "Star-Lord.", createdAt: new Date(), updatedAt: new Date() },
      { id: 13, title: "Little Mermaid", category: "trending", src: "/assets/movie-posters/trending/image211.png", year: "2023", type: "film", isPremium: true, rating: 4.1, description: "Ariel.", createdAt: new Date(), updatedAt: new Date() },
      { id: 14, title: "Ant-Man 3", category: "trending", src: "/assets/movie-posters/trending/image221.png", year: "2022", type: "film", isPremium: true, rating: 4.0, description: "Quantum.", createdAt: new Date(), updatedAt: new Date() },
      { id: 15, title: "Black Adam", category: "trending", src: "/assets/movie-posters/trending/image226.png", year: "2022", type: "film", isPremium: true, rating: 4.3, description: "Anti-hero.", createdAt: new Date(), updatedAt: new Date() },
      { id: 16, title: "Jurassic World", category: "trending", src: "/assets/movie-posters/trending/image230.png", year: "2015", type: "film", isPremium: false, rating: 4.4, description: "Dino.", createdAt: new Date(), updatedAt: new Date() },
      { id: 17, title: "Spider-Verse 2", category: "trending", src: "/assets/movie-posters/trending/image236.png", year: "2023", type: "film", isPremium: true, rating: 5.0, description: "Miles.", createdAt: new Date(), updatedAt: new Date() },
      { id: 18, title: "Alice in Borderland", category: "newrelease", src: "/assets/movie-posters/new-release/image216.png", year: "2020", type: "film", isPremium: true, rating: 4.8, description: "Games.", createdAt: new Date(), updatedAt: new Date() },
      { id: 19, title: "Dont look Up", category: "newrelease", src: "/assets/movie-posters/new-release/image225.png", year: "2021", type: "film", isPremium: true, rating: 4.1, description: "Komet.", createdAt: new Date(), updatedAt: new Date() },
      { id: 20, title: "The Devil All the Time", category: "newrelease", src: "/assets/movie-posters/new-release/image227.png", year: "2020", type: "film", isPremium: true, rating: 4.4, description: "Dark.", createdAt: new Date(), updatedAt: new Date() },
      { id: 21, title: "Ted Lasso", category: "newrelease", src: "/assets/movie-posters/new-release/image228.png", year: "2020", type: "series", isPremium: true, rating: 4.9, description: "Coach.", createdAt: new Date(), updatedAt: new Date() },
      { id: 22, title: "Dilan 1991", category: "newrelease", src: "/assets/movie-posters/new-release/image232.png", year: "2023", type: "film", isPremium: true, rating: 4.3, description: "Cinta.", createdAt: new Date(), updatedAt: new Date() }
    ];

    return queryInterface.bulkInsert('Movies', movies, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Movies', null, {});
  }
};
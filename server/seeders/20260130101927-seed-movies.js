'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const movies = [
      { id: 1, title: "Rio", category: "continue", src: "/assets/movie-posters/continue-watch/image208.png", year: "2011", type: "film" },
      { id: 2, title: "Shazam", category: "continue", src: "/assets/movie-posters/continue-watch/image216.png", year: "2019", type: "film" },
      { id: 3, title: "fastX", category: "continue", src: "/assets/movie-posters/continue-watch/image218.png", year: "2023", type: "film" },
      { id: 4, title: "Blue Lock", category: "continue", src: "/assets/movie-posters/continue-watch/image219.png", year: "2022", type: "series" },
      { id: 5, title: "A Man Called Otto", category: "continue", src: "/assets/movie-posters/continue-watch/image224.png", year: "2022", type: "film" },
      { id: 6, title: "Big Hero 6", category: "continue", src: "/assets/movie-posters/continue-watch/image226.png", year: "2014", type: "film" },
      { id: 7, title: "The Tomorrow War", category: "toprated", src: "/assets/movie-posters/top-rated/image212.png", year: "2021", type: "film" },
      { id: 8, title: "Batman", category: "toprated", src: "/assets/movie-posters/top-rated/image213.png", year: "2022", type: "film" },
      { id: 9, title: "My Hero Academia", category: "toprated", src: "/assets/movie-posters/top-rated/image223.png", year: "2016", type: "series" },
      { id: 10, title: "Doctor Strange in the Multiverse of Madness", category: "toprated", src: "/assets/movie-posters/top-rated/image224.png", year: "2022", type: "series" },
      { id: 11, title: "Sonic the Hedgehog 2", category: "toprated", src: "/assets/movie-posters/top-rated/image234.png", year: "2022", type: "film" },
      { id: 12, title: "Guardians of Galaxy", category: "toprated", src: "/assets/movie-posters/top-rated/image235.png", year: "2014", type: "film" },
      { id: 13, title: "Little Mermaid", category: "trending", src: "/assets/movie-posters/trending/image211.png", year: "2023", type: "film" },
      { id: 14, title: "antman and the wasp: quantumania", category: "trending", src: "/assets/movie-posters/trending/image221.png", year: "2022", type: "film" },
      { id: 15, title: "Black Adam", category: "trending", src: "/assets/movie-posters/trending/image226.png", year: "2022", type: "film" },
      { id: 16, title: "Jurassic World", category: "trending", src: "/assets/movie-posters/trending/image230.png", year: "2015", type: "film" },
      { id: 17, title: "Spider-Man: Across the Spider-Verse", category: "trending", src: "/assets/movie-posters/trending/image236.png", year: "2023", type: "film" },
      { id: 18, title: "Alice in Borderland", category: "newrelease", src: "/assets/movie-posters/new-release/image216.png", year: "2020", type: "film" },
      { id: 19, title: "Dont look Up", category: "newrelease", src: "/assets/movie-posters/new-release/image225.png", year: "2021", type: "film" },
      { id: 20, title: "The Devil All the Time", category: "newrelease", src: "/assets/movie-posters/new-release/image227.png", year: "2020", type: "film" },
      { id: 21, title: "Ted Lasso", category: "newrelease", src: "/assets/movie-posters/new-release/image228.png", year: "2020", type: "series" },
      { id: 22, title: "Dilan 1991", category: "newrelease", src: "/assets/movie-posters/new-release/image232.png", year: "2023", type: "film" }
    ];

    return queryInterface.bulkInsert('movies', movies, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movies', null, {});
  }
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Title is required" } }
    },
    category: DataTypes.STRING,
    src: DataTypes.STRING,
    year: DataTypes.STRING,
    type: DataTypes.STRING,
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    description: DataTypes.TEXT
  }, {});
  
  Movie.associate = function(models) {
    Movie.belongsToMany(models.Genre, { 
      through: 'movie_genres',
      foreignKey: 'movie_id' 
    });
  };
  
  return Movie;
};
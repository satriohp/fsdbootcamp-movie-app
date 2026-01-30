'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Title is required" } }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    trailerUrl: {
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Active'
    }
  }, {});
  
  Movie.associate = function(models) {
    Movie.belongsToMany(models.Genre, { 
      through: 'movie_genres',
      foreignKey: 'movie_id' 
    });
  };
  
  return Movie;
};
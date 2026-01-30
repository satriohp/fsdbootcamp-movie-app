'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Genre name is required" } }
    }
  }, {});
  
  Genre.associate = function(models) {
    Genre.belongsToMany(models.Movie, { 
      through: 'movie_genres',
      foreignKey: 'genre_id' 
    });
  };
  
  return Genre;
};
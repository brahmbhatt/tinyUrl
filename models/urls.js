

module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    long_url: DataTypes.STRING,
    short_url: {
      type: DataTypes.STRING(6),
      validate: { len: [6, 6] },
    },
  }, {});
  urls.createObject = (shortUrl, longUrl) => urls.findOrCreate({
    where: { short_url: shortUrl },
    defaults: { long_url: longUrl },
  });
  return urls;
};

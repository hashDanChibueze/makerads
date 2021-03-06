const { url } = require('getconfig');
module.exports = {
  siteMetadata: {
    title: `MakerAds - Together we can do more ❤️`,
    description: `Unobtrusive adverts for makers`,
    author: `@JamesIvings`,
    baseUrl: url,
    siteName: 'MakerAds'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-131308247-1',
        head: false,
        anonymize: true,
        respectDNT: true
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    `gatsby-plugin-sass`
  ]
};

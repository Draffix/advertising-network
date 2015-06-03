/**
 * Vytvořil Jaroslav Klimčík dne 26.3.2015.
 */
module.exports = {
    db: 'mongodb://localhost/mean-aplikace',
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google: {
        clientID: 'Application Id',
        clientSecret: 'Application Secret',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};
const path = require('path');
const viewsFolder = path.join(__dirname, '../views');

module.exports = {
    common: {
        from: 'moveuptest18@gmail.com',
        sender: 'moveup'
    },
    specific: {
        BLOCKED: {
            subject: 'blocked',
            templateUrl: path.join(viewsFolder, 'blockedNotification.html')
        },
        UNBLOCKED: {
            subject: 'unblocked',
            templateUrl: path.join(viewsFolder, 'unblockedNotification.html')
        }
    },
};
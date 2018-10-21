/**
 * Timestamp before update hook
 * @param model
 */
function beforeUpdate(model) {
    if (model.state && model.changed('state'))
        model.stateChangeDate = new Date();
}

module.exports = { beforeUpdate };
const fs = require('fs');
const path = require('path');

/**
 * Class loader
 */
class BaseManager {
    constructor(versions, currentPath, modulePart) {
        this.versions = versions || {};

        fs
            .readdirSync(currentPath)
            .filter((file) => fs.statSync(path.join(currentPath, file)).isDirectory())
            .forEach((item) => {
                this.versions[item] = {};

                fs
                    .readdirSync(currentPath + '/' + item)
                    .forEach((controller) => {
                        const name = controller.split(modulePart)[0];
                        const params = [currentPath + '/' + item + '/' + controller, item];
                        this.versions[item][name] = this.getComponent.apply(this, params)
                    });
            });
    }

    getComponent() {
    }
}

module.exports = BaseManager;
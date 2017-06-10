/**
 * Created on 2017/6/10.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
'use strict';

const mongoose = require('mongoose');

module.exports = config => {
    mongoose.Promise = config.Promise || Promise;

    // mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]' [, options]);
    const db = mongoose.createConnection(config.url, config.options);
    let Schema = mongoose.Schema;

    ['error', 'disconnected', 'connected', 'reconnected'].forEach(status => {
        db.on(status, err => {
            if (config.onStatusChange) {
                config.onStatusChange({err, status});
            }
        });
    });

    return {db, Schema};
};

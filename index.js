/**
 * Created on 2017/6/10.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
'use strict';

const mongoose = require('mongoose');

let cap = str => str.replace(/\b\w+\b/g, function (word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
});

module.exports = config => {
    mongoose.Promise = config.Promise || Promise;

    // mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]'
    // [, options]);
    const db = mongoose.createConnection(config.url, config.options);
    let Schema = mongoose.Schema;
    let model = mongoose.model;

    let hooks = {};
    let hookStore = {};

    ['error', 'disconnected', 'connected', 'reconnected'].forEach(status => {
        hookStore[status] = hookStore[status] || [];
        hooks[`on${cap(status)}`] = function (cb) {
            hookStore[status].push(cb);
        };
        db.on(status, err => {
            hookStore[status].forEach(cb => cb());
            if (config.onStatusChange) {
                config.onStatusChange({err, status});
            }
        });
    });

    return Object.assign({db, Schema, model, mongoose}, hooks);
};

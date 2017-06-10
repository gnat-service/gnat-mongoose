/**
 * Created on 2017/6/10.
 * @fileoverview 请填写简要的文件说明.
 * @author joc (Chen Wen)
 */
const connect = require('../');

const mongoUrl = 'mongodb://127.0.0.1:27017/test';

describe('gnat-mongoose', function () {
    it('connect', function (done) {
        let {onConnected} = connect({
            url: mongoUrl
        });
        onConnected(function () {
            done();
        });
    });
});

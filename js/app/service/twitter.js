/*
 * Epic Moments - What people all around the world are saying when you want to hear them.
 * Copyright (C) 2013 Nahuel Barrios <barrios.nahuel@gmail.com>.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by Nahuel Barrios <barrios.nahuel@gmail.com>.
 * Created on 6/5/13, at 2:35 AM.
 */

var app = app || {};
app.service = app.service || {};

app.service.twitter = (function () {
    'use strict';

    /**
     * https://dev.twitter.com/docs/api/1/get/search
     * @param keyword
     * @param onSuccess
     */
    var findNews = function (keyword, onSuccess) {
        var url = 'http://search.twitter.com/search.json?callback=?&q="' + keyword + '"';

        $.getJSON(url, onSuccess);
    };

    /**
     * https://dev.twitter.com/docs/api/1/get/trends/%3Awoeid
     * @param onSuccess
     */
    var findTrends = function (onSuccess) {
        return $.Deferred(function (dfd) {
            $.getJSON('https://api.twitter.com/1/trends/1.json?callback=?', onSuccess || dfd.resolve);
        });
    };

    return {
        findNews: findNews, findTrends: findTrends
    };

}());
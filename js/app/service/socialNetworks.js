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
app.service.socialNetworks = app.service.socialNetworks || {};

/**
 * Module for accessing Twitter services.
 */
app.service.socialNetworks.twitter = (function () {
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

app.service.socialNetworks.instagram = (function () {
    'use strict';

    var CLIENT_ID = 'cb1d643d638842518c90b63c6c3ea7a0';

    var findNews = function (keyword, onSuccess) {
        var url = 'https://api.instagram.com/v1/tags/' + keyword + '/media/recent?client_id=&client_id=' + CLIENT_ID + '&callback=?';

        $.getJSON(url, onSuccess);
    };

    var findTrends = function (onSuccess) {
        $.getJSON('https://api.instagram.com/v1/media/popular?client_id=' + CLIENT_ID + '&callback=?', onSuccess);
    };

    return {
        findTrends: findTrends, findNews: findNews
    };

}());


app.service.socialNetworks.flickr = (function () {
    'use strict';

    var findNews = function (keywords, onSuccess) {
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

        var tags = "", index;
        for (index = 0; index < keywords.length; index++) {
            tags.concat(keywords[index]).concat(',');
        }

        $.getJSON(url, {tags: tags, tagmode: 'any', format: 'json'}, onSuccess);
    };

    return {
        findNews: findNews
    };

}());


app.service.socialNetworks.facebook = (function () {
    'use strict';

    /**
     * Check <a href="https://developers.facebook.com/docs/reference/api/search/">Facebook Search API Reference</a>
     * @param keyword
     * @param onSuccess
     */
    var findNews = function (keyword, onSuccess) {
        var url = 'https://graph.facebook.com/search?type=post&q=' + keyword + '&fields=from,message,id';

        $.getJSON(url, onSuccess);
    };

    return {
        findNews: findNews
    };

}());

/**
 * Module for accessing Google+ services.
 */
app.service.socialNetworks.gplus = (function () {
    'use strict';

    /**
     * https://developers.google.com/+/api/latest/activities#resource
     * @param keyword
     * @param onSuccess
     */
    var findNews = function (keyword, onSuccess) {
        var apiKey = 'AIzaSyCNQ1slAxWLz8pg6MCPXJDVdeozgQBYxz8';

        var url = 'https://www.googleapis.com/plus/v1/activities?key=' + apiKey + '&query=' + keyword + '&maxResults=15&orderBy=best&language=' + navigator.language;

        $.getJSON(url, onSuccess);
    };

    return {
        findNews: findNews
    };

}());
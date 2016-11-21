/*global jQuery*/
/*jslint nomen: true, plusplus: true, browser: true, devel: true */
"use strict";

var _console = console;
var i;
var console = {
    log: function() {
        var args = Array.prototype.slice.call(arguments);
        for (i = 0; i < args.length; i += 1) {
            messageConsole(args[i], 'log');
            _console.log(args[i]);
        }
    },
    warn: function() {
        var args = Array.prototype.slice.call(arguments);
        for (i = 0; i < args.length; i += 1) {
            messageConsole(args[i], 'warn');
            _console.warn(args[i]);
        }
    },
    error: function() {
        var args = Array.prototype.slice.call(arguments);
        for (i = 0; i < args.length; i += 1) {
            messageConsole(args[i], 'error');
            _console.error(args[i]);
        }
    }
}

function messageConsole(message, type) {
    var ev;
    var msg = stringifyLog(message);

    if(!type) type = 'log';
    ev = new CustomEvent('console:' + type, { 'detail': msg });
    window.dispatchEvent(ev);
}

function stringifyLog(message) {
    var stringMessage = '';
    if (message === null) {
        stringMessage = 'null';
    } else if (typeof message === 'string') {
        stringMessage = message;
    } else if (typeof message === 'object') {
        stringMessage = simpleObjectStringify(message);
    }
    return stringMessage;
}

function simpleObjectStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

function DebugObject(element, options) {

    var self = $(element);
    var settings = $.extend({
        showMousePosition: false,
        showWindowDimensions: false,
        debugHtml: {
            mousePositionHtml:
                '<div class="mouse-position">' +
                    '<strong>Mouse: </strong>' +
                    'x<span class="x">' + mouseX + '</span>, ' +
                    'y<span class="y">' + mouseY + '</span>' +
                '</div>',
            windowDimHtml:
                '<div class="window-dim">' +
                    '<strong>Window </strong>' +
                    '<ul>' +
                        '<li class="window-width">' +
                            '<strong>Width: </strong>' +
                            '<span class="width">' + windowWidth + '</span>px' +
                        '</li>' +
                        '<li class="window-height">' +
                            '<strong>Height: </strong>' +
                            '<span class="height">' + windowHeight + '</span>px' +
                        '</li>' +
                    '</ul>' +
                '</div>',
            consoleHtml:
                '<div class="console"></div>'
        }

    }, options);
    var mouseX = 0;
    var mouseY = 0;
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var debugWindow;


    function init() {
        _setStage(function () {
            _setEvents();
            updateDebugView();
            window.setInterval(updateDebugView, 30);
        });

    }

    function _setStage(cb) {
        var windowHtml = "";

        if (settings.showMousePosition) {
            windowHtml += settings.debugHtml.mousePositionHtml;
            windowHtml += '<hr>';
        }
        if (settings.showWindowDimensions) {
            windowHtml += settings.debugHtml.windowDimHtml;
            windowHtml += '<hr>';
        }
        windowHtml += settings.debugHtml.consoleHtml;
        debugWindow = $('<div/>')
            .attr('id', 'debug-window')
            .html('Loading debug...');

        self.prepend(debugWindow);
        debugWindow.html(windowHtml);

        cb();
    };

    function _setEvents() {
        $(window)
            .on('mousemove', function(e){
                mouseX = e.pageX
                mouseY = e.pageY
            })
            .on('resize', function(e){
                windowWidth = $(window).width();
                windowHeight = $(window).height();
            })
            .on('console:log', function(e){
                debugWindow.find('.console').append($('<div/>').addClass('log line').html(e.detail));
            })
            .on('console:warn', function(e){
                debugWindow.find('.console').append($('<div/>').addClass('warn line').html(e.detail));
            })
            .on('console:error', function(e){
                debugWindow.find('.console').append($('<div/>').addClass('error line').html(e.detail));
            })

    };

    function updateDebugView() {
        debugWindow.find('.mouse-position .x').html(mouseX);
        debugWindow.find('.mouse-position .y').html(mouseY);

        debugWindow.find('.window-width .width').html(windowWidth);
        debugWindow.find('.window-height .height').html(windowHeight);

        debugWindow.find('.console').css('height', (windowHeight / 3) * 2 + 'px');
    }

    init();
}


(function ($) {

    $.fn.debugWindow = function (options) {

        this.each(function () {
            new DebugObject(this, options);
        });

        return this;

    };

}(jQuery));

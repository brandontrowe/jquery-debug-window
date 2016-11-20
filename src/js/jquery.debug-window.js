/*global jQuery*/
/*jslint nomen: true, plusplus: true, browser: true, devel: true */
"use strict";

function DebugObject(element, options) {

    var self = $(element);
    var settings = $.extend({

    }, options);
    var mouseX = 0;
    var mouseY = 0;
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var debugWindow;
    var debugHtml =
        '<div class="mouse-position">' +
            '<strong>Mouse: </strong>' +
            'x<span class="x">' + mouseX + '</span>, ' +
            'y<span class="y">' + mouseY + '</span>' +
        '</div>' +
        '<hr>' +
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
        '</div>';

    function init() {
        _setStage(function () {
            _setEvents();
            updateDebugView();
            window.setInterval(updateDebugView, 30);
        });

    }

    function _setStage(cb) {
        debugWindow = $('<div/>')
            .attr('id', 'debug-window')
            .html('Loading debug...');

        self.prepend(debugWindow);
        debugWindow.html(debugHtml);

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
            });

    };

    function updateDebugView() {
        debugWindow.find('.mouse-position .x').html(mouseX);
        debugWindow.find('.mouse-position .y').html(mouseY);

        debugWindow.find('.window-width .width').html(windowWidth);
        debugWindow.find('.window-height .height').html(windowHeight);
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

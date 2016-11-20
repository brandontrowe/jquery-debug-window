/*global jQuery*/
/*jslint nomen: true, plusplus: true, browser: true, devel: true */

(function ($) {
    "use strict";
    var settings = {},
        // private data
        $that = {},
        appData = {
            mouseX:         0,
            mouseY:         0,
            windowWidth:    $(window).width(),
            windowHeight:   $(window).height()
        },

        // Private Methods
        _setSettings = function (options) {$.extend(settings, options); },

        _setStage = function(elem) {
            var debugElem = $('<div/>')
                .attr('id', 'debug-window')
                .html('Loading debug...');
            var debugHtml = '<div class="mouse-position">' +
                                '<strong>Mouse: </strong>' +
                                'x<span class="x">' + appData.mouseX + '</span>, ' +
                                'y<span class="y">' + appData.mouseY + '</span>' +
                            '</div>' +
                            '<hr>' +
                            '<div class="window-dim">' +
                                '<strong>Window </strong>' +
                                '<ul>' +
                                '<li class="window-width">' +
                                    '<strong>Width: </strong>' +
                                    '<span class="width">' + appData.windowWidth + '</span>px' +
                                '</li>' +
                                '<li class="window-height">' +
                                    '<strong>Height: </strong>' +
                                    '<span class="height">' + appData.windowHeight + '</span>px' +
                                '</li>' +
                                '</ul>' +
                            '</div>';

            $(elem).prepend(debugElem);
            debugElem.html(debugHtml);

            function updateDebugView() {
                debugElem.find('.mouse-position .x').html(appData.mouseX);
                debugElem.find('.mouse-position .y').html(appData.mouseY);

                debugElem.find('.window-width .width').html(appData.windowWidth);
                debugElem.find('.window-height .height').html(appData.windowHeight);
            }
            window.setInterval(updateDebugView, 30);
            updateDebugView();
        },

        _setEvents = function() {
            $(window)
                .on('mousemove', function(e){
                    appData.mouseX = e.pageX
                    appData.mouseY = e.pageY
                })
                .on('resize', function(e){
                    appData.windowWidth = $(window).width();
                    appData.windowHeight = $(window).height();
                });

        },

        // Public Methods
        methods = {

            init : function (options) {
                // If options exist, lets merge them with our default settings
                if (options) {_setSettings(options); }

                return this.each(function () {
                    _setStage(this);
                    _setEvents();
                });
            }

        };

    $.fn.debugWindow = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        _out('Method ' +  method + ' does not exist');
    };

}(jQuery));

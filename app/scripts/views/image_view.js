/*global define*/

define([
    'jquery',
    'backbone',
    'text!templates/image.dot',
    'doT'

], function($, Backbone, singeleImgTpl, doT) {
    'use strict';

    var ImageView = Backbone.View.extend({

        template: doT.template(singeleImgTpl),

        el: $('#modal-overlay'),

        initialize: function() {

            var tags = this.model.attributes.tags;

            // convert tags from string to array
            if (typeof tags === 'string' && tags.length > 0) {
                this.model.attributes.tags = tags.split(' ');
            }

        },

        enlargeImg: function(width, height) {

            var enlargedWidth = parseInt(width * 2);
            var enlargedHeight = parseInt(height * 2);

            $('.enlarged').attr('width', enlargedWidth);
            $('.enlarged').attr('height', enlargedHeight);

        },


        render: function() {

            var that = this;

            var modalTemplate = this.template(this.model.attributes);

            // remove previous modalTemplate
            $('body > .modal, body > .modal-backdrop').remove();

            this.$el.html(modalTemplate);

            var modalEle = this.$el.html(modalTemplate).find('.modal');

            modalEle.on('show.bs.modal', function() {
                that.enlargeImg(that.model.width, that.model.height);
            });

            modalEle.modal('show');

        }
    });

    return ImageView;
});
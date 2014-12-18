/*global define*/

define([
    'jquery',
    'backbone',
    'text!templates/images.dot',
    'doT',
    './image_view',
    'text!templates/mask.dot',
    'moment'

], function($, Backbone, ImagesViewTpl, doT, ImageView, MaskTpl, moment) {
    'use strict';

    var ImagesView = Backbone.View.extend({

        template: doT.template(ImagesViewTpl),

        el: $('#content'),

        initialize: function () {
            if(this.sortDirection.date === 'ascend'){
                $('#ascend').parent('label').addClass('active');
            }
        },

        render: function() {

            if (this.collection) {

                // convert datetime format
                this.convertDateFormat(this.collection);
                
                // order the model by date
                if(this.sortDirection.date === 'ascend') {
                    this.sortCollectionByDateOrder(this.collection, true);
                } else {
                    this.sortCollectionByDateOrder(this.collection, false);  
                }
                
                // render view
                this.$el.html(this.template(this.collection));

                if(this.sortDirection.date === 'ascend'){
                    $('#ascend').parent('label').addClass('active');
                } else {
                    $('#descend').parent('label').addClass('active');
                }

                var maskEle = doT.template(MaskTpl);
                
                $('.img-desc').find('img').each(function(){
                
                    var maskHtml = maskEle();

                    $(this).after(maskHtml);

                    $(this).next('.mask').css({width: $(this).width(), height: $(this).height()});

                    $(this).parents('p').addClass('hover-effect');

                });
            } 

        },

        sortDirection: { date :'ascend' },

        events: {
            'click div.img-desc a': 'open',
            'change #ascend' : 'sortImagesAscend',
            'change #descend' : 'sortImagesDescend'
        },

        sortImagesAscend: function(e){
            // e.stopPropagation(); 
            e.preventDefault();
            if(this.sortDirection.date === 'descend'){
                this.sortDirection.date = 'ascend';
                this.render();
            }
        },

        sortImagesDescend: function(e) {
            // e.stopPropagation(); 
            e.preventDefault();
            if(this.sortDirection.date === 'ascend'){
                this.sortDirection.date = 'descend';
                this.render();
            }
        },



        convertDateFormat: function(dataCollection) {

            $.each(dataCollection.models, function(index, value){

                var newFormateDate = moment( new Date(value.attributes.published)).format('YYYY-MM-DD HH:mm');
                
                value.attributes.showtime = newFormateDate;

            });

        },

        sortCollectionByDateOrder: function(dataCollection, ascendOrder) {

            dataCollection.models.sort(function(a, b) {

                var dateA = new Date(a.attributes.published),
                    dateB = new Date(b.attributes.published);
          
                // date ordered in ascending way
                if(ascendOrder === true) {
                    return dateA - dateB;    
                } else {
                    return dateB - dateA;
                }   
                
            });
        },

        open: function(e) {
            
            e.preventDefault();

            var clickEle = $(e.currentTarget);
            
            if (clickEle.find('img').length > 0) {
                
                var index = $(clickEle).parents('.img-desc').attr('index');
                
                // pass image width into modal to calculate enlarged image size
                var imgWidth = clickEle.find('img').innerWidth();
                var imgHeight = clickEle.find('img').innerHeight();

                var modelData = this.collection.models[index];

                $.extend(modelData, {width: imgWidth, height: imgHeight});

                if ($.isNumeric(index)) {

                    var imageView = new ImageView({
                        model: modelData
                    });

                    imageView.render();

                }
                
            } else {
                // open the window in a new tab
                window.open(clickEle.attr('href'), '_blank');
            }


        }


    });

    return ImagesView;
});
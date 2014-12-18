/*global define*/

define([
    'backbone',
    'views/images_view',
    'views/filter_view',
    'collections/image_collection'
], function(Backbone, ImagesView, FilterView, ImageCollection) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        routes: {
            '': 'defaultRoute'
        },

        collection: {},

        initialize: function() {

            this.collection = new ImageCollection();

            var filterView = new FilterView({
                model: this.collection
            });

            filterView.render();

            this.listenTo(this.collection, 'reset', this.photos);

        },

        defaultRoute: function() {
            return this.photos('');
        },

        photos: function() {

            var imagesListView = new ImagesView({
                    collection: this.collection
                }),

                photoCollection = this.collection;


            //render empty first
            if ($.isEmptyObject(photoCollection.getFilter())) {
                photoCollection.tags = '';
                // imagesListView.render();
            }


            photoCollection.fetch({
                success: function() {
                    imagesListView.collection = photoCollection;
                    imagesListView.render();
                }
            });
        }
    });
    return AppRouter;
});
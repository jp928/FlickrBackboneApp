/*global define:true*/
define(['backbone', 'models/image_model', 'underscore'], function(Backbone, ImageModel, _) {

	'use strict';

	var ImageCollection = Backbone.Collection.extend({

		model: ImageModel,

		parse: function(response) {
			return response.items;
		},

		url: function() {
		
			return 'http://api.flickr.com/services/feeds/photos_public.gne?' +
				(this.tags.length ? '&tags=' + encodeURIComponent(this.tags) + '&' : '') +
				'tagmode=all' +
				'&format=json' +
				'&jsoncallback=?';
		},

		sync: function(method, model, options) {

			var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'json',
				url: that.url(),
				processData: false
			}, options);

			return $.ajax(params);
		},

		setFilter: function(tags) {

			this.tags = tags;
			this.sync();

			return this;

		},

		getFilter: function() {
			return this.tags || {};
		},

		onBeforeSend: function() {
			this.trigger('fetch:start');
		},

		onComplete: function() {
			this.trigger('fetch:end');
		}



	});

	return ImageCollection;

});
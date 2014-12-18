/*global define*/

define([
    'jquery',
    'backbone',
    'text!templates/filter.dot',
    'doT',
    'bootstrap'
], function ($, Backbone, filterTpl, doT) {
    'use strict';
  
    var filterView = Backbone.View.extend({

        template: doT.template(filterTpl),

        el: $('#navbar'),
        
        render: function() {
             this.$el.html(this.template);
        },

        events: {
            'click #flickr-filter' : 'filter'
        },

        filter: function(e) {
            e.preventDefault();

            //filter-tag-value
            var tagValue = encodeURIComponent($('#filter-tag-value').val());
 
            if(this.model) {

                if(tagValue.length > 0){
                    this.model.setFilter(tagValue); 
                    
                } else {
                    this.model.tags = '';
                }
                
                this.model.fetch({reset: true});
            }
            
        }
    });

    return filterView;
});
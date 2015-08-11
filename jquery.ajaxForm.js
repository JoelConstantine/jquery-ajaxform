;(function (factory) {
  if ( typeof define === "function" && define.amd ) {
    define( ["jquery"], factory );
  } else {
    factory( jQuery );
  }
}(function($) {
	'use strict';

  // Add the ajaxForm method to the jQuery object
	$.extend($.fn, {
    ajaxForm: function (options) {          
      if(!options) { options = {}; }

      if ( !this.length) {
        return false;
      }

      var form = $.data(this[0], "ajaxform");
      if (form) {
        return form;
      }

      form = new $.ajaxform( options, this [0]);
      $.data(this[0], "ajaxForm", form);


      this.on('submit', function(event) {
        event.preventDefault();
        form.submitForm();
      });

      return form;
    }
  });

  //Add function to initialize options
  $.ajaxform = function ( options, form ) {
    this.settings = $.extend( true, {}, $.ajaxform.defaults, options );
    this.currentForm = form;
    this.init();
  };
  
  $.extend($.ajaxform, {
    default: {
      action: '',
      inputClass: '',
      spinner: ''
    },
    prototype: {
      init: function() {
        this.$el = $(this.currentForm);
        this.selectors = this.settings.inputClass || 'input, textarea, select';
        this.settings.action = this.settings.action || this.$el.attr('action');
        this.submitPost = null;
      },
      // Register a function to be called before submission
      beforeSubmit: function(ft) {
        this.settings.beforeHandler = ft;
      },
      // Register a function to be called after submission
      afterSubmit: function(ft) {
        this.settings.afterHandler = ft;
      },
      // Register a function for on successful submit
      successHandler: function(ft) {

      },
      submitForm: function() {
        var params = json_params(this.$el, this.selectors);

        if (typeof this.settings.beforeHandler !== 'undefined' ) { this.settings.beforeHandler(); } 

        this.submitPost = $.post( this.settings.action, params );

        this.submitPost.done(function() {

        })
        .always(this.settings.afterHandler);
      }
    }
  });

  function json_params($el, selector) {
    var params = {};
    
    $(selector, $el).each(function() {
      params[$(this).attr("name")] = $(this).val();
    });

    return params;
  }

}));
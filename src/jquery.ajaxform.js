(function (factory) {
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

    },
    prototype: {
      init: function() {

      },
      beforeSend: function(ft) {

      },
      afterSend: function(ft) {

      }
    }
  });


}));
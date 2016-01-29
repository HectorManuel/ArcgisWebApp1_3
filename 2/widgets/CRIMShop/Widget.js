define(['dojo/_base/declare', 
		'jimu/BaseWidget',
		'dojo/dom-style',
		'dojo/on',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang', 
		'dijit/form/_AutoCompleterMixin',
      	'dojo/domReady!'],
function(declare, BaseWidget,DomStyle,On, _TemplatedMixin, Lang) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget, _TemplatedMixin], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,


    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      
      On(this.divFoto, "click", Lang.hitch(this, this.FotoAereaClick()));
    },

    startup: function() {
      this.inherited(arguments);
      //this.mapIdNode.innerHTML = 'map id:' + this.map.id;
      console.log('startup');
    },
    
    FotoAereaClick: function(){
    	DomStyle.set(this.divFoto, {backgroundColo:"rgb(255,174,0)"});
    },


    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    }
  });
});
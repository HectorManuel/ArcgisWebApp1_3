define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'jimu/utils',
		'dojo/dom-style',
		'dojo/text!./ListItem.html'],
		function(declare,
			_WidgetBase,
			_TemplatedMixin,
			Lang,
			i18n,
			Utils,
			DomStyle,
			template){
		return declare([_WidgetBase, _TemplatedMixin],{
			
			itemId:null,
			itemName:null,
			itemQty:null,
			itemPrice:null,
			templateString:template,
			
			construct: function(args, srcRefNode){
				declare.safeMixin(this, args);
			},
			
			postCreate: function(){
				this.inherited(arguments);
				this.headerTitle.innerHTML = this.itemId;
			},
			
			startup: function(){
				this.inherited(arguments);
				
			},
			
			DeleteThisItem:function(){
				console.log(itemId);
			}
			
			
		});
	});
define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'jimu/utils',
		'dojo/dom-style',
		'dojo/text!./List.html'],
		function(declare,
			_WidgetBase,
			_TemplatedMixin,
			Lang,
			i18n,
			Utils,
			DomStyle,
			template){
		return declare([_WidgetBase, _TemplatedMixin],{
			

			templateString:template,
			construct: function(args, srcRefNode){
				declare.safeMixin(this, args);
			},
			
			postCreate: function(){
				this.inherited(arguments);
			},
			
			startup: function(){
				this.inherited(arguments);
			},
			
			DeleteThisItem:function(){
				console.log(itemId);
			},
			
			AddItemToList: function(item){
				this.cartList.appendChild(item);
			}
			
		});
	});
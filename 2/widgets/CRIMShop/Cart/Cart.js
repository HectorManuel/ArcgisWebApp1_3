define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/i18n',
		'jimu/utils',
		'dojo/dom-style',
		'dojo/text!./Cart.html',

		'dojo/_base/lang',
		],
		function(declare,
			_WidgetBase,
			_TemplatedMixin,
			i18n,
			Utils,
			DomStyle,
			Template,

			lang){
				return declare([_WidgetBase, _TemplatedMixin],{
					idProperty: null,
					templateString:Template,
					newList:null,
					
					
					consctructor: function(args, srcRefNode){
						declare.safeMixin(this, args);
					},
					
					postCreate: function(){
						this.inherited(arguments);
						// try{
							// this.newList = new List(null, this.listDivCart);
						// }catch(err){
							// console.log("list already created");
						// }
						
					},
					
					startup: function(){
						this.inherited(arguments);
					},
					
					AddListItem: function(){
						
						var itemId = "test";
						//var newList = new List(null, this.listDivCart);
						//var listTemplate = new ListItem({itemId:"test1"});
						//this.newList.AddItemToList(listTemplate.domNode);
						//listTemplate.placeAt(this.listDivCart);
						
					},
					
					ComprarCarro: function(){
						
					},
					
					ItemInfo:function(evt){
						console.log(evt);
					},
					
					DeleteItem:function(){
						console.log("deleting");
					},
					
					DeleteThisItem: function() {
						console.log("Deleting this item");	
					}
				});
			});

define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'dojo/text!./FotoAerea.html',
		'esri/lang',
		'jimu/utils',
		'dojo/dom-style',
		'dojo/store/Memory',
		'dijit/form/FilteringSelect',
		'widgets/CRIMShop/Cart/Cart',
		'widgets/CRIMShop/InitAllWidgets'],
	function(declare,
			_WidgetBase,
			_TemplatedMixin,
			lang,
			i18n,
			template,
			esriLang,
			utils,
			DomStyle,
			Memory,
			FilteringSelect,
			Cart,
			InitWidgetMan){
		return declare([_WidgetBase, _TemplatedMixin],{
			
			templateString:template,
			
			propertyId:null,
			MapNames:null,
			comboBox:null,
			checkbox:null,
			
			constructor: function(args, srcRefNode){
				declare.safeMixin(this,args);
				
			},
			
			postMixinProperties: function(){
				this.inherited(arguments);
			},
			
			postCreate: function(){
				this.inherited(arguments);
				this.ComboBoxInit();
				//this.CheckBoxInit();
			},
			
			startup: function(){
				this.inherited(arguments);
			},
			
			
			ComboBoxInit: function(){
				this.ComboBoxDataStore();
				this.comboBox = new FilteringSelect({
					id:"MapSelect",
					name:"FotoAreaMapSelect",
					value: "seleccione un plano",
					autoComplete:true,
					store:this.MapNames,
					searchAttr:"label"
				},this.MapSelect);
				this.comboBox.startup();
			},
			
			ComboBoxDataStore: function(){
				var data = [{id:"test1", name:"Aerea1998", label:"Foto Aerea 1998"},
				{id:"test2", name:"Aerea2010", label:"Foto Aerea 2010"},
				{id:"test3", name:"Aerea2015", label:"Foto Aerea 2015"}];
				this.MapNames = new Memory({data:data});
				console.log(data);
			},
			
			OnCheckboxClicked: function(x){
				this.checkbox = this.checkBox.checked;
			},
			
			GetListaColindante: function(){
				
			},
			
			AddFotoToCart: function(){
				//var cart = new Cart();
				//cart.AddListItem();
				//InitWidgetMan.AddToCart();
			}
			
		});
	});

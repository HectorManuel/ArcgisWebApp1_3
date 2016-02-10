define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dojo/dom-style',
		'dojo/on',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'widgets/CRIMShop/MainMenu/MainMenu',
		'widgets/CRIMShop/FotoAerea/FotoAerea', 
		'dijit/_WidgetsInTemplateMixin',
		'dijit/form/_AutoCompleterMixin',
		'widgets/CRIMShop/Cart/Cart',
		'jimu/utils',
		'widgets/CRIMShop/CartoOficiales/CartoOficiales',
		'widgets/CRIMShop/RadioColindante/RadioColindante'],
	function(declare,
		_WidgetBase,
		DomStyle,
		on,
		_TemplatedMixin,
		lang,
		MainMenu,
		FotoAerea,
		_WidgetsInTemplateMixin,
		_AutoCompleterMixin,
		Cart,
		utils,
		CartoOficiales,
		RadioColindante){
	return declare[_WidgetBase,_TemplatedMixin],{
		
		FotoAereaWidget: null,
		PlanosOficialesWidget: null,
		ListaColindantesWidget: null,
		ShoppingCartWidget:null,
		MainMenuWidget:null,
		
		InitFotoAerea: function(){
			this.FotoAereaWidget = new FotoAerea({propertId:"FotoAereaInterface"});
			return this.FotoAereaWidget;
		},
		InitCarto: function(){
			this.PlanosOficialesWidget = new CartoOficiales({porpertyId:"CartoInterface"});
			return this.PlanosOficialesWidget;
		},
		InitColindantes: function(title){
			this.ListaColindantesWidget = new RadioColindante({propertyId:"RadiousInterface", widgetTitle:title});
			return this.ListaColindantesWidget;
		},
		
		InitMainMenu: function(){
			this.MainMenuWidget = new MainMenu({idProperty:"Main"});
			return this.MainMenuWidget;
		},
		InitCart: function(){
			this.ShoppingCartWidget = new Cart({idProperty:"ChoppingCart"});
			return this.ShoppingCartWidget;
		},
		
		AddToCart: function(){
			this.ShoppingCartWidget.AddListItem();
		}
	};
});

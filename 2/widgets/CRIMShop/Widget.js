define(['dojo/_base/declare', 
		'jimu/BaseWidget',
		'dojo/dom-style',
		'dojo/on',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'widgets/CRIMShop/MainMenu/MainMenu',
		'widgets/CRIMShop/FotoAerea/FotoAerea', 
		"dijit/_WidgetsInTemplateMixin",
		'dijit/form/_AutoCompleterMixin',
		'widgets/CRIMShop/Cart/Cart',
		'jimu/utils',
		'widgets/CRIMShop/InitAllWidgets'],
function(declare, 
	BaseWidget,
	DomStyle,
	On, 
	_TemplatedMixin, 
	Lang,
	MainMenu,
	FotoAerea,
	_WidgetsInTemplateMixin,
	_AutoCompleterMixin,
	Cart,
	utils,
	InitWidget) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget, _TemplatedMixin], {
    mainMenu: null,
    cart:null,

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
      utils.loadStyleLink("FotoAereaStyle", "./widgets/CRIMShop/FotoAerea/css/style.css");
      utils.loadStyleLink("MainMenuStyles", "./widgets/CRIMShop/MainMenu/css/style.css");
      utils.loadStyleLink("CartpStyle", "./widgets/CRIMShop/CartoOficiales/css/style.css");
      utils.loadStyleLink("CartpStyle", "./widgets/CRIMShop/RadioColindante/css/style.css");
      utils.loadStyleLink("CartStyle", "./widgets/CRIMShop/Cart/css/style.css"); 

    },

    startup: function() {
      this.inherited(arguments);
      DomStyle.set(this.shoopingCart,{display:"none"});
      //this.mainMenu = InitWidget.InitMainMenu();
      this.mainMenu = new MainMenu({idProperty:"Main"});
      this.mainMenu.placeAt(this.mainMenuDiv);
      //create the cart ready for data
      //this.cart = InitWidget.InitCart();
      this.cart = new Cart({idProperty:"ShoppingCart"});
      this.cart.placeAt(this.shoopingCart);
    },
    
    onOpen: function(){
      console.log('onOpen');
    },
    
    OpenCart: function(){
    	DomStyle.set(this.shoopingCart,{display:"block"});
    	DomStyle.set(this.mainMenuDiv,{display:"none"});
    	DomStyle.set(this.backBtn,{display:"block"});
    	DomStyle.set(this.cartbutton, {display:"none"});
    },
    
    ReturnMainMenu: function(){
    	DomStyle.set(this.shoopingCart,{display:"none"});
    	DomStyle.set(this.mainMenuDiv,{display:"block"});
    	DomStyle.set(this.backBtn,{display:"none"});
    	DomStyle.set(this.cartbutton, {display:"block"});	
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
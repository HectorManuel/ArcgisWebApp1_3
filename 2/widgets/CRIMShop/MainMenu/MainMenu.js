define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'dojo/text!./MainMenu.html',
		'esri/lang',
		'jimu/utils',
		'dojo/dom-style',
		'widgets/CRIMShop/FotoAerea/FotoAerea',
		'widgets/CRIMShop/CartoOficiales/CartoOficiales',
		'widgets/CRIMShop/RadioColindante/RadioColindante',
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
		FotoAereaInterface,
		CartoOficiales,
		RadioColindante,
		InitWidgets){
			return declare([_WidgetBase, _TemplatedMixin],{
				
				idProperty:null,
				templateString: template,
				photoInterface: null,
				cartoInterface:null,
				listaInterface:null,
				
				//private variables **************************
				_cartoClick: false,
				_fotoClick: false,
				_colindanteClick: false,
				_elementosClick: false,
				
				//********************************************
				
				constructor: function(args, srcRefNode){
					declare.safeMixin(this, args);
					
				},
				
				postMixInProperties: function(){
					this.inherited(arguments);
				},
				
				postCreate:function(){
					this.inherited(arguments);
					//this.photoInterface = InitWidgets.InitFotoAerea();
					this.photoInterface = new FotoAereaInterface({propertId:"FotoAereaInterface"});
					this.photoInterface.placeAt(this.Foto)
					//this.cartoInterface = InitWidgets.InitCarto();
					this.cartoInterface = new CartoOficiales({porpertyId:"CartoInterface"});
					this.cartoInterface.placeAt(this.carto);
					//this.listaInterface = InitWidgets.InitColindantes("Lista De Colindantes");
					this.listaInterface = new RadioColindante({propertyId:"RadiousInterface", widgetTitle:"Lista Colindante"});
					this.listaInterface.placeAt(this.Colindante);
					
				},
				
				startup: function(){
					this.inherited(arguments);
				},
				
				FotoAereaClick: function(){
			    	DomStyle.set(this.divFoto, {backgroundColor:"rgb(220,85,30)"});
			    	DomStyle.set(this.divCarto, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divColindante, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divElementos, {backgroundColor:"transparent"});
			    	this._cartoClick= false;
					this._fotoClick= true;
					this._colindanteClick= false;
					this._elementosClick= false;
					DomStyle.set(this.SubDivForInterfaceFoto,{display:"block"});
					DomStyle.set(this.SubDivForInterfaceCarto,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceColi,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceElem,{display:"none"});
			    },
			    
			    CartoClick: function(){
			    	DomStyle.set(this.divFoto, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divCarto, {backgroundColor:"rgb(220,85,30)"});
			    	DomStyle.set(this.divColindante, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divElementos, {backgroundColor:"transparent"});
			    	this._cartoClick= true;
					this._fotoClick= false;
					this._colindanteClick= false;
					this._elementosClick= false;
					DomStyle.set(this.SubDivForInterfaceFoto,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceCarto,{display:"block"});
					DomStyle.set(this.SubDivForInterfaceColi,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceElem,{display:"none"});
			    },
			    
			    ColindanteClick: function(){
			    	DomStyle.set(this.divFoto, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divCarto, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divColindante, {backgroundColor:"rgb(220,85,30)"});
			    	DomStyle.set(this.divElementos, {backgroundColor:"transparent"});
			    	this._cartoClick= false;
					this._fotoClick= false;
					this._colindanteClick= true;
					this._elementosClick= false;
					DomStyle.set(this.SubDivForInterfaceFoto,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceCarto,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceColi,{display:"block"});
					DomStyle.set(this.SubDivForInterfaceElem,{display:"none"});
			    },
			    
			    ElementosClick: function(){
			    	DomStyle.set(this.divFoto, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divCarto, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divColindante, {backgroundColor:"transparent"});
			    	DomStyle.set(this.divElementos, {backgroundColor:"rgb(220,85,30)"});
			    	this._cartoClick= false;
					this._fotoClick= false;
					this._colindanteClick= false;
					this._elementosClick= true;
					DomStyle.set(this.SubDivForInterfaceFoto,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceCarto,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceColi,{display:"none"});
					DomStyle.set(this.SubDivForInterfaceElem,{display:"block"});
			    },
			    
			    FotoHover: function(){
			    	if(!this._fotoClick){
			    		DomStyle.set(this.divFoto, {backgroundColor:"rgb(247,194,5)"});
			    	}
			    },
			    
			    FotoUnhover: function(){
			    	if(!this._fotoClick){
			    		DomStyle.set(this.divFoto, {backgroundColor:"transparent"});
			    	}
			    },
			    
			    CartoHover: function(){
			    	if(!this._cartoClick){
			    		DomStyle.set(this.divCarto, {backgroundColor:"rgb(247,194,5)"});
			    	}
			    	
			    },
			    
			    CartoUnhover: function(){
			    	if(!this._cartoClick){
			    		DomStyle.set(this.divCarto, {backgroundColor:"transparent"});				    		
			    	}
			    	
			    },
			    
			    ColindanteHover: function(){
			    	if(!this._colindanteClick){
			    		DomStyle.set(this.divColindante, {backgroundColor:"rgb(247,194,5)"});
			    	}
			    	
			    },
			    
			    ColindanteUnhover: function(){
			    	if(!this._colindanteClick){
			    		DomStyle.set(this.divColindante, {backgroundColor:"transparent"});				    		
			    	}
			    	
			    },
			    
			    ElementosHover: function(){
			    	if(!this._elementosClick){
			    		DomStyle.set(this.divElementos, {backgroundColor:"rgb(247,194,5)"});
			    	}
			    	
			    },
			    
			    ElementosUnhover: function(){
			    	if(!this._elementosClick){
			    		DomStyle.set(this.divElementos, {backgroundColor:"transparent"});
			    	}
			    	
			    }
			});
		});

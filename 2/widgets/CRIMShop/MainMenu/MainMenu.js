define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'dojo/text!./MainMenu.html',
		'esri/lang',
		'jimu/utils',
		'dojo/dom-style',
		'widgets/CRIMShop/RadioColindante/RadioColindante',
		'widgets/CRIMShop/InitAllWidgets',
		'dojo/store/Memory',
		'dijit/form/FilteringSelect',
		'esri/Color',
		'esri/toolbars/draw',
		'dojo/on',
		'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/graphic',
        'dojo/parser',
        'widgets/CRIMShop/DrawingTool/DrawingTool',
        
        'dojo/domReady!',
        'dijit/layout/BorderContainer',
        'dijit/layout/ContentPane'],
	function(declare,
		_WidgetBase,
		_TemplatedMixin,
		lang,
		i18n,
		template,
		esriLang,
		utils,
		DomStyle,
		RadioColindante,
		InitWidgets,
		Memory,
		FilteringSelect,
		Color,
		Draw,
		on,
		SimpleMarker,
		SimpleLine,
		SimpleFill,
		Graphic,
		parser,
		DrawingTool){
			return declare([_WidgetBase, _TemplatedMixin],{
				
				idProperty:null,
				templateString: template,
				photoInterface: null,
				cartoInterface:null,
				listaInterface:null,
				map:null,
				
				//private variables **************************
				_cartoClick: false,
				_fotoClick: false,
				_colindanteClick: false,
				_elementosClick: false,
				
				//*************CARTO VARIABLES****************
				checkedOne: null,
				checkedTen: null,
				drawingToolbar:null,
				//********************************************
				
				//************COlindantes*********************
				ColToolbar:null,
				Units:null,
				dropDownCol:null,
				
				//********************************************
				
				constructor: function(args, srcRefNode){
					declare.safeMixin(this, args);
					
				},
				
				postMixInProperties: function(){
					this.inherited(arguments);
				},
				
				postCreate:function(){
					this.inherited(arguments);
					parser.parse();
					//this.photoInterface = new DrawingTool({map: this.map}, this.CartoGraphicArea);
					this.cartoInterface = new DrawingTool({map: this.map}, this.CartoGraphicArea);
					this.listaInterface = new DrawingTool({map: this.map}, this.ColDrawingArea);
					this.ComboBoxInit();
					this.ComboBoxInitMedidas();
					
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
			    	
			    },
			    
			    AddToCartClick: function(){
			    	
			    },
			    
			    //Area de fotos aereas*****************************
			    //*************************************************
    			OnCheckboxClicked: function(x){
					this.checkbox = this.checkBox.checked;
				},
				GetListaColindante: function(){
					
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
				
				//********************Carto oficiales*************
				//************************************************
		
				
				DeselectClick: function(){
					console.log("deselecting");
				},
				
				Check1in1000: function(){
					this.checkedOne= this.check1in1000.checked;
				},
				
				Check1in10000: function(){
					this.checkedTen= this.check1in10000.checked;
				},
				
				//*********************************************
				//*************COLINDANTES*********************
				
				ComboBoxInitMedidas: function(){
					this.ComboBoxDataStoreMedidas();
					this.dropDownCol = new FilteringSelect({
						id:"distanceUnits",
						name:"Units",
						value: "Select Unit",
						autoComplete:true,
						store:this.Units,
						searchAttr:"name"
					},this.distanceUnits);
					this.dropDownCol.startup();
				},
			    
    			ComboBoxDataStoreMedidas: function(){
					var data = [{id:"test1", name:"metros", label:"Metros"},
					{id:"test2", name:"millas", label:"Millas"},
					{id:"test3", name:"pies", label:"Pies"}];
					this.Units = new Memory({data:data});
					console.log(data);
				},
			});
		});

define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'dojo/text!./RadioColindante.html',
		'esri/lang',
		'jimu/utils',
		'dojo/dom-style',
		'dojo/store/Memory',
		'dijit/form/FilteringSelect',
		'esri/toolbars/draw',
		'dojo/on',
		'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/Color',
        'dojo/store/Memory',
		'dijit/form/FilteringSelect',
		'widgets/CRIMShop/Cart/Cart'],
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
			Draw,
			on,
			SimpleMarker,
			SimpleLine,
			SimpleFill,
			Color,
			Memory,
			FilteringSelect,
			Cart){
		return declare([_WidgetBase, _TemplatedMixin],{
			
			propertyId:null,
			widgetTitle:null,
			templateString:template,
			
			Units:null,
			dropDown:null,
			drawingToolbar:null,
			
			constructor: function(args, srcRefNode){
				declare.safeMixin(this,args);
			},
			
			postMixinProperties: function(){
				this.inherited(arguments);
			},
			
			postCreate: function(){
				this.inherited(arguments);
				this.StartDrawingElements();
				this.ComboBoxInit();
				var titulo = dojo.byId(this.CartoTitle);
				titulo.innerHTML = this.widgetTitle;
				
			},
			
			startup: function(){
				this.inherited(arguments);
			},
			
			StartDrawingElements: function(){
				this.drawingToolbar = new Draw(this.map);
				var fieldsSelectionSymbol = new SimpleFill(SimpleFill.STYLE_SOLID,
					new SimpleLine(SimpleLine.STYLE_DASHDOT,
						new Color([255, 0, 0]), 2),
					new Color([255, 255, 0, 0.5]));
				this.drawingToolbar.setFillSymbol(fieldsSelectionSymbol);
				on(this.drawingToolbar, "DrawEnd", lang.hitch(this, this.DrawResult));
				
			},
			
			ComboBoxInit: function(){
				this.ComboBoxDataStore();
				this.dropDown = new FilteringSelect({
					id:"distanceUnits",
					name:"Units",
					value: "Select Unit",
					autoComplete:true,
					store:this.Units,
					searchAttr:"name"
				},this.distanceUnits);
				this.dropDown.startup();
			},
			
			ComboBoxDataStore: function(){
				var data = [{id:"test1", name:"metros", label:"Metros"},
				{id:"test2", name:"millas", label:"Millas"},
				{id:"test3", name:"pies", label:"Pies"}];
				this.Units = new Memory({data:data});
				console.log(data);
			},
			
			DrawResult: function(evt){
				this.drawingToolbar.deactivate();
				console.log(evt);
			},
			
			PointClick: function(){
				this.drawingToolbar.activate(Draw.POINT);
			},
			
			LineClick: function(){
				this.drawingToolbar.activate(Draw.LINE);
			},
			
			SquareClick: function(){
				this.drawingToolbar.activate(Draw.RECTANGLE);
			},
			
			DeselectClick: function(){
				console.log("deselecting");
			}
		});
	});
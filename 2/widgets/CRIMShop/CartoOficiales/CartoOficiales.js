define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'dojo/text!./CartoOficiales.html',
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
			Cart){
		return declare([_WidgetBase, _TemplatedMixin],{
			
			propertyId:null,
			templateString:template,
			
			checkedOne: null,
			checkedTen: null,
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
				this.drawingToolbar.activate(Draw["RECTANGLE"]);
			},
			
			DeselectClick: function(){
				console.log("deselecting");
			},
			
			Check1in1000: function(){
				this.checkedOne= this.check1in1000.checked;
			},
			
			Check1in10000: function(){
				this.checkedTen= this.check1in10000.checked;
			},
			
			AddToCartClick: function(){
				
			}
			
		});
	});
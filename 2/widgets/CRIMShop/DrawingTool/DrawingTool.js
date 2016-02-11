define(['dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/_base/lang',
		'dojo/i18n',
		'dojo/text!./DrawingTool.html',
		'esri/lang',
		'jimu/utils',
		'dojo/dom-style',
		'esri/toolbars/draw',
		'dojo/on',
		'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/Color',
        'esri/graphic'],
	function(declare,
			_WidgetBase,
			_TemplatedMixin,
			lang,
			i18n,
			template,
			esriLang,
			utils,
			DomStyle,
			Draw,
			on,
			SimpleMarker,
			SimpleLine,
			SimpleFill,
			Color,
			Graphic){
		return declare([_WidgetBase, _TemplatedMixin],{
			
			propertyId:null,
			widgetTitle:null,
			templateString:template,
			map:null,
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
				this.drawingToolbar.on("draw-end", lang.hitch(this, this.AddDrawToMap));
				
			},
			
			DrawThis: function(button){
				var tool = button.currentTarget.id;
				this.drawingToolbar.activate(Draw[tool]);
				this.map.hideZoomSlider();
			},
			
			AddDrawToMap: function(evt){
				var symbol;
				this.drawingToolbar.deactivate();
				this.map.showZoomSlider();
				switch (evt.geometry.type){
					case "point":
					case "multipoint":
						symbol = new SimpleMarker();
						break;
					case "polyline":
						symbol= new SimpleLine();
						break;
					default:
						symbol = new SimpleFill();
						break;						
				}
				
				var graphic = new Graphic(evt.geometry, symbol);
				this.map.graphics.add(graphic);
				
			},
				
			ClearDrawings: function(){
				console.log("deselecting");
				this.map.graphic.clear();
			}
		});
	});
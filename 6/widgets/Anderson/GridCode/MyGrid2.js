define(['dojo/_base/declare', 
        'dojo/_base/array', 
        'dojo/_base/kernel',
        'dojo/_base/lang',
        'dojo/i18n',
        'dojo/on',
        'dojo/mouse',
        'dojo/store/Observable',
        'dojo/topic',
        'dijit/_WidgetBase',
        'dijit/_TemplatedMixin',
        'dijit/Menu',
        'dijit/MenuItem',
        'dijit/MenuSeparator',
        'esri/lang',
        'jimu/utils',
        'dojo/text!./Template/DataGrid.html', 
        'widgets/Anderson/gridx/Grid',
        'widgets/Anderson/gridx/core/model/cache/ASync',
        'widgets/Anderson/gridx/modules/VirtualVScroller',
        'widgets/Anderson/gridx/modules/ColumnResizer',
        'widgets/Anderson/gridx/modules/extendedSelect/Row',
        'widgets/Anderson/gridx/modules/SingleSort',
        'widgets/Anderson/gridx/modules/ColumnWidth',
        'dojo/store/Memory',
        'widgets/Anderson/gridx/support/exporter/toCSV'
        ],
  function(declare, array, kernel, 
           lang, i18n, on, 
           mouse, Observable, topic,
           _WidgetBase, _TemplateMixin, Menu,
           MenuItem, MenuSeparator, esriLang,
           utils,
           template,
           Gridx,Cache, VirtualVScroller, ColumnResizer,
           SelectRow, SingleSort, ColumnWidth, DojoStore, ToCSV){
    return declare([_WidgetBase, _TemplateMixin],{
      //private
      _i18nMessage:null,
      _grid:null,
      _store:null,
      _activeMenuItem:null,
      _selectedRowData:null,
      Memory: null,
      
      //Public
      name:'ResultGrid',
      baseClass:'',
      templateString: template,
      propertyId: null,
      data: null,
      columnNames: null,
      showPropertyIdColumn: true,
      
      constructor: function(args, srcRefNode){
        declare.safeMixin(this, args);
        this._i18nMessage = i18n.getLocalization("widgets/Anderson/GridCode", "strings", kernel.locale);
        if(!esriLang.isDefined(this.propertyId)){
          throw new Error(this._i18nMessage.errNullPropertyId);
        }
        if(!esriLang.isDefined(this.data)){
          throw new Error(this._i18nMessage.errNullData);
        }
        if(!esriLang.isDefined(this.columnNames)){
          throw new Error(this._i18nMessage.errColumnNames);
        }
      },
      
      postMixInProperties: function(){
        this.inherited(arguments);
      },
      
      postCreate:function(){
        this.inherited(arguments);
        //utils.loadStyleLink("dataGridStyles","./widgest/Anderson/GridCode/css/style.css");
        
        this._InitGrid();
        //this._InitContextMenu();
      },
      
      GetStore: function(){
        return this._store;
      },
      
      GetGrid: function(){
        return this._grid;
      },
      
      GridToCSV: function(){
        return ToCSV(this._grid);
      },
        
      DownloadCSV: function(){
        var CSVConvertion = this.GridToCSV();
        
        //desn't work on safary or apple, looking for a workaround for this .
        var blob = new Blob([CSVConvertion.results[0]],{type: 'text/csv;charset=utf-8;'});
        if(navigator.msSaveBlob){//IE10+
          navigator.msSaveBlob(blob,"data2.csv");
        }else{
          var link = document.createElement("a");
          if(link.download !== undefined){//feature detection
            //Only browsers that support HTML5
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "data2.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      },
      OnSelectRow:null,
      OnDeselectRow:null,
      
      //enhanceGrid Try
      _InitGrid:function(){
        this._store= this._CreateStore();
        
        this._grid = new Gridx({
          store: this._store,
          cacheClass:Cache,
          structure:this.columnNames,
          selectRowTriggerOnCell:true,
          modules:[
            VirtualVScroller,
            ColumnResizer,
            SelectRow,
            SingleSort,
            ColumnWidth,
            ]
        });
        this._grid.placeAt(this.gridData);
        //this._grid.startup();
      },
      
      _CreateStore:function(){
        
        //var store = new Observable(this.Memory);
        var store = new DojoStore({idProperty: this.propertyId, data: this.data});
        return store;
      }
  });
});

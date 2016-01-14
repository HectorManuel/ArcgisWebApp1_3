define(['dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/kernel',
        'dojo/_base/lang','dojo/i18n','dojo/on',
        'dojo/mouse','dojo/store/Observable','dojo/topic',
        'dijit/_WidgetBase','dijit/_TemplatedMixin','dijit/Menu',
        'dijit/MenuItem','dijit/MenuSeparator','esri/lang',
        'jimu/utils','widgets/Anderson/dgrid/extensions/ColumnResizer','widgets/Anderson/dgrid/OnDemandGrid',
        'widgets/Anderson/dgrid/Keyboard','widgets/Anderson/dgrid/Selection','widgets/Anderson/dstore/Memory',
        'dojo/text!./Template/DataGrid.html', 'dojox/grid/EnhancedGrid','dojo/data/ItemFileWriteStore'],
  function(declare, array, kernel, 
           lang, i18n, on, 
           mouse, Observable, topic,
           _WidgetBase, _TemplateMixin, Menu,
           MenuItem, MenuSeparator, esriLang,
           utils, ColumnResizer, OnDemandGrid,
           Keyboard, Selection, Memory,
           template, EnhancedGrid, ItemFileWriteStore){
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
      
      
      RemoveAllStoreItems: function(){
        //*******************MODIFICAR A MI INFO***********************
        //*************************************************************
        
        var emptyDataList = [{controlNumber: " "}];
        this.GetStore().setData(emptyDataList);
        this.getStore().remove(" ");
      },
      
      HideColumns: function(arrColumnNames){
        array.forEach(arrColumnNames, function(columnName){
          this._grid.styleColumn(columnName,"display: none;");
        }, this);
      }, 
      
      ShowColumns: function(arrColumnNames){
        array.forEach(arrColumnNames, function(columnName){
          this._grid.styleColumn(columnName, "display: table-cell;");
        }, this);
      },
      
      OnRowClick: function(fnc){
        this._grid.on('.dgrid-row:click', function(event){
          //var row = this.grid.row(event);
          //console.log('Row Clicked: ', wor.id);
          fnc(event);
        });
      },
      
      OnRowMouseLeave: function(fnc){
        this._grid.on('.dgrid-row:mouse.leave', function(event){
          fnc(event);
        });
      },
      
      OnSelectRow:null,
      OnDeselectRow:null,
      
      //enhanceGrid Try
      _InitGrid:function(){
        this._store= this._CreateStore();
        
        this._grid = new dojox.grid.EnhancedGrid({
          store: this._store,
          structure: this.columnNames,
          style: "height:20em; width:45em;",
          rowSelector: '20px'},document.createElement('div'));
          
          dojo.byId(this.gridData).appendChild(this._grid.domNode);
      },
      // //Create the grid an get it ready to render.
      // _InitGrid: function(){
        // this._store = this._CreateStore();
//         
        // var CustomGrid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer]);
//         
        // this._grid = new CustomGrid({
          // collection:this._store,
          // columns: this.columnNames,
          // // for Selection; only select a single row at a time
          // selectionMode: 'singletoggle',
          // // for Keyboard; allow only row-level keyboard navigation
          // cellNavigation: false
//           
        // }, this.gridData);
//         
        // this._grid.on('dgrid-select', lang.hitch(this, function  (event){
          // var row = event.rows[0];
          // if(esriLang.isDefined(this.OnSelectRow)){
            // this.OnSelectRow(row.data);
          // }
        // }));
//         
        // this._grid.on('dgrid-deselect', lang.hitch(this, function(event){
          // var row = event.rows[0];
          // if(esriLang.isDefined(this.onDeselectRow)){
            // this.OnDeselectRow(row.data);
          // }
        // }));
//         
        // this._grid.on("dgrid-show", lang.hitch(this, function () {
           // this._grid.resize();
        // }));
//         
        // //new Memory({
          // //idProperty:this.propertyId,
         // // data: this.data
        // //})
      // },
      
      _CreateStore:function(){
        // this.Memory = new Memory({idProperty:this.propertyId, data:this.data});
        // var store = new Observable(this.Memory);
        var data = {
          identifier: this.propertyId,
          items: this.data
          };
        var store = ItemFileWriteStore({data: data});
        return store;
      }
  });
});

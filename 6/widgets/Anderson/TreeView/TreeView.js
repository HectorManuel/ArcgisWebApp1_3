define(['dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/kernel',
    'dojo/dom-construct',
    'dojo/i18n',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'dojo/store/Memory',
    'widgets/Anderson/cbtree/model/TreeStoreModel',
    'widgets/Anderson/cbtree/store/ObjectStore',
    'widgets/Anderson/cbtree/model/StoreModel-EXT',
    'widgets/Anderson/cbtree/Tree',
    'dojo/store/Observable'
],
function (declare, array, lang, kernel, domConstruct, i18n, _WidgetsInTemplateMixin, 
          BaseWidget, Memory, ObjectStoreModel, ObjectStore, ModelExt, Tree, Observable) {
    return { //declare([BaseWidget, _WidgetsInTemplateMixin], 
      myStore:null,
      myObservable:null,
      myModel:null,
      arrayLocalidadesSelected:[],
      filterCheckedOut:false,
      _i18nMessage:null,
      mainIds:[],
      tree:null,
      
      //valores comercios
      comercioStore:null,
      modelStore:null,
      mainIdsComercio:[],
      
      CreateStore: function(){
        // this.myStore = new Memory({
                        // data:[{ id: 'R', name:'Results', type:'result', location:null, checked:false}],
                        // clearOnClose:true});
        // this.myObservable = Observable(this.myStore);
        this.myStore = new ObjectStore({
                data:[{ id: 'R', name:'Results', type:'result', location:null, municipio:null, barrio:null,area:null,zip:null}],clearOnClose:true});
        //this.myObservable = Observable(this.myStore);
        this.myModel = new ObjectStoreModel({
          store: this.myStore,
          query: {id:"R"},
          rootLabel:"Results",
          checkedRoot:true
        });
      },

      AddToMemory: function(id, name, type, parent, location, municipio, barrio,area, sip){
        var ar = { id: id, name:name, type:type, parent: parent, location:location, municipio:municipio, barrio:barrio,area:area,zip:sip};
        console.log(ar);
        var verify = this.myStore.get(ar.id);
        if(!verify){
          this.myStore.add(ar);
          this.mainIds.push(id);  
        }
        
      },
      
      CreateTree: function(){
        this.tree = new Tree({
          model: this.myModel,
          showRoot:false,
          branchIcons:false,
          leafIcons:false,
          openOnChecked:true,
          openOnDblClick:true,
          enableDelete:true,
          deleteRecursive:true,
          id: "PuntosReferencias"
        });
        return this.tree;
      },
      
      GetStoreData: function(){
        var storeData=[];
        for(var key in this.myStore._data){
          if(this.myStore._data.hasOwnProperty(key)){
            var obj = this.myStore._data[key]
            if(obj.type == "comercio"){
              storeData.push({ObjectId: obj.id, Nombre:obj.name, Municipio: obj.municipio, Barrio:obj.barrio, Zip:"00"+obj.zip.toString()});
            }
          }
        }
        return storeData;
      },
      
      GetFirstPoint: function(id){
        var test = this.myStore.get(id);
        return test.location;       
      },
      
      ClearStore: function(){
        this.myStore.close();
        this.myStore.load({data:[{ id: 'R', name:'Results', type:'result', location:null}]});
      },
      
      UncheckReference: function(){
        this.myModel.uncheck({checked:true});
      },
      
//******************************************************************************************************************
//******************************************************************************************************************
//**************** comercios *****************      
      
      CreateStoreComercios: function(){
        this.comercioStore = new ObjectStore({
                data:[{ id: 'R', name:'Results', type:'result', location:null,}],clearOnClose:true});
        //this.myObservable = Observable(this.myStore);
        this.modelStore = new ObjectStoreModel({
          store: this.comercioStore,
          query: {id:"R"},
          rootLabel:"Results",
          checkedRoot:true
        });
      },
      
      AddToMemoryComercio: function(id, name, type, parent, location){
        var ar = { id: id, name:name, type:type, parent: parent, location:location};
        console.log(ar);
        var verify = this.comercioStore.get(ar.id);
        if(!verify){
          this.comercioStore.add(ar);
          this.mainIdsComercio.push(id);  
        }
        
      },
      
      CreateTreeComercio: function(){
        this.tree = new Tree({
          model: this.modelStore,
          showRoot:false,
          branchIcons:false,
          leafIcons:false,
          openOnChecked:true,
          openOnDblClick:true,
          enableDelete:true,
          deleteRecursive:true,
          id: "ListaDeComercios"
        });
        return this.tree;
      },
      
      GetComercioStore: function(){
        var storeData=[];
        for(var key in this.comercioStore._data){
          if(this.comercioStore._data.hasOwnProperty(key)){
            var obj = this.comercioStore._data[key]
            if(obj.type == "comercios"){
              storeData.push({ObjectId: obj.id, Nombre:obj.name, Descripcion:obj.parent});
            }
          }
        }
        return storeData;
      },
      
      GetFirstPointComercio: function(id){
        var test = this.comercioStore.get(id);
        return test.location;       
      },
      
      ClearStoreCommerce: function(){
        this.comercioStore.close();
        this.comercioStore.load({data:[{ id: 'R', name:'Results', type:'result', location:null}]});
      },
      
      UnCheckCommerce: function(){
       
        this.modelStore.uncheck({checked:true});
      }
        
    };
});



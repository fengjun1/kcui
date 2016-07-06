
//framework_code	
		var Star = function(){
			this.fansList = [];
			this.fansMap = {};
		}
			// BaseModel 
		var star = new Star();

		star.addfans =  function(fans){
			
			try{
				var length = this.fansList.push(fans);
				this.fansMap[fans.id] = (length - 1); //获得他的下标
			}catch(e){
				window.console.log(e);
				return false;
			}
			
			return true ;
		}
		star.findFansByIndex = function(index){
			var length = this.fansList.length;
			if(!index) return false;
			if(length == 0 ) return false ;
			if(index > length) return false ;
			return this.fansList[index];
		}
		
		star.findFansByName = function(fid){
			var length = this.fansList.length;
			if(!fid) return false;
		
			var index = this.fansMap[fid];
			if(index) {
				return this.fansList[index];
			}else{
				return false;
			}
		}
		star.delFansByName = function(fid){
			var length = this.fansList.length;
			if(!fid) return false;
		
			var index = this.fansMap[fid];
			if(index) {
				if (index >= 0) { 
					this.splice(index, 1);
					delete this.fansMap[fid];
					return true; 
				} 
				return false;
			}else{
				return false;
			}		
		}
		
		star.delFansById = function(index){
			if(index) {
				if (index >= 0){ 
					this.splice(index, 1);
					for(fid in this.fansMap){
						var tindex = this.fansMap[fid];
						if(tindex && ( tindex == index ) ) delete this.fansMap[fid]
						break;
					}
					return true;
				}
			}else{
				return false;
			}
		}
		
		star.publish = function(message){
			if(message == 'hidden'){
				for (var i = 0; i < this.fansList.length; i++) {
					 var fans = this.fansList[i];
					 if(fans.isRun==true){
					 	fans.show();
					 }else{
					 	fans.hide();
					 }
					 fans.isRun = false;
				}			
			}
			if(message && _.isObject(message)){
				for (var i = 0; i < this.fansList.length; i++) {
					 var fans = this.fansList[i];
					 fans.render(message);
				}
			}
		}
		


		window.kcui = {};
		window.kcui.mcl = {};
		window.kcui.mol = {};
		window.kcui.vcl = {};
		window.kcui.vol = {};
		window.kcui.actions ={};
		window.kcui.Fn={};
		
		//app初始化方法
		window.kcui.init =function(){
			
		}
		

		//创建基础的BaseModel
		window.kcui.mcl.baseModel = Backbone.Model.extend(star);
		
		//创建基础的BaseView
		window.kcui.vcl.baseView = Backbone.View.extend({
			parentView : {},
			sonViewList :[], //  Map or List   , it up to  you
			isfetch : false, //判断是否 请求接口 
			isRun : false,// TO ----> isShow 

			hide : function(){
				this.$el.hide(100);
			},
			show:function(){
				this.$el.show(800);
			},
			beforeR :function(){
				if(this.isfetch){
					//显示 加载条
				}else{
					//否则 不显示
				}
			}

		});
		//生成全局Model对象，用来做部分业务
		window.kcui.mol.gs = new window.kcui.mcl.baseModel();
		
		

		/*
			@purpose 根据业务需求重写此方法 
		*/
		window.kcui.actions.toPage = function(indexName,options){
	 			var curView = window.kcui.vol[indexName];


	 			//渲染第一步--> 没有数据时 -->怎么判断他是否要请求接口
	 			if(curView){
	 				curView.isRun = true;
	 				window.kcui.mol['gs'].publish('hidden');
	 				curView.render();
	 				//p1.isloadding();
	 				//p1.model.publish({mid : par},{imgModel:par,listMode:par});
	 			}else{
					var CLASSForView = window.kcui.vcl[options.pcn];
					var nextView = new CLASSForView({el:'#app_'+indexName,tid:'#t_Page_'+indexName});
					nextView.indexName = indexName;
					nextView.isRun = true;

					var CLASSForModel = window.kcui.mcl[options.mcn];
					nextView.model = new CLASSForModel();
					window.kcui.vol[nextView.indexName] = nextView;
					window.kcui.mol['gs'].publish('hidden');
					nextView.render();
				}
				//渲染第二步--> ajax数据回来时
				// var ml = options.modelList;

				//考虑是否为数组 
				/*
					m = {
						indexName : '',
						par : '',
						init : ''
					}
				*/
				// if(ml&&_.isArray(ml)){
				// 	for (var i = ml.length - 1; i >= 0; i--) {
				// 		var min = ml[i]; // modelIndexName;
				// 		var m = kcui.mol[min.indexName];//注意判断是否没有-2016-7-4 17:48-miles_fk

				// 		// init 怎么办 ？？？
				// 		// 业务开发者 去 合并 init 和 result值 set 到model里
				// 		m.init = init;

				// 		// To run ajax 
				// 		m.testGet(min.pars); // tget--> ajax--> onsucess--->m.set-->m.change-->v.render(p);

				// 	}
				// }

		}
		window.console.log(window.kcui.vol)
		//?a=123&b=323 Fn  \  core  \   main  
		window.kcui.Fn.transURL=function(pars){
					var tempJSONList = pars.split("&");
					var parObj={};
			        for (var i = 0; i < tempJSONList.length; i++) {
			               var  o =  tempJSONList[i].split('=');
			               parObj[o[0]] = o[1];
			        };
					console.log(parObj);
					return parObj;
			}

		/*
			purpose : makeNewOption

		*/
		window.kcui.Fn.getParms =function(){
			var o = window.kcui.vol[IndexName];
				if(o){			
					o.isRun = true;
					window.kcui.mol['gs'].publish('hidden');
					//curView.render();
	//				p1.isloadding();
	//				p1.model.publish({mid : par},{imgModel:par,listMode:par});				
				}else{
					var CLASS = window.kcui.vcl['Page'];
					var o = new CLASS({el:'#app_p2',tid:'#t_Page_p2'});
					o.indexName = 'curView';
					o.isRun = true;
					window.kcui.vol[curView.indexName] = curView;
					window.kcui.mol['gs'].publish('hidden');
					o.render();
				}
		}

		window.datas = [
	        {
	            title: "一九四二",
	            url: "http://www.baidu.com",
	            film:"电影1"
	        },
	        {
	            title: "少年派的漂流",
	            url: "http://www.baidu.com",
	            film:"电影2"
	        },
	        {
	            title: "教父",
	            url: "http://www.baidu.com",
	            film:"电影3"
	        },
	        {
	            title: "肖申克的救赎",
	            url: "http://www.baidu.com",
	            film:"电影4"
	        },
	        {
	            title: "3d2012",
	            url: "http://www.baidu.com",
	            film:"电影5"
	        }
	    ]; 
	    window.data3 =[
	    	{
	    		market:"360应用市场"
	    	},
	    	{
	    		market:"360应用市场"
	    	},
	    	{
	    		market:"360应用市场"
	    	}
	    ];
	    window.data4 =[
	    	{
	    		name:"title",
	    		label:"应用名称"
	    	},
	    	{
	    		name:"keywords",
	    		label:"关键词"
	    	}
	    ];     
		/*
		 *purpose : 创建Page组件-刷新子组件
		 *createTime : 2016-06-20 00:47
		 *version  : 0.1
		 * author : miles[fukai]
		 * how to use 
		 * var bpc = new window.vcl.Page({ el:"#fkc",tid:"#xxx"});
		 * */
	    window.kcui.vcl.Page = window.kcui.vcl.baseView.extend({
		  	model :{},
		  	el : '',  // 还可以这么写 var bpc = new window.vcl.Page({ el:"#fkc"});
			template: "",// _.template($('#t_Page_fkPage').html()),
			tid:'',
		    initialize :function(pars){
		      //this.render();
		      //this.model.inode.addfans(this);
				window.kcui.mol['gs'].addfans(this);
	
				this.tid = pars.tid;
				this.template = _.template($(this.tid).html());
		    },
		    matchCT: function($domList){
		    		var mc = /^t_.*_.*/;//.* -->禁止贪婪
		    		var scList = [];
		    		$domList.each(function(){
		    			var dson = this;
		    			console.log(this);
		    			var id = dson.id || "";
		    			if(mc.test(id)){
		    				scList.push(dson.id);
		    			}
		    			console.log(id);
		    		});   
		    		return scList;
		    },
		    loadding :function(){
				this.$el.html("正在加载...Page.........................");
				return true;
		    },
		    render: function(){   
		      if(this.beforeR()){
		      	 if(this.doR()){
		      	 	this.afterR();
		      	 }
		      }
		      this.finallyR();
		    },
		    beforeR:function(){
		    		this.loadding(); 
		    		return true;
		    },
			doR:function(){
				this.$el.html(this.template());
	    		return this;
	    	},
		    afterR:function(par){
		    		//TODO 1、bind some event of self
		    		//TODO 2、if this is page component , for son component
		    		var qtlist = [];
		    		qtlist = this.matchCT(this.$el.find("*"));
		    		window.console.dir(qtlist);
		    		 
		    		for(index in qtlist){
		    			    var pList = qtlist[index].split('_'); //t_modelName_objectName
		    			    var indexName = pList[2]; //objectName
		    				var className = pList[1]; //modelName
		    				var svc = new window.kcui.vcl[className](/*send some parms*/);
		    				svc.indexName = indexName; 
		    				window.kcui.vol[indexName] = svc;
		    				// if(par[svc.mode.idnexName]){
		    				// 	svc.model.sync(par);
		    				// }else{
		    				// 	svc.render(); //调用子组件的render方法	
		    				// }
							// svc.parent = this;
		    	 			svc.render(); //调用子组件的render方法	
		    				//this.sonViewList.push(svc)
		    		 		//svc.model.sync();
		    		}
		    		//TODO 3、you can  fetch data by model syn  --> model.set()----> model change event ---> model.idnode.publish() --->this.render()
		   		//this.model.sync();
		    },
		    finallyR:function(){
		    		this.isRun = false;
		    }
		 });
		  
		/*
		 *purpose : 创建List组件
		 *createTime : 2016-06-20 00:47
		 *version  : 0.1
		 * author : miles[fukai]
		 * */
	    window.kcui.vcl.List1 = window.kcui.vcl.baseView.extend({
		  	model :{},
		  	el : '#t_List1_fkList', // 还可以这么写 var bpc = new window.vcl.Page({ el:"#t_List_fkList"});
	    	template:'',
		    initialize: function(){
		    	this.template = _.template($('#fkList').html())
		      //this.render();
		      //this.model.inode.addfans(this);
		    },
		    loadding :function(){
		    		this.$el.html("正在加载...fkList.......");
					return true;
		    },
		    render: function(message){   
		      if(this.beforeR(message)){
		      	 if(this.doR(message)){
		      	 	this.afterR(message);
		      	 }
		      }
		      this.finallyR(message);
		    },
		    beforeR:function(message){
		    		this.loadding(); 
		    		return true;
		    },
	    	doR:function(message){
	    		this.$el.html(this.template(window.datas));
	    		return true;
	    	},
		    afterR:function(message){
		    },
		    finallyR:function(message){
		    }
		  });
		  	
		/*
	     *purpose : 创建图片显示组件
	     *createTime : 2016-6-20 15:04:00
	     *version  : 0.1
	     * author : fengjun
	     * */
	    window.kcui.vcl.Img=window.kcui.vcl.baseView.extend({
	        model:{},
	        el:'#t_Img_fkImg',
	        template:"",
	        initialize:function(){
	        		this.template=_.template($("#fkImg").html())
	        },
	        loadding :function(){
		         this.$el.html("正在加载...fkImg.......");
		         return true;
		    },
	        render:function(){
	         if(this.beforeR()){
	             if(this.doR()){
	                 this.afterR();
	             }
	         }
	         this.finallyR();
	        },
	        beforeR:function(){
	             this.loadding(); 
	             return true;
	        },
	        doR:function(){
	         this.$el.html(this.template());
	        },
	        afterR:function(){
	        },
	        finallyR:function(){
	        }
	     });


	    window.kcui.vcl.List2 = window.kcui.vcl.baseView.extend({
		  	model :{},
		  	el : '#t_List2_upload', // 还可以这么写 var bpc = new window.vcl.Page({ el:"#t_List_markList"});
	    	template:'',
		    initialize: function(){
		    	this.template = _.template($('#t_marketList').html(),data3);
		      //this.render();
		      //this.model.inode.addfans(this);
		    },
		    loadding :function(){
		    		this.$el.html("正在加载...markList.......");
				return true;
		    },
		    render: function(){   
		      if(this.beforeR()){
		      	 if(this.doR()){
		      	 	this.afterR();
		      	 }
		      }
		      this.finallyR();
		    },
		    beforeR:function(){
		    		this.loadding();
		    		return true;
		    },
	    	doR:function(){
	    		this.$el.html(this.template(window.data3));
	    		alert('222')
	    		return true;
	    	},
		    afterR:function(){
		    },
		    finallyR:function(){
		    }
		  });
		
		window.kcui.mcl.Input = window.kcui.mcl.baseModel.extend({
			// initialize: function(){
		 //        this.on('change',  function() {
		 //            if(this.hasChanged()){
		 //                //this.star.publish(this.ar);
		 //                this.publish(this.attributes);
		 //            }
		 //        });
		 //    },
		 //    testGet:function(param){
			// 		var result = {}
			// 		this.set(result);
		 //    }
		});

		window.kcui.mcl.Page4 = window.kcui.mcl.baseModel.extend({
			
		})
		window.kcui.vcl.Page4 = window.kcui.vcl.Page.extend({
			el:'#app_p4',
			model : new window.kcui.mcl.Page4,
			template:'',
			initialize:function(){
				this.template = _.template($("#t_page_p4").html(),data4);
				alert("11111");
			},
			events:{
				'click button#submit':'submit'
			},
			submit:function(){
				var $content=$(".input-regular")
				this.model.set({
					title:$(this.el).find()
				})
			},
			loadding :function(){
				this.$el.html("正在加载...markList.......");
				return true;
			},
			render: function(){
				if(this.beforeR()){
					if(this.doR()){
						this.afterR();
					}
				}
				this.finallyR();
			},
			beforeR:function(){
				this.loadding();
				return true;
			},
			doR:function(){
				this.$el.html(this.template(window.data3));
				alert('222')
				return true;
			},
			afterR:function(){
			},
			finallyR:function(){
			}
		});


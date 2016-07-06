	var options={
		pcn:'',
		mcn:'',
		indexName:'',
		sonViewList:[]
	}
	transParam=function(){
			var pars=$.param("params");
			var URL='file:///C:/Users/Administrator/Desktop/tttest/backbone_test/stage2-6.23/stage2-6.23/tj.html#'+this.indexName+'?'+pars;
			window.kcui.router.navigate(URL);
			}
({
    changestage : function(component, event, helper) {
        var index=component.get("v.index");
        
        var evt = component.getEvent("changeStg");
        evt.setParams({
            "index":index
        });
        evt.fire();
        
        var stage=component.get("v.selectstage");
        // var recId=component.get("v.recordId");
         
     }
})
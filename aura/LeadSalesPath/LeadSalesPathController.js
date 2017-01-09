({
    doInit : function(component, event, helper) {
        var action=component.get("c.getstage");
        var recId = component.get("v.recordId");
        console.log(recId);
        action.setParams({
            "leadId":recId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                component.set("v.leadstage",response.getReturnValue());
                //alert(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
    },
    
    
    updateStage : function(comp, event, helper){
        var num = parseInt(event.getParam("index"));
        var step = comp.get("v.leadstage");
        
        var action=comp.get("c.updatestage");
        var recId = comp.get("v.recordId");
        
        action.setParams({
            "status":step[num].stage,
            "leadId":recId
        });
        action.setCallback(this, function(response) {
            var spinner = comp.find("mySpinner");
        	$A.util.toggleClass(spinner, "slds-hide");
            var state = response.getState();
            
            if (state === "SUCCESS") {
                comp.set("v.leadstage",response.getReturnValue());
                if($A.get("e.force:showToast")){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Successfuly Changed!"
                    });
                    toastEvent.fire();
                    $A.get("e.force:refreshView").fire();
                }
                //alert(JSON.stringify(response.getReturnValue()));
            }else{
                if($A.get("e.force:showToast")){
                    toastEvent.setParams({
                        "title": "Error!",
                        "message": "Error!- Could not Change"
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
        var spinner = comp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
    },
    
    toggleSpinner: function(cmp, event) {
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
    }
    
})
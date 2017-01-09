({
    render : function(comp,helper){
       
        var ret = this.superRender();
        var sel = comp.get("v.class");
        if(sel == "complete"){
            var a  =comp.find("span-id");
            $A.util.addClass(a, "slds-is-complete");
        }else if(sel == "incomplete"){
            $A.util.addClass(comp.find("span-id"), "slds-is-incomplete");
        }else{
            $A.util.addClass(comp.find("span-id"), "slds-is-current");
        }
        return ret;
    }
})
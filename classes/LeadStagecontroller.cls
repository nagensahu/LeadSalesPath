public class LeadStagecontroller {
    
    
    @AuraEnabled
    public static list<stageWrap> getstage(Id leadId){
        List < stageWrap > options = new List < stageWrap > ();
        Lead leadobj=[Select Id,Status from Lead where Id=:leadId];

        Schema.DescribeFieldResult fieldResult = Lead.Status.getDescribe();
        List < Schema.PicklistEntry > pickLists = fieldResult.getPicklistValues();
		boolean found = false;
        for (Schema.PicklistEntry picks: pickLists) {
            stageWrap wrpRec = new stageWrap();
            wrpRec.stage = picks.getValue();
            if(found){
                wrpRec.selection = 'incomplete';
            }else{
                wrpRec.selection = 'complete';
            }
            if(picks.getValue() == leadobj.status){
                found = true;
                wrpRec.selection = 'current';
            }
            options.add(wrpRec);
        }
        return options;
    } 
    
     @AuraEnabled
    public static list<stageWrap> updatestage(String status,Id leadId){
        Lead leadobj=new Lead(id=leadId);
        leadobj.Status=status;
        update leadobj;
        List < stageWrap > options = getstage(leadId);
        return options;
    }
        
    
    public class stageWrap{
        @Auraenabled
        public String stage;
        @Auraenabled
        public String selection;
    }
    
    
    

}
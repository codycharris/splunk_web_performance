require(['jquery','underscore','splunkjs/mvc','splunkjs/mvc/simplexml/ready!'], function($, _, mvc, SimpleSplunkView){

    //Grab the instance of the token model for submitted tokens
    var submitted = mvc.Components.get('submitted');

    //When the token bound to the multi value input changes recompute the query
    submitted.on('change:multiToken',function(submitted, value) {
        setMultiTokenQuery(value);
    },this);


    var setMultiTokenQuery = function(value){
        //Handle the default cases, if we aren't passed a value, search everything
        value = value || [];
        if (value.length === 0) {
            value.unshift("*");
        }

        //Produce the search query and set the token
        var multiTokenQuery = value.join(' OR sourcetype=');
        submitted.set('multiTokenQuery', multiTokenQuery);
    };
    
    //Set the initial value for the query.
    setMultiTokenQuery(submitted.get('multiToken'));
});

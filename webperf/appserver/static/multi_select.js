require(['jquery',
    'underscore',
    'splunkjs/mvc',
    'splunkjs/mvc/multiselectview',
    'splunkjs/mvc/searchmanager',
    'splunkjs/mvc/simplexml/ready!'], 
    function($, _, mvc, MultiSelectView,SearchManager){

        //Instantiate our multi select view
        multiSelect = new MultiSelectView({
            "id": "multi_value_input",
            "value": "$submitted:multiToken$",
            "el": $('#multi_value_input'),
            "labelField": "sourcetype",
            "valueField": "sourcetype",
            "managerid": "multiSearch"
        }, {tokens: true}).render();
        multiSelect = new MultiSelectView({
            "id": "multi_value_input2",
            "value": "$submitted:multiToken$",
            "el": $('#multi_value_input2'),
            "labelField": "bandwidth",
            "valueField": "bandwidth",
            "managerid": "multiSearch"
        }, {tokens: true}).render();


        //Run the search the multi select is looking for
        var multiSearch = new SearchManager({
            "id": "multiSearch",
            "earliest_time": "-15m",
            "status_buckets": 0,
            "search": "index=_internal | stats count by sourcetype",
            "cancelOnUnload": true,
            "latest_time": "now",
            "auto_cancel": 90,
            "preview": true
        }, {tokens: true});
        var multiSearch = new SearchManager({
            "id": "multiSearch2",
            "earliest_time": "-15m",
            "status_buckets": 0,
            "search": "index=_internal | stats count by sourcetype",
            "cancelOnUnload": true,
            "latest_time": "now",
            "auto_cancel": 90,
            "preview": true
        }, {tokens: true});

    }
);

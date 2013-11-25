Web Performance App for Splunk
===


# App Setup

This App uses Node.js to collect web performance data (Web Timing metrics) beaconed from real end users using [boomerang.js](https://github.com/yahoo/boomerang) (a client-side JavaScript library developed by Yahoo!). The data sent by Boomerang to Node is written to /var/log/rum.log by default.


*Download & install Node.js. See: http://nodejs.org/download/*

---

## Test your Node installation.

    node $SPLUNK_HOME/etc/apps/webperf/bin/node/test.js
    Server running at http://127.0.0.1:7000

Hit http://127.0.0.1:7000 in your browser. Open ports as necessary.

## Start the Node server to receive and log performance data from boomerang.js

    sudo node $SPLUNK_HOME/etc/apps/webperf/bin/server.js
    Server running at http://127.0.0.1:7000

*Note: You must run server.js as root or someone with privledges to write to /var/log/*


### Add boomerang.js to the pages you'd like to monitor:

    BOOMR.init({
      beacon_url: 'http://node.mydomain.com:7000',
      site_domain: "example.com", 
      user_ip: "{Client IP Address",
      BW: { enabled: true,
        base_url: "http://base_url/to/bandwidth/images/",
      }
    });

*See: $SPLUNK_HOME/etc/apps/webperf/examples/example.html for a working example (View Soruce)*


That's it! Data sent by boomerang.js should now be flowing into Splunk. Tail /var/log/rum.log to verify that you are receiving data.

----------
## Generating Sample Data:

To generate fake sample data, similar to that beaconed back by boomarang (that's a mouth full), use the data_gen.js node script.

    node $SPLUNK_HOME/etc/apps/webperf/bin/node/data_gen.js
    Note: This will create ~1 event/second for example.com until it reaches 1,000 events.

----------
## Boomerang Beacon Parameters:
The beacon that sent to your server will contain several parameters. Each boomerang plugin also adds its own set of parameters.


#### Default boomerang parameters

 - v : Version number of the boomerang library in use.
 - u : URL of page that sends the beacon.

#### Roundtrip plugin parameters

 - t_done [optional] Perceived load time of the page.
 - t_page [optional] Time taken from the head of the page to page_ready.
 - t_resp [optional] Time taken from the user initiating the request to the first byte of the response.
 - t_other [optional] Comma separated list of additional timers set by page developer. Each timer is of the format name|value. The following timers may be included:
 - t_load [optional] If the page were prerendered, this is the time to fetch and prerender the page.
 - t_prerender : [optional] If the page were prerendered, this is the time from start of prefetch to the actual page display. It may only be useful for debugging.
 - t_postrender [optional] If the page were prerendered, this is the time from prerender finish to actual page display. It may only be useful for debugging.
 - boomerang = The time it took boomerang to load up from first byte to last byte
 - boomr_fb [optional The time it took from the start of page load to the first byte of boomerang. Only included if we know when page load started.
 - r URL of page that set the start time of the beacon.
 - r2 = [optional] URL of referrer of current page. Only set if different from r and strict_referrer has been explicitly turned off.
 - rt.start =  Specifies where the start time came from. May be one of cookie for the start cookie, navigation for the W3C navigation timing API, csi for older versions of Chrome or gtb for the Google Toolbar.
 - rt.bstart = The timestamp when boomerang showed up on the page
 - rt.end = The timestamp when the done() method was called

#### Bandwidth & latency plugin

 - bw = User's measured bandwidth in bytes per second
 - bw_err = 95% confidence interval margin of error in measuring user's bandwidth
 - lat  = User's measured HTTP latency in milliseconds
 - lat_err = 95% confidence interval margin of error in measuring user's latency
 - bw_time = Timestamp (seconds since the epoch) on the user's browser when the bandwidth and latency was measured

*Source: http://lognormal.github.io/boomerang/*

Example Beacon:
---
Below is an example of the beaconed paramaters with the bandwidth & latency and navigation timing plugins enabled converted to JSON.


    {
      "v":"0.9",
	  "u":"file://localhost/Applications/Splunk/etc/apps/webperf/examples/example.html",
  	  "rt.start":"navigation",
	  "rt.bstart":"1384457297300",
	  "rt.end":"1384457297303",
	  "t_done":"13",
	  "t_resp":"0",
	  "t_page":"13",
	  "r":"",
	  "t_other":"boomerang|2,boomr_fb|10",
	  "nt_red_cnt":"0",
	  "nt_nav_type":"1",
	  "nt_nav_st":"1384457297290",
	  "nt_red_st":"0",
	  "nt_red_end":"0",
	  "nt_fet_st":"1384457297290",
	  "nt_dns_st":"1384457297290",
	  "nt_dns_end":"1384457297290",
	  "nt_con_st":"1384457297290",
	  "nt_con_end":"1384457297290",
	  "nt_req_st":"1384457297290",
	  "nt_res_st":"1384457297290",
	  "nt_res_end":"1384457297290",
	  "nt_domloading":"1384457297295",
	  "nt_domint":"1384457297302",
	  "nt_domcontloaded_st":"1384457297302",
	  "nt_domcontloaded_end":"1384457297302",
	  "nt_domcomp":"1384457297303",
	  "nt_load_st":"1384457297303",
	  "nt_load_end":"0",
	  "nt_unload_st":"1384457297291",
	  "nt_unload_end":"1384457297291",
	  "bw":"NaN",
	  "bw_err":"NaN",
	  "lat":"24",
	  "lat_err":"0.84",
	  "bw_time":"1384457298",
	  "ua_raw":{"string":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36",
	  "clientip":"127.0.0.1"
    }

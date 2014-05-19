/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that Given a notebook is published, the users who are not logged in, 
                    can load the notebook using the Shareable link of the respective notebook
                    
    
*/

//Begin Tests

casper.test.begin("To load a published notebook using Shareable link", 2, function suite(test) {
	    
    var x= require('casper').selectXPath;
    
    var link_url = casper.cli.options.url;
    
    casper.start(link_url, function() {
		
        
        
    });//start ends
    
    console.log('Shareable link for a published notebook has been loaded . The user is not logged in to Github');
    casper.wait(10000);
    
    casper.viewport(1024,768).then(function() {
        
        this.test.assertDoesntExist({type:'css',path: 'html body div#main-div.container div.row div.col-md-8 div#tabs-1 div#output.tab-div div#part1.R.notebook-cell div div.r-result-div pre code.r'},
							'Source Code is not present');	
		this.wait(2000);
		this.test.assertExists({type:'xpath',path: '/html/body/div[3]/div/div/div/div/div/div[3]/div[2]'},
							'Output is present');
		
		 this.wait(4000);      
               
    });
    
    	   
    casper.run(function() {
        test.done();
    });
});

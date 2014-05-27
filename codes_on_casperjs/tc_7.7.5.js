/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that When a published notebook is loaded by a user who is not logged-in, 
                    the output of all the cells of that notebook will be displayed. On clicking the "Run All" icon present on the top-left corner of 
                    the page, all the cells of the notebook should run again
                    
    
*/

//Begin Tests

casper.test.begin("Run all the cells using 'Run All' option", 3, function suite(test) {
	    
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
    
     casper.viewport(1024,768).then(function() {
		 this.test.assertTextExists('welcome, anonymous user','Rcloud opens the published notebook for an anonymous user');
	 });
	 
	 //Run all cells of a notebook
	 casper.viewport(1024,768).then(function() {
		 if(this.click(x('/html/body/div[2]/div/div[2]/ul/li[2]/button/i')))
		 {
			 console.log('Run the cells of the notebook using Run All');
		 }
		 else
		 {
			 console.log('Could not run the cells using Run All');
		 }
	 });
    
        	   
    casper.run(function() {
        test.done();
    });
});

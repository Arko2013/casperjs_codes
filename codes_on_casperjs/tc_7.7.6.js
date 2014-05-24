/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that When a published notebook is loaded by a user who is not logged-in,
                    the name of the notebook displayed is same as the name defined by the user to which the notebook belongs. The name cannot be edited 
                    by the anonymous user
                    
    
*/

//Begin Tests

casper.test.begin("Notebook name in uneditable form", 4, function suite(test) {
	    
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
	 
	 //Prove that notebook name is uneditable
	 casper.viewport(1024,768).then(function() { 
		 this.click(x('/html/body/div[2]/div/div[2]/ul/li[3]/a/span'));
		 this.wait(2000);
		 var old_title=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[3]/a/span'));
		 console.log('existing notebook title is :');
		 this.echo(old_title);
		 
		 this.sendKeys('#notebook-title','asgd');
		 this.wait(4000);
		 var new_title=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[3]/a/span'));
		 console.log('notebook title after modifying is :');
		 this.echo(new_title);
		 this.test.assertEquals(new_title,old_title,'Notebook title is not editable');
		 
	 });
    
        	   
    casper.run(function() {
        test.done();
    });
});

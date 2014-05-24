/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that When a published notebook is loaded by a user who is not logged-in,
                    the name of the notebook displayed is same as the name defined by the user to which the notebook belongs. The name cannot be edited 
                    by the anonymous user
                    
    
*/

//Begin Tests

casper.test.begin("Open Notebook in Github option in Advanced drop-down link", 6, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    
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
	 
	 //open the advanced dropdown
	 casper.viewport(1024,768).then(function() { 
		 if(this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/a/b')))
		 {
			 console.log('Advanced dropdown opened');
		 }
		 else
		 {
			 console.log('Could not open Advanced dropdown. Aborting');
			 phantom.exit();
		 }
		 
	 });
    
    //open the notebook in Github
    casper.viewport(1366,768).then(function() {
		
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul.dropdown-menu li a#open-in-github'}, function() {
            console.log("Link for opening notebook in github found. Clicking on it");
            
            if (this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li/a')))
            {
                
                    this.wait(7000);
                    this.waitForPopup(/gist.github.com/, function() {
                        this.test.assertEquals(this.popups.length, 1);
                                        
                    });
            this.wait(11000); 
            
            this.viewport(1366,768).withPopup(/gist.github.com/, function() {
				casper.viewport(1366,768).then(function() {
				     this.wait(4000);
			         console.log(this.getCurrentUrl());
			         this.test.assertUrlMatch(/gist.github.com*/, 'Notebook opened in github');
			         this.wait(3000);
			         //verifying that the gist opened belongs to different user
			         var gist_owner=this.fetchText(x('/html/body/div/div[2]/div/div/div/div/h1/div/div/span/span/a'));
			         this.echo(gist_owner,'current owner of the notebook');
			         this.test.assertNotEquals(gist_owner,github_username,'confirmed that the notebook opens as gist of its actual owner');
				 });
			                              		
		      });       

		   }//if ends
            else
            {
                console.log('Notebook could not be opened in github');
            }
        });
    });
        	   
    casper.run(function() {
        test.done();
    });
});

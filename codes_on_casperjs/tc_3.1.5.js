/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that The name of the notebook in the main.html page opened 
                    after clicking "Edit Notebook" option in view.html option should be editable  
                    
    
*/

//Begin Tests

casper.test.begin("Notebook Name is editable", 6, function suite(test) {
    
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var x= require('casper').selectXPath;
    casper.start(rcloud_url, function() {
        
        
    });
    
   
    casper.then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        //test.assertTitleMatch(/login*/,'login page has the correct title');
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }
	});
	
	
    
    casper.then(function() {
	    this.wait(7000); 
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}, function() {
            console.log("Shareable link found. Clicking on it");
            
            if (this.click({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}))
            {
                
                    this.wait(8000);
                    this.waitForPopup(/view\.html/, function() {
                        this.test.assertEquals(this.popups.length, 1);
                                        
                    });
				this.wait(11000); 
            
				this.withPopup(/view\.html/, function() {
			         console.log(this.getCurrentUrl());
			         test.assertUrlMatch(/view.html*/, 'Got the shareable view');
			         //verifying that the view.html page has git loaded properly by checking if the Edit icon is visible
			         
                     this.test.assertExists(
							{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/button/i' },
							'the element Edit icon exists'
							);
					 this.wait(6000);
					 if(this.click(x('/html/body/div[2]/div/div[2]/ul/li/button/i')))
						 {
							 this.echo('Edit button clicked')
						 }
						 else
						 {
							 this.echo('edit button could not be clicked');
						 }
					casper.then(function() {
							 
						this.wait(8000);
						console.log(this.getCurrentUrl());
						test.assertUrlMatch(/main.html*/, 'main.html opened');
					});
					
					casper.then(function() {
						
					
					 
					  		
		}); //withPopup ends      

		   }//if-ends
            else
            {
                console.log("Shareable link could not be clicked");
            }
        });
    });
    
    
       
    casper.run(function() {
        test.done();
    });
});


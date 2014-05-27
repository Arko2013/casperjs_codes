/* 
    Author: Ganesh Moorthy
    Description:    This is a casperjs automated test script for showing that On clicking the Shareable Link present on top left 
                    corner of the Main page,the view.html page for the currently loaded notebook should open
                    
    
*/

//Begin Tests

casper.test.begin("Shareable Link", 5, function suite(test) {
    
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    
    casper.start(rcloud_url, function() {
        
        
    });
    
   
    casper.viewport(1366,768).then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        //test.assertTitleMatch(/login*/,'login page has the correct title');
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.viewport(1366,768).then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.viewport(1366,768).then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }
	});
    
    casper.viewport(1366,768).then(function() {
	this.wait(3000);
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}, function() {
            console.log("Shareable link found. Clicking on it");
            
            if (this.click({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}))
            {
                
                
                    this.wait(3000);
                    this.viewport(1366,768).waitForPopup(/view\.html/, function() {
                        this.test.assertEquals(this.popups.length, 1);
                                        
                    });
            this.wait(11000); 
            
            this.viewport(1366,768).withPopup(/view\.html/, function() {
			         console.log(this.getCurrentUrl());
			         test.assertUrlMatch(/view.html*/, 'Got the shareable view');
			         //verifying that the view.html page has git loaded properly by checking if the Edit icon is visible
			         
                     this.test.assertExists(
							{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/button/i' },
							'the element Edit icon exists'
							);
					  this.wait(2000);		
		});       

		   }
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


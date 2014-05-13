/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that On clicking the "logout" link present on the top-right corner of  the main page,
                    "goodbye.R" page is loaded with a message "You are now logged out of Rcloud" and a link for "Log back in" is 
                    present
                    
    
*/

//Begin Tests

casper.test.begin("Logout of Rcloud", 3, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    
    casper.start(rcloud_url, function() {
		this.wait(2000);
		this.echo(this.getCurrentUrl());
        
        
    });//start ends
    
    casper.then(function() {
        
        console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password',github_password);
        
               
    });
    
    casper.then(function() {
        this.click({type: 'css', path: 'html body.logged_out div.wrapper div.site div#site-container.context-loader-container div#login.auth-form form div.auth-form-body input.button'});
    });
    
    casper.wait(7000);
    
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
	casper.thenClick(x('/html/body/div[2]/div/div[2]/ul[2]/li[3]/a'),function(){
		  console.log('Logging out of RCloud');
		  this.wait(7000);
	});
	  
	casper.then(function() {
		this.echo(this.getCurrentUrl());
		this.test.assertTextExists(
        'Log back in'
		);
		
	});
	
	   
    casper.run(function() {
        test.done();
    });
});

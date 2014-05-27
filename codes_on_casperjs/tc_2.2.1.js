/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that On clicking the link "Log Back In", "main.html"
                    page gets loaded for the same user who just logged out, without asking for credentials if the user is 
                    logged-in to the Github account
    
*/

//Begin Tests

casper.test.begin("Log Back In- user is logged-in to the Github account", 5, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    
    casper.start(rcloud_url, function() {
		
        
        
    });//start ends
    
    casper.viewport(1366,768).then(function() {
        
        console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password',github_password);
        
               
    });
    
    casper.viewport(1366,768).then(function() {
        this.click({type: 'css', path: 'html body.logged_out div.wrapper div.site div#site-container.context-loader-container div#login.auth-form form div.auth-form-body input.button'});
    });
    
    casper.wait(7000);
    
    casper.viewport(1366,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
	casper.viewport(1366,768).thenClick(x('/html/body/div[2]/div/div[2]/ul[2]/li[3]/a'),function(){
		  console.log('Logging out of RCloud');
		  this.wait(7000);
	});
	  
	casper.viewport(1366,768).then(function() {
		this.echo(this.getCurrentUrl());
		this.test.assertTextExists(
        'Log back in'
		);
		
	});
	
	casper.viewport(1366,768).thenClick(x('/html/body/div[2]/p/a'),function(){
		  console.log('Logging back in to RCloud');
		  this.wait(8000);
		  		  
	});
	
	//Confirming that user has got redirected to RCloud main page
	
	casper.viewport(1366,768).then(function() {
		this.echo(this.getCurrentUrl());
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
	   
    casper.run(function() {
        test.done();
    });
});

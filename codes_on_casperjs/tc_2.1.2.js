/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that on clicking the GitHub Logout button present in 
                    "goodbye.R" page, the user gets a notification if he/she wants to log out of GitHub,confirming which,the user
                     gets logged out from GitHub and Sign-In page of github.com opens
                    
    
*/

//Begin Tests

casper.test.begin("Logout of Github", 5, function suite(test) {
	    
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
	
	casper.thenClick(x('/html/body/div[2]/p[2]/a[2]'),function(){
		  console.log('Logging out of Github');
		  this.wait(7000);
		  this.echo(this.getCurrentUrl());
		  this.test.assertTextExists(
        'Are you sure you want to sign out?'
		);
	});
	
	casper.thenClick(x('/html/body/div/div[3]/div/div/form/div[3]/input'),function(){
		console.log('logged out of Github');
		this.wait(7000);
		this.echo(this.getCurrentUrl());
		this.test.assertTextExists(
        'GitHub'
		);
		
	});
	
	   
    casper.run(function() {
        test.done();
    });
});

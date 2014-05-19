/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that A notebook can be published by selecting the checkbox for that particular 
                    notebook under the "Advanced" drop-down link present on the top-right corner of the page
                    
    
*/

//Begin Tests

casper.test.begin(" Select the checkbox to Publish a Notebook", 1, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var mouse = require("mouse").create(casper);
    
    casper.start(rcloud_url, function() {
		
        
    });//start ends
    
    casper.viewport(1024,768).then(function() {
        
        console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password',github_password);
        
               
    });
    
    casper.viewport(1024,768).then(function() {
        this.click({type: 'css', path: 'html body.logged_out div.wrapper div.site div#site-container.context-loader-container div#login.auth-form form div.auth-form-body input.button'});
    });
    
    casper.wait(7000);
    
    //validation check to ensure that the RCloud main page has got loaded properly
    
    casper.viewport(1024,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
	//create a new notebook.This ensures that the notebook won't be pre-published
	casper.viewport(1024,768).then(function() {
		if(this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i')))
		{
			console.log('new notebook created');
		}
		else
		{
			console.log('new notebook could not be created, aborting');
			phantom.exit();
		}
		this.wait(10000);
	});
	
	
	 //open the Advanced Dropdown
    casper.viewport(1024,768).then(function() {
		if(this.click({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown a.dropdown-toggle b.caret'}))
		{
			console.log('Advanced dropdown opened');
		}
		else
		{
			console.log('advanced dropdown could not be opened');
		}
	});
		
	casper.wait(7000);
	
	//clicking the checkbox to publish notebook
	casper.viewport(1024,768).then(function() {
		if(this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li[8]/a/i')))
		{
			console.log('Notebook has been published');
						
		}
		else
		{
			console.log('Notebook could not be published');
			//this.wait(2000);
		}
		casper.exit();
	
	});
	
	   
    casper.run(function() {
        test.done();
    });
});

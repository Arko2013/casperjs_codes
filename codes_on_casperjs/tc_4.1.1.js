/*

Author: Kunal
Description:The loaded notebook contains Prompt cell(cell present with sign">" at the bottom )with some code and is not executed.
            On clicking the 'Run All' icon present on the top-left corner of the page, the content stay as it is and do not get 
			executed.

*/

//Begin Test

casper.test.begin("Rcloud Authentication Tests", 3, function suite(test) {
	    
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
		});
		
	//Create a new Notebook.
	
    casper.then(function() {
		this.click({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'});
		this.wait(6000);
	});	
		
	//Check for command prompt window

	casper.then(function(){
		this.test.assertExists(
			{type: 'xpath', path:'/html/body/div[3]/div/div[3]/div/div[3]/div[2]'},
			'Prompt cell exists'
			);
		});
	
	//Enter some code in command prompt
	
	casper.then(function(){
		this.sendKeys('#command-prompt','rnorm(100)');
		
	});
	
	//Click on Run all option
	
	casper.then(function(){
		this.click(
		{type: 'xpath', path:'/html/body/div[2]/div/div[2]/ul/li[5]/button'},
			'Run all button clicked'
			);
		this.wait(5000);
		test.assertDoesntExist(x('/html/body/div[3]/div/div[3]/div/div/div/div[3]/div/div/div[2]/div'),'the prompt cell content did not execute');	
		});
	  
    casper.run(function() {
        test.done();
    });
});

/* 
    Author: Arko
    Description:    This is a casperjs automated test script for Display the history results containing the links to each version 
                    of the corresponding notebook
                    
    
*/

//Begin Tests

casper.test.begin(" History links", 3, function suite(test) {
	    
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
	
	//click on the first notebook present in any of the 3 lists under Notebook div
	casper.then(function() {
		this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/div/span'));
		this.wait(8000);
	});
	
	//Create new R cell

	casper.then(function(){
		if(this.click(x('/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i')))
		{
			this.echo('new cell button clicked');
		}
		else
		{
			this.echo('new cell could not be created;error');
		}
		this.wait(6000);
		});
	
	//Enter some code in newly created cell
	
	casper.then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','rnorm(10)');
		this.wait(4000);
	});
	
	//Click on Run all option
	
	casper.then(function(){
		if(this.click(x('/html/body/div[2]/div/div[2]/ul/li[5]/button')))
		{
			this.echo('Run all button clicked');
		}
		else
		{
			this.echo('Run all button could not be clicked;error');
		}
		this.wait(7000);
		});
	
	
	//clicking history link for the first notebook
	casper.thenClick(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/div/span[2]/span[2]/span[2]/span/i'),function(){
		  console.log('history icon clicked');
		  this.wait(7000);
		  this.test.assertExists(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li/ul/li/div/span'),'history links present');
	});
	  
		   
    casper.run(function() {
        test.done();
    });

});

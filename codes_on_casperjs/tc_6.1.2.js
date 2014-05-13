/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showning that To write a comment for the currently loaded notebook 
                    in the comment div provided in the right-side of the page
                    
    
*/

//Begin Tests

casper.test.begin("Comment for a notebook ", 3, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var enter_comment = casper.cli.options.comment;
    var rcloud_url = casper.cli.options.url;
    var mouse = require("mouse").create(casper);
    
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
    
    //following two functions are validations to check if RCloud main page has got loaded properly.It's being checked if the various
    //elements are visible . Here we are checking the Shareable Link and Logout options
    
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
		this.wait(5000);
		if (this.click({type: 'css', path: '#comment-submit'}))
		{
			console.log('div open');
			
		}
		else
		{
			console.log('div closed');
			
		}
			
	});
	casper.run(function() {
        test.done();
    });
});
	
	//entering comments
	/*casper.then(function() {
		//this.test.assertExists({type: 'css', path: '#comment-submit'},'hulla');
		if(this.mouse.click({type: 'css', path: '#comment-submit'}))
		{
			this.wait(4000);
			this.echo('Comment div is already opened');
			casper.then(function() {
			this.sendKeys('#comment-entry-body', enter_comment);
			this.wait(4000);
			if(this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div[2]/input')))
			{
				this.echo('comment entered');
			}
			else
			{
				this.echo('failed to enter comment');
			}
			this.wait(5000);
		});
			
		}
		else
		{
			this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/div/i'));
			this.wait(4000);
			this.echo('comment div opened');
			casper.then(function() {
				this.sendKeys('#comment-entry-body', enter_comment);
				this.wait(4000);
				if(this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div[2]/input')))
				{
					this.echo('comment entered');
				}
				else
				{
					this.echo('failed to enter comment');
				}
				this.wait(5000);
			});
		}
			
		
	});*/
		
	   
    


/*

Author: Arko
Description:When there is no comment for a given notebook, the count for the number of comments will be zero, present 
            in the right-side of the page

*/

//Begin Test

casper.test.begin(" No comments ", 2, function suite(test) {
	    
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
    
    //following two functions are validations to check if RCloud main page has got loaded properly.It's being checked if the various
    //elements are visible . Here we are checking the Shareable Link and Logout options
    
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
	
	//verify that when no comments are made, the count is zero 
	casper.then(function() {
		var text=this.fetchText(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/span/span'));
		this.test.assertEquals(text,'0','no comments have been entered');
	});
	
			
    casper.run(function() {
        test.done();
    });
});


/*

Author: Kunal
Description:Creating a new notebook using the + icon on the top left corner of the Notebook div

*/

//Begin Test

casper.test.begin(" New Notebook", 1, function suite(test) {
	    
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

		
    casper.run(function() {
        test.done();
    });
});

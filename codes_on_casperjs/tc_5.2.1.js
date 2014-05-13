
/*

Author: Kunal
Description:The loaded notebook contains Prompt cell(cell present with sign">" at the bottom )with some code and is not executed.
            On clicking the 'Run All' icon present on the top-left corner of the page, the content stay as it is and do not get 
			executed.

*/

//Begin Test

casper.test.begin("Alpha-numeric", 1, function suite(test) {
	    
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
    
    //verifying that the page has got loaded properly and that all elements are visible. Here I am checking for 
	//Shareable link. Similarly other elements can be checked
	casper.wait(7000);
    
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
		
    
	//Changing currently loaded notebook name with alphabets.
	
    casper.then(function() {
		//this.click({type:'xpath',path:'/html/body/div[2]/div/div[2]/ul/li[6]/a/span'});
		this.wait(2000);
		//this.sendKeys('#notebook-title','AaBbCc')
		this.sendKeys('#notebook-title','fool',{keepFocus: true});
		this.sendKeys('#notebook-title', casper.page.event.key.Enter,{keepFocus: true});
		//this.wait(6000);
		//this.reload();
		this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/span'));
		
	});
	
	casper.then(function() {
		this.wait(8000);
		this.echo(this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span')));
	});
	
	
    casper.run(function() {
        test.done();
    });
});

/* 
    Author: Arko
    Description:    This is a casperjs automated test script Executing a valid R command following a '?' in any cell (R/Markdown/Prompt) or entering it 
                    Help box will display the description of the particular code in Help div
                    
    
*/

//Begin Tests


casper.test.begin("Correct R command in Help div", 2, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var comment = casper.cli.options.content;
    
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
    //validation to check if the Main page has got loaded properly
    casper.viewport(1366,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
		
		
	casper.viewport(1366,768).then(function() {
		if(this.visible('#help-form'))
		{
			this.echo('Help div is open');
			this.wait(5000);
			
		}
		else
		{
			this.echo('Help div is not open,hence opening it');
			this.wait(5000);
			this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div[3]/div/a/i'));
			this.wait(5000);
		}
		this.sendKeys('#input-text-help',comment);
		this.wait(6000);
		if(this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div[3]/div[2]/div/div/form/div/button')))
		{
			this.echo('topic for help entered successfully');
		}
		else
		{
			this.echo('could not enter help content');
		}
		this.wait(8000);
	});

	casper.then(function() {
		console.log('validating then the appropriate documentation is displayed for the correct R command entered');
		this.test.assertTextDoesntExist('No documentation for','confirms that Help content is displayed');
		
	});
    
    
    casper.run(function() {
        test.done();
    });
});

/* 
    Author: Arko
    Description:    This is a casperjs automated test script To write a comment for the currently loaded notebook in the comment div provided in the 
                    right-side of the page
                    
    
*/

//Begin Tests


casper.test.begin("Comment for a notebook", 1, function suite(test) {
	    
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
		if(this.visible('#comments-wrapper'))
		{
			this.echo('Comment div is open');
			this.wait(5000);
			
		}
		else
		{
			this.echo('Comment div is not open,hence opening it');
			this.wait(5000);
			this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div/a/div/i'));
			this.wait(5000);
		}
		this.sendKeys('#comment-entry-body',comment);
		this.wait(6000);
		if(this.click(x('/html/body/div[3]/div/div[4]/div/div/div[2]/div[3]/div[2]/div/div/div/div[2]/input')))
		{
			this.echo('comment entered successfully');
		}
		else
		{
			this.echo('could not enter comment');
		}
	});
    
    
    casper.run(function() {
        test.done();
    });
});

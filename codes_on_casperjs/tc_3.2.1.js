/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that On going to the Shareable Link
                    "http://127.0.0.1:8080/view.html?notebook=<notebook id>" using an alien user's notebook id, view.html page 
                    should open .The page will contain the output div(s) and it will not be editable
    
*/

//Begin Tests

casper.test.begin("Open an alien user's notebook through his/her's Notebook id in the link", 6, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var notebook_id = casper.cli.options.id;
    
    
    casper.start(rcloud_url, function() {
        
        
    });
    
   
    casper.then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        //test.assertTitleMatch(/login*/,'login page has the correct title');
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }
	});
	
	casper.wait(7000);
    
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
    
    casper.thenOpen('http://127.0.0.1:8080/view.html?notebook='+notebook_id,function() {
		this.wait(7000);
		this.echo(this.getCurrentUrl());
	});
	
	casper.then(function() {
		this.test.assertUrlMatch(/view.html/, 'view.html page for given user loaded');
        //verify that only output div is visible and editable icon exists which proves that the notebook is currently not in Editable
        //form
        this.test.assertVisible(x('/html/body/div[3]/div/div/div/div/div[2]/div[3]/div[2]/pre[2]'),'output div visible');
        this.test.assertVisible(x('/html/body/div[2]/div/div[2]/ul/li/button'),'proves that notebook currently is uneditable');
    });
       
    casper.run(function() {
        test.done();
    });
});


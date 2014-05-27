/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that The notebook opened using shareable link 
                    of some different user should be in uneditable form
                    
    
*/

//Begin Tests

casper.test.begin("Contents and title of shared notebook should be uneditable before forking", 9, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var notebook_id = casper.cli.options.id;
    
    
    casper.start(rcloud_url, function() {
        
        
    });
    
   
    casper.viewport(1366,768).then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        //test.assertTitleMatch(/login*/,'login page has the correct title');
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.viewport(1366,768).then(function() {
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
	
    //Validation to check if RCloud main page has loaded properly. We are checking if Shareable Link is visible. Similarly other 
    //icons can also be checked
    casper.viewport(1366,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
    
    casper.viewport(1366,768).thenOpen('http://127.0.0.1:8080/view.html?notebook='+notebook_id,function() {
		this.wait(7000);
		this.echo(this.getCurrentUrl());
	});
	
	casper.viewport(1366,768).then(function() {
		this.test.assertUrlMatch(/view.html/, 'view.html page for given user loaded');
        //verify that only output div is visible and editable icon exists which proves that the notebook is currently not in Editable
        //form
        this.test.assertVisible(x('/html/body/div[3]/div/div/div/div/div[2]/div[3]/div[2]/pre[2]'),'output div visible');
        this.test.assertVisible(x('/html/body/div[2]/div/div[2]/ul/li/button'),'proves that notebook currently is uneditable');
    });
    
    casper.viewport(1366,768).then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul/li/button'),'edit button clicked');
		this.wait(7000);
	});
	
	casper.viewport(1366,768).then(function() {
		this.test.assertUrlMatch(/main.html/, 'RCloud main page for given user loaded');
		this.echo(this.getCurrentUrl());
		var current_name=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		//checking if notebook title is editable
		this.sendKeys('#notebook-title','AaBbCc', {keepFocus: true});
		this.sendKeys('#notebook-title', casper.page.event.key.Enter , {keepFocus: true});
		this.wait(5000);
		var new_name=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		
		if(this.test.assertEquals(new_name,current_name))
		{
			this.echo('Notebook title uneditable');
		}
		else
		{
			this.echo('Notebook title is editable');
		}
		
		//checking if command prompt is visible and whether new code can be entered. This is a validation to check 
		//if contents of notebook are in editable form
		
		this.test.assertNotVisible('#command-prompt','no option to create new cell');
		if(this.sendKeys('#command-prompt','rnorm(100)'))
		{
			this.echo('Notebook contents can be modified');
		}
		else
		{
			this.echo('Notebook contents cannot be modified');
		} 
	});
			
		
	       
    casper.run(function() {
        test.done();
    });
});


/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that Select the Fork option to add the notebook 
                    to the local user's notebooks. The notebook should  now be in editable form. 
*/

//Begin Tests

casper.test.begin("Fork Notebook", 9, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var notebook_id = casper.cli.options.id;
    var local_user= casper.cli.options.name;
    
    
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
    //Validation to check if RCloud main page has loaded properly. We are checking if Shareable Link is visible. Similarly other 
    //icons can also be checked
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
        this.visible(x('/html/body/div[3]/div/div/div/div/div[2]/div[3]/div[2]/pre[2]'),'output div visible');
        this.visible(x('/html/body/div[2]/div/div[2]/ul/li/button'),'proves that notebook currently is uneditable');
    });
    
    casper.then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul/li/button'),'edit button clicked');
		this.wait(7000);
	});
	
	casper.then(function() {
		this.test.assertUrlMatch(/main.html/, 'RCloud main page for given user loaded');
		this.echo(this.getCurrentUrl());
		var current_name=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		//checking if notebook title is editable
		this.sendKeys('#notebook-title','AaBbCc', {keepFocus: true});
		this.sendKeys('#notebook-title', casper.page.event.key.Enter , {keepFocus: true});
		this.wait(5000);
		var new_name=this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		
	});
	
	//checking if command prompt is visible and whether new code can be entered. This is a validation to check 
	//if contents of notebook are in editable form
	casper.then(function() {	
	
		this.test.assertNotVisible('#command-prompt','no option to create new cell');
		if(this.sendKeys('#command-prompt','rnorm(100)'))
		{
			this.echo('Notebook contents can be modified before being forked');
		}
		else
		{
			this.echo('Notebook contents cannot be modified before being forked');
		} 
	});
	
		
	//fork the notebook
	casper.then(function() {
		this.test.assertExists(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'),'Fork option exists,which means the notebook is not yet forked');
		this.click(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'),'Fork option clicked');
		this.wait(11000);
    });
    
    casper.then(function() {
		this.test.assertNotVisible(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'),'Fork option no more visible confirming that notebook has been forked');
	});
    
    
    //checking if command prompt is visible and whether new code can be entered. This is a validation to check 
	//if contents of notebook are in editable form
	casper.then(function() {	
	
		this.test.assertVisible('#command-prompt','option present to create new cell');
		if(this.sendKeys('#command-prompt','rnorm(100)'))
		{
			this.echo('Notebook contents can be modified after being forked');
		}
		else
		{
			this.echo('Notebook contents cannot be modified which means notebook has not been forked properly');
		} 
	});
	
	
       
    casper.run(function() {
        test.done();
    });
});


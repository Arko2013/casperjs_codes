/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that An empty cell, when created in a notebook, does not get saved if we
                    switch to a different notebook and switch back
                    
    
*/

//Begin Tests

casper.test.begin("An empty cell does not get saved on switching to a different notebook", 5, function suite(test) {
	    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var title ;
    
    casper.start(rcloud_url, function() {  
    });
	
	casper.wait(10000);
	
	casper.viewport(1024,768).then(function() {
    if (casper.getTitle().match(/GitHub/))
	{
	
    casper.viewport(1024,768).then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', github_username);
        this.sendKeys('#password', github_password); 
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.viewport(1024,768).then(function() {
        if (this.getTitle().match(/GitHub/)) 
        {
        
	   this.click({type: 'css', path: 'html body.logged_in div.wrapper div.site div#site-container.context-loader-container div.setup-wrapper div.setup-main form p button.button'}); 
	 	console.log("Github Authorization completed");
            
        }
        else
            
        {
            casper.viewport(1024,768).then(function() {
               //test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
			   this.echo(this.getTitle());
			   console.log("Rcloud Home page loaded");
            });
        }
	});
	
	}
	else
	{
           casper.viewport(1024,768).then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page already loaded');
            });
    }
});
    
    casper.wait(7000);
    
    casper.viewport(1024,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li[3]/a' },
			'Logout option exists'
			);
			
	});
	
    
    casper.wait(7000);
    
    
	//create a new notebook
	casper.viewport(1024,768).then(function(){
		
		if(this.click({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'}))
		{
			console.log('New notebook is created');
			this.wait(10000);
					
		}
		else
		{
			console.log('New notebook could not be created');
		}
	});
	
	casper.viewport(1024,768).then(function(){
		
			title = this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
			this.wait(2000);
			this.echo("Title of newly created notebook:"+title);
	});
	
	
	
	
	//getting count of notebooks
	var counter = 0;
			
	casper.then(function() {
		this.wait(5000);
		do
		{
				counter=counter+1;
				//this.echo(counter);
				this.wait(4000);
		}while(this.visible(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li['+counter+']/div')));
		counter=counter-1;
			
		this.echo("total number of notebooks in My Notebooks div:"+counter);
				
	});
	
	//add a new cell
	casper.viewport(1024,768).then(function() {
		if(this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'}))
		{
		
			console.log('Added a new R cell');
			this.wait(5000);
		}
		else
		{
			console.log('Could not add R cell');
		}
	});
	
	//switch to a different notebook
	casper.viewport(1024,768).then(function() {
		temp=counter-1;
		if(this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li['+temp+']/div/span')))
		{
			console.log('Switched to a different notebook');
		}
		else
		{
			console.log('Could not switch to a different notebook');
		}
		this.wait(6000);
	});
	
		
	//switch back to previous notebook
	casper.viewport(1024,768).then(function() {
		this.click(x('/html/body/div[3]/div/div/div[2]/div/div/div/div[2]/div/div/ul/li/ul/li/ul/li['+counter+']/div/span'))
		this.wait(12000);
	});
	
	casper.viewport(1024,768).then(function() {
		var newtitle = this.fetchText(x('/html/body/div[2]/div/div[2]/ul/li[6]/a/span'));
		this.wait(3000);
		this.echo('title of loaded notebook:'+newtitle);
		this.test.assertEquals(title,newtitle,'Successfully switched back to previous notebook');
		
	});
	
	//verify that the newly created cell is not present
	casper.viewport(1024,768).then(function() {
		this.test.assertNotVisible({type: 'css', path: 'div.ace-chrome:nth-child(1) > textarea:nth-child(1)'},'Verified that the newly created empty cell is not saved');
	});
	
	
	   
    casper.run(function() {
        test.done();
    });
});

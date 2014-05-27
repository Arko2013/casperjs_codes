/*

Author: Arko
Description:This is a casperjs automation script for Create a new Rmarkdown cell in the loaded notebook and write some code in it. The 'save' 
            icon present in the navbar on the top-left corner of the page will be enabled. Click on the icon and check whether the changes are saved
            or not
*/
casper.test.begin("Using save icon present in the navbar - New Rmarkdown cell (Not executed)", 3, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var code = casper.cli.options.content;
	//var source_r_code = casper.cli.options.code_r;
	//var source_r2_code = casper.cli.options.code_r2;
    //var edited_source_r_code = casper.cli.options.edit_code_r;
	//var edited_source_r2_code = casper.cli.options.edit_code_r2;
    casper.start(rcloud_url, function() {  
    });
	
	casper.wait(10000);
	
	casper.viewport(1366,768).then(function() {
    if (casper.getTitle().match(/GitHub/))
	{
	
    casper.viewport(1366,768).then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
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
            casper.viewport(1366,768).then(function() {
               //test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
			   this.echo(this.getTitle());
			   console.log("Rcloud Home page loaded");
            });
        }
	});
	
	}
	else
	{
            casper.viewport(1366,768).then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page already loaded');
            });
    }
});
	//verifying that the page has got loaded properly and that all elements are visible. Here I am checking for 
	//Shareable link. Similarly other elements can be checked
	casper.wait(10000);
    
    casper.viewport(1366,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
		
		casper.wait(5000);

	//Creating a New notebook
	
	casper.viewport(1366,768).then(function(){
		this.thenClick({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'});
		this.wait(7000);
		console.log('New notebook is created');
	});
	
	//Added a new R cell
	
	casper.viewport(1366,768).then(function() {
		if(this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'}))
		{
			this.wait(5000);
			console.log('Added a new R cell');
		}
		else
		{
			console.log('could not create R cell');
		}
	});
	
	//Add contents to this cell and execute the code
	
	casper.viewport(1366,768).then(function(){
		this.wait(5000);
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)',"a<-121212");
		this.wait(5000);
		if(this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'}))
		{
			this.wait(5000);
			console.log('Executed the contents of the cell');
		}
		else
		{
		console.log('Contents of the cell not executed');	
		}
	});
	
	// Add a new Rmarkdown cell
	
	casper.viewport(1366,768).then(function() {
		if(this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div[2]/span[2]/i'}))
		{
		this.wait(5000);
		console.log('Added a new Rmarkdown cell');
		}
		else
		{
			console.log('Could not create new Rmarkdown cell');
		}
	
	});
	
	//Add contents to the Rmarkdown cell 
	
	casper.viewport(1366,768).then(function(){
		this.wait(5000);
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)',code);
		this.wait(5000);
		console.log('Contents added to Rmarkdown cell');
	});
	
		
	//Save the contents using save icon
	
	casper.viewport(1366,768).then(function(){
		if(this.thenClick({type:'xpath', path: '/html/body/div[2]/div/div[2]/ul/li[3]/button/i'}))
		{
			console.log('Save icon has been clicked');
			this.wait(5000);
		}
		else
		{
			console.log('Save icon could not be clicked, hence contents will not be saved');
		}
		
	});
	
	//Reloading the page
	
	casper.viewport(1366,768).then(function(){
		this.reload(function() {
        this.echo("Main Page loaded again");
        this.wait(10000);
    });
    
});

	casper.viewport(1366,768).then(function(){
		this.wait(8000);
		//Checking the contents of the markdown cell. Surprisingly while extracting the contents of current cell, the contents for the immediately next 
		//cell also gets extracted. WIP regarding this. For now, we are implementing a workaround executing the Markdown cell 
		//and then extracting content of the Markdown cell
		this.click(x('/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'));
		this.wait(8000);
	});
	
	casper.viewport(1366,768).then(function(){
		var temp =this.fetchText(x('/html/body/div[3]/div/div[3]/div/div/div/div[3]/div[2]/p'));
		this.echo(temp);
		this.test.assertEquals(code,temp,'Contents of Markdown cell have got saved');
		
	});
	
	casper.run(function() {
        test.done();
    });
});

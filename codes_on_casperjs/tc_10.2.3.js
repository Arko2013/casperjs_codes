/*

Author: Kunal
Description:This is a casperjs automation script for checking that the loaded notebook containing Rmarkdown cell which has been executed after
			editing the content of that cell and it should be automatically saved after 30 seconds.
*/
casper.test.begin("Edit Rmarkdown Cell (pre-executed)", 4, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
	var source_code = casper.cli.options.code;
    var edited_source_code = casper.cli.options.edit_code;
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
            casper.viewport(1366,768).then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }
	});
	//verifying that the page has got loaded properly and that all elements are visible. Here I am checking for 
	//Shareable link. Similarly other elements can be checked
	casper.wait(7000);
    
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
	
	//Added a new cell
	
	casper.viewport(1366,768).then(function() {
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
	
	
	// Add a new markdown cell
	
	casper.viewport(1366,768).then(function() {
		if(this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div[2]/span[2]/i'}))
		{
		
			console.log('Added a new R markdown cell');
			this.wait(5000);
		}
		else
		{
			console.log('Could not create markdown cell');
		}
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)',source_code);
		this.wait(5000);
	});
	
	//Deleting the R Cell
	
	casper.viewport(1366,768).then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div[2]/div/div/table/td[6]/span/i'});
		this.wait(5000);
		console.log('Deleting the R cell so that notebook has only Markdown cell');
	});
	
	//Executing the markdown cell
	casper.viewport(1366,768).then(function() {
		if(this.click(x('/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i')))
		{
			console.log('executed the markdown cell');
			this.wait(7000);
		}
		else
		{
			console.log('could not exeute the markdown cell');
		}
	});
	
	//Clicking on the Edit button to make changes to the earlier executed code
	
	casper.viewport(1366,768).then(function(){
		
		if(this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td[2]/span/i'}))
		{
			console.log('markdown cell now in editable form');
			this.wait(7000);
		}
		else
		{
			console.log('markdown cell not in editable form');
		}
	});
	
	//Editing the code
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','876543');
	});
		
	//Waiting for 30 seconds to help auto-save work
	
	casper.viewport(1366,768).then(function(){
		this.wait(30000);
	});
	
	//Reloading the page
	
	casper.viewport(1366,768).then(function(){
		this.reload(function() {
        this.echo("Main Page loaded again");
        this.wait(10000);
    });
    
});
		
	casper.viewport(1366,768).then(function(){
		this.wait(15000);
	//Checking the contents of the Rmarkdown cell
		var temp = this.fetchText(x('/html/body/div[3]/div/div/div/div/div/div[3]/div/div/div[2]/div/div[3]/div/div'));
		this.echo(this.fetchText(x('/html/body/div[3]/div/div/div/div/div/div[3]/div/div/div[2]/div/div[3]/div/div')));
		this.test.assertNotEquals(temp,source_code,'Code has been successfully edited');
		
	});
	
	casper.run(function() {
        test.done();
    });
});

/*

Author: Kunal
Description:This is a casperjs automation script for checking The loaded notebook will contain Rmarkdown cell which has been executed. 
			Now, edit the content of that cell and execute it using the 'run' or 'result' icon present on the side of the cell 
			or using 'ctrl+enter' option from keyboard. Check whether the changes are saved or not.
*/
casper.test.begin("Edit Rmarkdown Cell (one Rmarkdown cell pre-executed)", 4, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
	var source_code = casper.cli.options.code;
    //var edited_source_code = casper.cli.options.edit_code;
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
			this.wait(5000);
			console.log('Added a new R cell');
		}
		else
		{
			console.log('could not create R cell');
		}
	});
	
	// Add a new markdown cell
	
	casper.viewport(1366,768).then(function() {
		if(this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div[2]/span[2]/i'}))
		{
		this.wait(5000);
		console.log('Added a new R markdown cell');
		}
		else
		{
			console.log('could not create new markdown cell');
		}
	
	});
	
	//Add contents to the Rmarkdown cell and then execute it using run option
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)',source_code);
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
	
		//Deleting the R Cell
	
	casper.viewport(1366,768).then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div[2]/div/div/table/td[6]/span/i'});
		this.wait(5000);
		console.log('Deleting the R cell');
	});
	
	//Clicking on the Edit button to make changes to the earlier executed code
	
	casper.viewport(1366,768).then(function(){
		this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td[2]/span/i'});
		this.wait(5000);
	});
	
	//Editing the code
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','8765');
	});
	
	
		
	//Run/Executing the code using run-all option
	
	casper.viewport(1366,768).then(function(){
		this.thenClick({type:'xpath', path: '/html/body/div[2]/div/div[2]/ul/li[5]/button'});
		this.wait(5000);
	});
	
	//Reloading the page
	
	casper.viewport(1366,768).then(function(){
		this.reload(function() {
        this.echo("Main Page loaded again");
        this.wait(10000);
    });
    
});
		
	casper.viewport(1366,768).then(function(){
		this.wait(20000);
		//Checking the contents of the Rmarkdown cell
		var temp = this.fetchText(x('/html/body/div[3]/div/div/div/div/div/div[3]/div/div/div[2]/div/div[3]/div/div'));
		this.echo(this.fetchText(x('/html/body/div[3]/div/div/div/div/div/div[3]/div/div/div[2]/div/div[3]/div/div')));
		this.test.assertNotEquals(temp,source_code,'Contents of Markdown cell have got edited');
	});
	
	casper.run(function() {
        test.done();
    });
});

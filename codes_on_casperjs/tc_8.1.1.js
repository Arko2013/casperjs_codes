/*

Author: Kunal
Description:This is a casperjs automation script to write a code in the RMarkdown cell of loaded notebook
			
*/
casper.test.begin("Write some code in a Markdown cell", 3, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
	var source_rm_code = casper.cli.options.code_rm;
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
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'});
	});
	
	// Add a RMarkdown cell using the plus icon on top of the R cell
	
	casper.viewport(1366,768).then(function(){
		this.click({type:'xpath',path:'/html/body/div[3]/div/div[3]/div/div/div/div[2]/span[2]/i'});
		this.wait(5000);
		console.log('Added a RMarkdown cell');
	});
	
	//Delete the R cell
	
	casper.viewport(1366,768).then(function(){
		this.click({type:'xpath',path:'/html/body/div[3]/div/div[3]/div/div/div[2]/div/div/table/td[6]/span/i'});
		this.wait(5000);
	});
	
	
	//Add contents to the Rmarkdown cell
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)',source_rm_code);
		this.wait(5000);
	});
	
	
	casper.viewport(1366,768).then(function(){
		this.wait(15000);
		//checking whether contents are written on Rmarkdown cell or no
		console.log('The contents of the rmarkdown cell:');
		this.echo(this.fetchText({type:'xpath',path:'/html/body/div[3]/div/div[3]/div/div/div/div[3]/div/div/div[2]/div'}));
		
	});
	
	casper.run(function() {
        test.done();
    });
});

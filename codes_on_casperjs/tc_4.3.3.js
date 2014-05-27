/*

Author: Kunal
Description:This is a casperjs automation script for notebook containing more than one RMarkdown cell with some code 
 			which is already executed and Run all button is then clicked and checked wheather the Rmarkdown cell are 
 			executed or no.

*/
casper.test.begin("Execute pre executed R cell", 3, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var r_code = casper.cli.options.code;
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
	//verifying that the page has got loaded properly and that all elements are visible. Here I am checking for 
	//Shareable link. Similarly other elements can be checked
	casper.wait(7000);
    
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
		
	//Creating a New notebook
	
	casper.then(function(){
		this.thenClick({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'});
		this.wait(5000);
		console.log('New notebook is created');
	});
		
	//Added a new cell
	
	casper.then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'});
		console.log('Added a new cell');
	});
	
	// Add a RMarkdown cell by clicking the add-cell button on the current R cell
	
	casper.then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div[2]/span[2]/i'});
		console.log('Added one RMarkdown cell');
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','hello');
		this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'});
		this.wait(5000);
		console.log('Executed the contents of the RMarkdown cell');
	});
	
	//Add another RMarkdown cell by clicking the add-cell button on the current RMarkdown cell
	
	casper.then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div[2]/span[2]/i'});
		console.log('Added one more RMarkdown cell');
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','hii');
		this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'});
		this.wait(5000);
		console.log('Executed the contents of the second RMarkdown cell');
	});
	
	//Deleting the R cell
	
	casper.then(function(){
		this.thenClick({type:'xpath',path:'/html/body/div[3]/div/div[3]/div/div/div[3]/div/div/table/td[6]/span/i'});
		this.wait(5000);
		console.log('R cell deleted and only RMarkdown cells are present  in the loaded Notebook');
	});
	
	//Now clicking on run all option
	
	casper.then(function(){
		this.thenClick({type:'xpath', path: '/html/body/div[2]/div/div[2]/ul/li[5]/button'});
		this.wait(5000);
		console.log('Run-all button is clicked to execute the pre-executed R cell');
	});
	
	   
    casper.run(function() {
        test.done();
    });
});

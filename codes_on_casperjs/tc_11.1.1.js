/*

Author: Kunal
Description:This is a casperjs automation script for checking that for an empty cell(R/Markdown),
			clicking on the Split Cell option does not create any new empty cell
*/
casper.test.begin("For an empty cell", 4, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
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
	
	
	//Clicking on the split cell button
	
	casper.viewport(1366,768).then(function(){
		this.wait(15000);
		if(this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td[5]/span/i'}))
		{
			console.log('Split icon clicked');
			this.wait(5000);
		}
		else
		{
			console.log('Split icon not clicked');
		}
	});
	
		
	casper.viewport(1366,768).then(function(){
		this.wait(15000);
	//Checking the whether any new cell is created or no
		this.test.assertDoesntExist
		({type: 'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div[2]/div[3]/div/div/div[2]/div'},
			'No new cell is created, while clicking on split cell button for empty cells');
	});
	
	casper.run(function() {
        test.done();
    });
});

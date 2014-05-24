/*

Author: Kunal
Description:This is a casperjs automation script for The checkbox for "show source" is selected for showing the source code when a notebook is executed
*/
casper.test.begin("Show source Checkbox selected", 5, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var r_code = casper.cli.options.code;
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
		this.wait(5000);
		console.log('Added a new cell');
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','rnorm(10)');
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
	
	//Now clicking on the advanced div
	
	casper.viewport(1366,768).then(function(){
		
		this.wait(5000);
		if(this.thenClick({type:'xpath', path: '/html/body/div[2]/div/div[2]/ul[2]/li/a/b'}))
		{
			this.wait(5000);
			console.log('Advanced dropdown selected');
		}
		else
		{	
		console.log('Advanced dropdown not selected selected');
	}
	});
	
	//Now checking whether show source is selected or no
	
	casper.viewport(1366,768).then(function(){
		this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul.dropdown-menu li a#show-source'});
        console.log("Link for show source found.Checking its state");
		this.wait(5000);
		this.test.assertExists({type:'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul#advanced-menu.dropdown-menu li a#show-source i.icon-check'},
		'Show source already selected');
		
	});
	
	//Clicking on the Run-all option
	
	casper.viewport(1366,768).then(function(){
		this.wait(5000);
		this.thenClick({type:'css', path: 'html body div.navbar div div.nav-collapse ul.nav li button#run-notebook.btn'},
		'Run-all option clicked');
		this.wait(5000);
	});
	   
	 //Checking whether source code is present or just the output
	 
	 casper.viewport(1366,768).then(function(){
		this.wait(10000);
		this.test.assertExists({type:'xpath',path: '/html/body/div[3]/div/div[3]/div/div/div/div[3]/div[2]/pre/code'},
								'Source code is also present along with outputs');
	});
	   
    casper.run(function() {
        test.done();
    });
});

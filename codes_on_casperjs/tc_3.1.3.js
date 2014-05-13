/* 
    Author: Ganesh Moorthy
    Description:    This is a casperjs automated test script for showing that On clicking the Shareable Link present on top left 
                    corner of the Main page,the view.html page for the currently loaded notebook should open
                    
    
*/

//Begin Tests

casper.test.begin("Shareable Link", 7, function suite(test) {
    
    var x= require('casper').selectXPath;
	var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    
    casper.start(rcloud_url, function() {
        
        
    });
    
   
    casper.then(function() {
       test.assertTitleMatch(/GitHub/, "Github page has been loaded"); 
       console.log("Login into GitHub with supplied username and password");
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
	
		
	
	//Creating a New notebook
	
	casper.then(function(){
		this.wait(10000);
		this.thenClick({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'});
		this.wait(5000);
		console.log('New notebook is created');
	});
		
	//Added a new cell
	
	casper.then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'});
		console.log('Added a new cell');
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','rnorm(10)');
		this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'});
		this.wait(5000);
		console.log('Executed the contents of the cell');
	});
	
    
    casper.then(function() {
	this.wait(5000);
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}, function() {
            console.log("Shareable link found. Clicking on it");
            
            if (this.click({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}))
            {
                    this.wait(7000);
                    this.waitForPopup(/view\.html/, function() {
                        this.test.assertEquals(this.popups.length, 2);
                                        
                    });
            this.wait(11000); 
            
            this.withPopup(/view\.html/, function() {
			         console.log(this.getCurrentUrl());
			         test.assertUrlMatch(/view.html*/, 'Got the shareable view');
			         
//verifying that the view.html page has git loaded properly by checking if the Edit icon is visible
			         
                     this.test.assertExists({type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/button/i' },
							'the element Edit icon exists');
					 this.wait(2000);
					 
//Checking whether just the output is present or even the source code
					 
					 this.test.assertDoesntExist({type:'css',path: 'html body div#main-div.container div.row div.col-md-8 div#tabs-1 div#output.tab-div div#part1.R.notebook-cell div div.r-result-div pre code.r'},
							'Code is not present');	
							
//Clicking on the advanced div to check the source code
								 
		casper.then(function() {
			this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/a/b'),'Advanced div opened');
			this.wait(6000);
	});
		casper.then(function() {
			this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul.dropdown-menu li a#show-source'});
            console.log("Link for show source found. Clicking on it");
            this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li[2]/a'));
            this.wait(10000);

// Again checking for the source code if present or no

            this.test.assertExists({type:'xpath',path:'/html/body/div[3]/div/div/div/div/div/div[3]/div[2]/pre/code'},'Code is present');
            
		});
	});
}

            else
            {
                console.log("Shareable link could not be clicked");
            }
        });
    });
       
    casper.run(function() {
        test.done();
    });
});

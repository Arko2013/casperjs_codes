/* 
    Author: Kunal
    Description:    This is a casperjs automated test script for After clicking on "Edit Notebook" option ,
    				the main.html page opens and Show source option is selected by default under "Advanced" 
    				dropdown list.
                    
*/

//Begin Tests

casper.test.begin("By default, Show Source is selected", 6, function suite(test) {
    
    var x= require('casper').selectXPath;
	var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    
    casper.start(rcloud_url, function() {
        
        
    });
    
   
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
            
        }//if ends
        else
            
        {
            casper.then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }//else ends
	});
		
		
	//Creating a New notebook
	
	casper.viewport(1366,768).then(function(){
		this.wait(10000);
		this.thenClick({type:'xpath',path:'/html/body/div[3]/div/div/div[2]/div/div/div/div/a[2]/i'});
		this.wait(5000);
		console.log('New notebook is created');
	});
		
	//Added a new cell
	
	casper.viewport(1366,768).then(function() {
		this.click({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div[3]/div/div/table/tbody/tr/td/span/i'});
		console.log('Added a new cell');
	});
	
	//Add contents to this cell and then execute it using run option
	
	casper.viewport(1366,768).then(function(){
		this.sendKeys('div.ace-chrome:nth-child(1) > textarea:nth-child(1)','rnorm(10)');
		this.thenClick({type:'xpath', path: '/html/body/div[3]/div/div[3]/div/div/div/div/div/table/td/span/i'});
		this.wait(5000);
		console.log('Executed the contents of the cell');
	});
	
    
    casper.viewport(1366,768).then(function() {
		this.wait(7000);
        this.viewport(1366,768).waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}, function() {
            console.log("Shareable link found. Clicking on it");
            if (this.click({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn'}))
            {
                    this.wait(10000);
                    this.viewport(1366,768).waitForPopup(/view\.html/, function() {
                        this.test.assertEquals(this.popups.length, 2);
                                        
                    });
					this.wait(11000); 
            
					this.viewport(1366,768).withPopup(/view\.html/, function() {
						console.log(this.getCurrentUrl());
						this.test.assertUrlMatch(/view.html*/, 'Got the shareable view');
			         
		//verifying that the view.html page has git loaded properly by checking if the Edit icon is visible
			         
						this.test.assertExists({type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/button/i' },
							'the element Edit icon exists');
						this.wait(2000);
						this.thenClick({type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/button/i' },
							'Clicking on edit button');
						this.wait(16000);
					});
					casper.viewport(1366,768).then(function() {
						this.echo(this.getCurrentUrl());
					});

		//Clicking on Advanced div again
		
		casper.viewport(1366,768).then(function() {			
			this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/a/b'),'Advanced div opened');
			this.wait(9000);
	});
	
	//Checking whether show source is already clicked or no
	
		casper.viewport(1366,768).then(function() {
			this.wait(10000);
			this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul#advanced-menu.dropdown-menu li a#show-source'});
            console.log("Link for show source found.");
			this.test.assertExists({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul#advanced-menu.dropdown-menu li a#show-source i.icon-check'},'Checked that the show source is already selected');
            this.wait(10000);
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

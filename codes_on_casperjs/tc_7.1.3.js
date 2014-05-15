/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that When a notebook belonging to some different user 
                    is loaded and forked,a new notebook having the same name gets added to the list of existing notebooks for the current user.
                    The gist of notebook can then be opened in Github by selecting the link for "Open in Github" under the Advanced drop-down link 
                    present on the top-right corner of the page
*/

//Begin Tests

casper.test.begin(" Loaded Notebook of some different user (after the Notebook is forked)", 6, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var user= casper.cli.options.usr;
    var notebook_id= casper.cli.options.id;
    
    
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
	
	casper.wait(7000);
    
    casper.then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
	
	//open notebook belonging to some different user
	casper.thenOpen('http://127.0.0.1:8080/main.html?notebook='+notebook_id,function() {
		this.wait(8000);
		this.echo(this.getCurrentUrl());
	});
	
	//forking the notebook
	casper.then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'),'Fork option clicked');
		this.wait(8000);
		
	});
    
    //open the Advanced Dropdown
    casper.then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul/li[2]/a'));
		this.wait(5000);
	});
    //open the notebook in Github 
    	
	casper.then(function() {
		
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul#advanced-menu.dropdown-menu li a#open-in-github'}, function() {
            console.log("Link for opening notebook in github found. Clicking on it");
            
            if (this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li/a')))
            {
                
                    this.wait(7000);
                    this.waitForPopup(/gist.github.com/, function() {
                        this.test.assertEquals(this.popups.length, 1);
                                        
                    });
            this.wait(11000); 
            
            this.withPopup(/gist.github.com/, function() {
				     this.wait(4000);
			         console.log(this.getCurrentUrl());
			         this.test.assertUrlMatch(/gist.github.com*/, 'Notebook opened in github');
			         //verifying that the gist opened belongs to local user
			         this.wait(8000);
			         var gist_user=this.fetchText(x('/html/body/div/div[2]/div/div/div/div/h1/div/div/span/span/a'));
			         this.echo(gist_user);
			         this.echo(user);
			         this.test.assertNotEquals(gist_user,user,'verified that the gist belongs to different user');
			         
		             });       

		   }//if ends
            else
            {
                console.log('Notebook could not be opened in github');
            }
        });
    });
	
	
       
    casper.run(function() {
        test.done();
    });
});


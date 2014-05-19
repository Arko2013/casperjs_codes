/* 
    Author: Arko
    Description:    This is a casperjs automated test script for showing that After opening the shared notebook in main.html 
                    page by clicking on Edit Notebook icon, if the notebook is opened in Github , it opens under the alien user's 
                    repository. The case is same if the notebook is opened in Github from  the view.html page
*/

//Begin Tests

casper.test.begin("Open Notebook In Github without Forking", 9, function suite(test) {
    
    var x= require('casper').selectXPath;
    var github_username = casper.cli.options.username;
    var github_password = casper.cli.options.password;
    var rcloud_url = casper.cli.options.url;
    var notebook_id = casper.cli.options.id;
    var local_user= casper.cli.options.name;
    
    
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
            casper.then(function() {
               test.assertTitleMatch(/RCloud/, 'Rcloud Home page loaded');
            });
        }
	});
	
	casper.wait(7000);
    
    casper.viewport(1366,768).then(function() {
		this.test.assertExists(
			{type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a' },
			'the element Shareable Link exists'
			);
		});
    
    casper.viewport(1366,768).thenOpen('http://127.0.0.1:8080/view.html?notebook='+notebook_id,function() {
		this.wait(7000);
		this.echo(this.getCurrentUrl());
	});
	
	casper.viewport(1366,768).then(function() {
		this.test.assertUrlMatch(/view.html/, 'view.html page for given user loaded');
        //verify that only output div is visible and editable icon exists which proves that the notebook is currently not in Editable
        //form
        this.test.assertVisible(x('/html/body/div[3]/div/div/div/div/div[2]/div[3]/div[2]/pre[2]'),'output div visible');
        this.test.assertVisible(x('/html/body/div[2]/div/div[2]/ul/li/button'),'proves that notebook currently is uneditable');
    });
    
    //open the notebook in Github 
    casper.then(function() {
		this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/a/b'),'Advanced div opened');
		this.wait(5000);
		
	});
	
	casper.viewport(1366,768).then(function() {
		
        this.waitForSelector({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li.dropdown ul.dropdown-menu li a#open-in-github'}, function() {
            console.log("Link for opening notebook in github found. Clicking on it");
            
            if (this.click(x('/html/body/div[2]/div/div[2]/ul[2]/li/ul/li/a')))
            {
                
                    this.wait(7000);
                    this.waitForPopup(/gist.github.com/, function() {
                        this.test.assertEquals(this.popups.length, 1);
                                        
                    });
            this.wait(11000); 
            
            this.withPopup(/gist.github.com/, function() {
				casper.viewport(1366,768).then(function() {
				     this.wait(4000);
			         console.log(this.getCurrentUrl());
			         this.test.assertUrlMatch(/gist.github.com*/, 'Notebook opened in github');
			         //verifying that the gist opened belongs to different user
			         var gist_owner=this.fetchText(x('/html/body/div/div[2]/div/div/div/div/h1/div/div/span/span/a'));
			         this.test.assertNotEquals(gist_owner,local_user,'Confirmed that notebook opened in gist of different user');
				 });
                     		
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

